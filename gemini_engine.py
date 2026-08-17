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
Your task is to analyze handwritten or printed problem images uploaded by students, including their handwritten partial work/solution steps.

Perform the following steps carefully:
1. Identify the subject, target chapter, and specific subtopic.
2. Transcribe the problem statement and the student's handwritten partial solution steps into clear LaTeX format.
3. Evaluate the student's handwritten attempt:
   - Identify where their work is correct.
   - Pinpoint the EXACT step where their work stopped or where a conceptual/formula/calculation mistake occurred.
4. Formulate 3 Progressive Socratic Hints customized specifically to the student's handwritten attempt:
   - Hint 1 MUST validate their correct working steps and prompt the NEXT immediate step right where their handwritten work stopped or diverged.
   - Hint 2 guides them through combining the components or performing the key algebraic/vector calculation.
   - Hint 3 prompts dimensional or boundary checking without ever spoiling the final numeric/algebraic answer.
   - IMPORTANT: Write all Socratic Hints in clean, human-readable text (e.g. use "80 km/h", "v_sg", "v_sb", "m/s" instead of raw LaTeX commands like "\\text{km/h}" or "v_{sg}").
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

    if api_key and len(api_key) > 5:
        client = genai.Client(api_key=api_key)
    elif gcp_project:
        client = genai.Client(vertexai=True, project=gcp_project, location=location)
    else:
        # Fallback mode for development when GEMINI_API_KEY is not set
        logger.warning("No Gemini API key found in env. Returning dynamic local report based on prompt.")
        
        p_lower = (text_prompt or "").lower()
        
        if "7^" in p_lower or "induction" in p_lower or "divisible" in p_lower or "q1" in p_lower or "math" in p_lower or "mathematics" in p_lower:
            parsed_report = AnalysisReport(
                subject="Mathematics",
                chapter="Algebra — Mathematical Induction",
                subtopic="Divisibility Properties & Base Case Proofs",
                detected_problem_latex=r"If $n \in \mathbb{N}$, then $7^{2n} + 2^{3n-3} \cdot 3^{n-1} + n^2 - 3n + 2$ is always divisible by...",
                error_type="Conceptual Misunderstanding",
                error_analysis="Attempted direct algebraic expansion without evaluating base case n = 1 to check factor options.",
                socratic_hints=[
                    "What is the smallest natural number n (n = 1) you can substitute first to evaluate candidate options?",
                    "For n = 1, evaluate 7^2 + 2^0 * 3^0 + 1^2 - 3(1) + 2 = 49 + 1 + 1 - 3 + 2 = 50. Which option (25, 35, 45) divides 50?",
                    "Test n = 2 (7^4 + 2^3 * 3^1 + 4 - 6 + 2 = 2425 = 25 * 97) to verify if 25 remains the common factor for all n in N."
                ],
                similar_pyqs=[
                    SimilarPYQ(
                        pyq_id="JEE_MAIN_2021_MATH_Q12",
                        exam_type="JEE Main",
                        year=2021,
                        question_latex=r"For $n \in \mathbb{N}$, $3^{2n+2} - 8n - 9$ is divisible by...",
                        correct_option="A",
                        solution_summary="Base case evaluation for n=1 gives 64."
                    )
                ]
            )
        elif "independent" in p_lower or "probability" in p_lower or "events" in p_lower:
            parsed_report = AnalysisReport(
                subject="Mathematics",
                chapter="Probability — Independent Events",
                subtopic="Mutually Independent Event Algebra",
                detected_problem_latex=r"Given $A, B, C$ are mutually independent events. Statements $S_1: A$ and $B \cup C$ are independent. $S_2: A$ and $B \cap C$ are independent.",
                error_type="Conceptual Misunderstanding",
                error_analysis="Confused pairwise independence with mutual set operations.",
                socratic_hints=[
                    "What is the defining formula for P(A and (B union C)) using set distribution?",
                    "Expand P(A and (B union C)) = P(A and B) + P(A and C) - P(A and B and C). Use mutual independence P(A and B) = P(A)P(B).",
                    "Factor out P(A) to verify if P(A and (B union C)) = P(A) * P(B union C). Does this hold for both S1 and S2?"
                ],
                similar_pyqs=[]
            )
        else:
            parsed_report = AnalysisReport(
                subject="Physics" if "physics" in p_lower else "Mathematics",
                chapter="Electrostatics" if "physics" in p_lower else "Algebra — Mathematical Induction",
                subtopic="Electric Potential due to Dipole" if "physics" in p_lower else "Divisibility Properties",
                detected_problem_latex=text_prompt or r"If $n \in \mathbb{N}$, then $7^{2n} + 2^{3n-3} \cdot 3^{n-1} + n^2 - 3n + 2$ is always divisible by...",
                error_type="Formula Misapplication",
                error_analysis="Analyzed solution steps for formula application and base case conditions.",
                socratic_hints=[
                    "Examine the fundamental relationship between the given terms.",
                    "Break the problem down into base case n=1 and inductive step.",
                    "Substitute boundary values to isolate candidate options."
                ],
                similar_pyqs=[]
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

    target_model = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite")
    response = None
    last_err = None
    models_to_try = [target_model, "gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-3.6-flash"]

    for model_name in models_to_try:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    response_mime_type="application/json",
                    response_schema=AnalysisReport,
                    temperature=0.2,
                ),
            )
            if response:
                break
        except Exception as e:
            last_err = e
            logger.warning(f"Model {model_name} failed: {e}. Trying fallback model...")

    if not response:
        raise last_err or RuntimeError("Failed to generate content from Gemini API")

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
