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
from pyq_database import search_similar_pyqs

load_dotenv()

SYSTEM_PROMPT = """
You are SocraticAI, an expert JEE Main, JEE Advanced, and NEET tutor for Physics, Chemistry, Mathematics, and Biology.

Analyze the student's question and, when an image is supplied, the student's handwritten work.
1. Identify subject, chapter, and subtopic.
2. Transcribe the problem and relevant student work clearly.
3. Identify what the student did correctly and the exact conceptual, formula, calculation, or interpretation error.
4. Give exactly 3 progressive Socratic hints. The hints must guide the student's next step without revealing the final answer prematurely.
5. Provide 1-2 relevant PYQs when possible.
6. Never claim to have verified a student's final answer unless the supplied work supports that conclusion.
7. Keep hints human-readable and avoid raw LaTeX commands in prose.

Return only data matching the supplied AnalysisReport schema.
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
    location: str = "us-central1",
) -> AnalysisReport:
    """Run the production multimodal Gemini analysis pipeline."""
    current_job_id = job_id or f"JOB_{uuid.uuid4().hex[:8].upper()}"
    start_time = time.time()

    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured")

    client = genai.Client(api_key=api_key)
    contents = []

    if image_input:
        guardrail = validate_input_image(image_input)
        if not guardrail.is_valid:
            logger.warning(
                f"Guardrail failed for job {current_job_id}: {guardrail.message}",
                extra={"job_id": current_job_id, "status": guardrail.error_code},
            )
            raise ValueError(
                f"Input Validation Failed [{guardrail.error_code}]: {guardrail.message}"
            )

        contents.append(preprocess_problem_image(image_input))

    contents.append(
        text_prompt
        or "Analyze this JEE/NEET problem and evaluate the student's solution."
    )

    target_model = os.getenv("GEMINI_MODEL", "gemini-3.6-flash").strip()
    response = None
    last_err = None

    models_to_try = [target_model]
    if target_model != "gemini-3.6-flash":
        models_to_try.append("gemini-3.6-flash")

    for model_name in models_to_try:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    response_mime_type="application/json",
                    response_schema=AnalysisReport,
                ),
            )
            if response:
                break
        except Exception as exc:
            last_err = exc
            logger.warning(
                f"Gemini model {model_name} failed: {exc}. Trying configured fallback."
            )

    if not response:
        raise last_err or RuntimeError("Gemini failed to generate an analysis")

    latency_ms = (time.time() - start_time) * 1000
    usage = response.usage_metadata
    prompt_tokens = getattr(usage, "prompt_token_count", 0) if usage else 0
    candidate_tokens = getattr(usage, "candidates_token_count", 0) if usage else 0

    parsed_report = response.parsed
    if parsed_report is None:
        if not response.text:
            raise RuntimeError("Gemini returned an empty structured response")
        parsed_report = AnalysisReport.model_validate_json(response.text)

    matched_pyqs = search_similar_pyqs(
        subject=parsed_report.subject.value,
        chapter=parsed_report.chapter,
    )
    parsed_report.similar_pyqs = [
        SimilarPYQ(
            pyq_id=pyq.pyq_id,
            exam_type=pyq.exam_type,
            year=pyq.year,
            question_latex=pyq.question_latex,
            correct_option=pyq.correct_option,
            solution_summary=pyq.solution_summary,
        )
        for pyq in matched_pyqs
    ]

    # Analysis is not proof of a correct answer. XP/accuracy should be
    # awarded later by the dedicated verification flow.
    parsed_report.xp_earned = 0

    log_ai_execution(
        job_id=current_job_id,
        latency_ms=latency_ms,
        input_tokens=prompt_tokens,
        output_tokens=candidate_tokens,
        subject=parsed_report.subject.value if parsed_report else "Unknown",
        status="SUCCESS",
    )

    return parsed_report


if __name__ == "__main__":
    result = analyze_student_problem(
        text_prompt="Find the electric field at the midpoint of a dipole."
    )
    print(result.model_dump_json(indent=2))
