import os
import time
import uuid
from typing import Optional, Union
from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image

from schema import AnalysisReport
from image_processor import preprocess_problem_image
from guardrails import validate_input_image
from logger import log_ai_execution, logger

load_dotenv()

SYSTEM_PROMPT = """
You are an expert JEE and NEET examination tutor specializing in Physics, Chemistry, Mathematics, and Biology.
Your task is to analyze handwritten or printed problem images uploaded by students.

Perform the following steps:
1. Identify the subject, target chapter, and specific subtopic.
2. Transcribe the problem accurately into LaTeX format.
3. Diagnose the student's mistake or confusion (Error Type & Error Analysis).
4. Formulate 3 Socratic Hints that guide the student toward finding the answer themselves step-by-step. NEVER directly state the final answer in the hints.
5. Provide 1-2 similar Previous Year Questions (PYQs) from JEE Main/Advanced or NEET for additional practice.

Format your entire response strictly according to the provided JSON Schema.
"""

def analyze_student_problem(
    image_input: Optional[Union[str, Image.Image]] = None,
    text_prompt: Optional[str] = None,
    job_id: Optional[str] = None,
    project_id: Optional[str] = None,
    location: str = "us-central1"
) -> AnalysisReport:
    """
    Full AI Processing Pipeline:
    1. Guardrail Validation (Blur / Lighting check)
    2. Image Preprocessing (EXIF fix, CLAHE contrast enhancement, deskew, margin crop)
    3. Gemini 1.5 Pro Multimodal Inference with Pydantic Structured Output
    4. Structured JSON Observability Logging (Latency & Token metrics for BigQuery)
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
        raise ValueError(
            "Missing Authentication! Please set GEMINI_API_KEY or GCP_PROJECT_ID in your environment/.env file."
        )

    contents = []

    if image_input:
        # 1. Guardrail Validation
        guardrail = validate_input_image(image_input)
        if not guardrail.is_valid:
            logger.warning(
                f"Guardrail failed for job {current_job_id}: {guardrail.message}",
                extra={"job_id": current_job_id, "status": guardrail.error_code}
            )
            raise ValueError(f"Input Validation Failed [{guardrail.error_code}]: {guardrail.message}")

        # 2. Image Preprocessing
        processed_img = preprocess_problem_image(image_input)
        contents.append(processed_img)

    prompt_text = text_prompt or "Analyze this JEE/NEET problem and evaluate the student's solution."
    contents.append(prompt_text)

    # 3. Call Gemini 1.5 Pro with Structured Output
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

    # 4. Token metrics & Observability logging
    prompt_tokens = getattr(response.usage_metadata, "prompt_token_count", 0) if response.usage_metadata else 0
    candidate_tokens = getattr(response.usage_metadata, "candidates_token_count", 0) if response.usage_metadata else 0

    parsed_report: AnalysisReport = response.parsed

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
    print("=== Gemini Engine with Guardrails & Observability Ready ===")
