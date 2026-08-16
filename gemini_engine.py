import os
import time
import uuid
from typing import Optional, Union
from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image

from schema import AnalysisReport, SimilarPYQ
from image_processor import preprocess_problem_image
from guardrails import validate_input_image
from logger import log_ai_execution, logger
from leaderboard import leaderboard_manager
from pyq_database import search_similar_pyqs

load_dotenv()

SYSTEM_PROMPT = """
You are an expert JEE Main, JEE Advanced, and NEET examination tutor specializing in Physics, Chemistry, Mathematics, and Biology.
Your task is to analyze handwritten or printed problem images uploaded by students.

Perform the following steps:
1. Identify the subject, target chapter, and specific subtopic.
2. Transcribe the problem accurately into LaTeX format.
3. Diagnose the student's mistake or confusion (Error Type & Error Analysis).
4. Formulate 3 Socratic Hints that guide the student toward finding the answer themselves step-by-step. NEVER directly state the final answer in the hints.
5. Provide 1-2 similar Previous Year Questions (PYQs) from JEE Main, JEE Advanced, or NEET for additional practice.

Format your entire response strictly according to the provided JSON Schema.
"""

def analyze_student_problem(
    image_input: Optional[Union[str, Image.Image]] = None,
    text_prompt: Optional[str] = None,
    job_id: Optional[str] = None,
    student_id: str = "STU_CURRENT_USER",
    student_name: str = "Student Aspirant",
    target_exam: str = "JEE Advanced",
    dream_college: str = "IIT Bombay",
    project_id: Optional[str] = None,
    location: str = "us-central1"
) -> AnalysisReport:
    """
    Full AI Processing Pipeline with Gamification & PYQ Integration:
    1. Guardrail Validation (Blur / Lighting check)
    2. Image Preprocessing (EXIF fix, CLAHE contrast, deskew, crop)
    3. Gemini 1.5 Pro Multimodal Inference with Pydantic Structured Output
    4. PYQ Database Querying (Matches JEE Main/Advanced/NEET archive questions)
    5. Leaderboard XP & Legendary Prize Rank Calculation
    6. Structured Observability Logging to BigQuery
    """
    current_job_id = job_id or f"JOB_{uuid.uuid4().hex[:8].upper()}"
    start_time = time.time()

    api_key = os.getenv("GEMINI_API_KEY")
    gcp_project = project_id or os.getenv("GCP_PROJECT_ID")

    if gcp_project:
        client = genai.Client(vertexai=True, project=gcp_project, location=location)
    elif api_key:
        client = genai.Client(api_key=api_key)
    else:
        # Fallback mode for development without live API key
        logger.warning("No Gemini API key found in env. Returning structured local report.")
        parsed_report = AnalysisReport(
            subject="Physics",
            chapter="Electrostatics",
            subtopic="Electric Potential due to Dipole",
            detected_problem_latex=r"Find the electric field at point $P(r, \theta)$ due to a dipole $\vec{p}$.",
            error_type="Formula Misapplication",
            error_analysis="Applied axial formula instead of general angle formula.",
            socratic_hints=[
                "What is the angle theta between dipole axis and position vector?",
                "Does point P lie on axial line or at an arbitrary angle?",
                "Recall the relation $V = \frac{kp\cos\theta}{r^2}$."
            ],
            similar_pyqs=[
                SimilarPYQ(
                    pyq_id="JEE_ADVANCED_2022_P2_Q8",
                    exam_type="JEE Advanced",
                    year=2022,
                    question_latex=r"Find potential at $(r, 60^\circ)$.",
                    correct_option="A",
                    solution_summary="Use general potential formula."
                )
            ]
        )
        # Update Leaderboard & PYQs
        entry, xp = leaderboard_manager.record_student_doubt_attempt(
            student_id=student_id,
            student_name=student_name,
            target_exam=target_exam,
            dream_college=dream_college,
            is_correct=True
        )
        parsed_report.xp_earned = xp
        parsed_report.current_streak = entry.streak_count
        parsed_report.student_rank = entry.rank
        parsed_report.legendary_prize_badge = entry.prize.badge if entry.prize else f"Rank #{entry.rank}"
        return parsed_report

    contents = []

    if image_input:
        guardrail = validate_input_image(image_input)
        if not guardrail.is_valid:
            logger.warning(
                f"Guardrail failed for job {current_job_id}: {guardrail.message}",
                extra={"job_id": current_job_id, "status": guardrail.error_code}
            )
            raise ValueError(f"Input Validation Failed [{guardrail.error_code}]: {guardrail.message}")

        processed_img = preprocess_problem_image(image_input)
        contents.append(processed_img)

    prompt_text = text_prompt or "Analyze this JEE/NEET problem and evaluate the student's solution."
    contents.append(prompt_text)

    response = client.models.generate_content(
        model="gemini-1.5-pro",
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            response_mime_type="application/json",
            response_schema=AnalysisReport,
            temperature=0.2,
        ),
    )

    latency_ms = (time.time() - start_time) * 1000

    prompt_tokens = getattr(response.usage_metadata, "prompt_token_count", 0) if response.usage_metadata else 0
    candidate_tokens = getattr(response.usage_metadata, "candidates_token_count", 0) if response.usage_metadata else 0

    parsed_report: AnalysisReport = response.parsed

    # Enrich with PYQ database results
    matched_pyqs = search_similar_pyqs(subject=parsed_report.subject.value, chapter=parsed_report.chapter)
    parsed_report.similar_pyqs = [
        SimilarPYQ(
            pyq_id=p.pyq_id,
            exam_type=p.exam_type,
            year=p.year,
            question_latex=p.question_latex,
            correct_option=p.correct_option,
            solution_summary=p.solution_summary
        ) for p in matched_pyqs
    ]

    # Calculate Leaderboard XP & Rank
    entry, xp = leaderboard_manager.record_student_doubt_attempt(
        student_id=student_id,
        student_name=student_name,
        target_exam=target_exam,
        dream_college=dream_college,
        is_correct=True
    )
    parsed_report.xp_earned = xp
    parsed_report.current_streak = entry.streak_count
    parsed_report.student_rank = entry.rank
    parsed_report.legendary_prize_badge = entry.prize.badge if entry.prize else f"Rank #{entry.rank}"

    log_ai_execution(
        job_id=current_job_id,
        latency_ms=latency_ms,
        input_tokens=prompt_tokens,
        output_tokens=candidate_tokens,
        subject=parsed_report.subject.value if parsed_report else "Unknown",
        status="SUCCESS"
    )

    return parsed_report

if __name__ == "__main__":
    print("=== Testing Gemini Engine with Leaderboard & PYQ Integration ===")
    res = analyze_student_problem(text_prompt="Find electric field at dipole")
    print(f"✅ XP Earned: +{res.xp_earned} | Rank: {res.student_rank} ({res.legendary_prize_badge})")
