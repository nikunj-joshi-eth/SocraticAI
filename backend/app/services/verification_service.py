import os
import json
from typing import Any

from google import genai
from google.genai import types

from app.core.config import get_settings
from app.models.verification import AnswerVerificationResponse


settings = get_settings()


VERIFICATION_PROMPT = """
You are the answer-verification component of SocraticAI.

The student has already received a diagnosis and Socratic hints for a problem.
Your job is ONLY to evaluate the student's submitted answer against the supplied
problem context and analysis. Do not invent missing facts.

Verdicts:
- correct: the answer is mathematically/scientifically correct or equivalent.
- partial: the approach has meaningful correct work but the final result is incomplete or wrong.
- incorrect: the submitted answer is fundamentally wrong or unsupported.

Be strict about the final answer, but give credit for valid reasoning in partial.
Do not reveal a full solution unless needed to explain the mistake.
Confidence must be between 0 and 1.
XP must be 50 for correct, 20 for partial, and 0 for incorrect.
Return JSON matching the requested schema.
"""


def verify_answer(answer: str, stored_question: dict[str, Any]) -> dict[str, Any]:
    if not settings.gemini_api_key.strip():
        raise RuntimeError("GEMINI_API_KEY is not configured on the backend")

    client = genai.Client(api_key=settings.gemini_api_key)

    analysis = stored_question.get("ai_analysis") or {}
    problem = stored_question.get("question_text") or ""

    context = {
        "problem": problem,
        "subject": stored_question.get("subject"),
        "chapter": stored_question.get("topic"),
        "concept": stored_question.get("concept"),
        "diagnosis": analysis.get("error_analysis"),
        "detected_problem": analysis.get("detected_problem_latex"),
        "submitted_answer": answer,
    }

    response = client.models.generate_content(
        model=settings.gemini_model,
        contents=json.dumps(context, ensure_ascii=False),
        config=types.GenerateContentConfig(
            system_instruction=VERIFICATION_PROMPT,
            response_mime_type="application/json",
            response_schema=AnswerVerificationResponse,
        ),
    )

    parsed = response.parsed
    if parsed is None:
        if not response.text:
            raise RuntimeError("Gemini returned an empty verification response")
        parsed = AnswerVerificationResponse.model_validate_json(response.text)

    return parsed.model_dump()
