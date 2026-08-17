import json

from google import genai

from app.core.config import get_settings
from app.models.ai import AnalysisReport


settings = get_settings()

client = genai.Client(
    api_key=settings.gemini_api_key
)

SOCRATIC_SYSTEM_PROMPT = """
You are SocraticAI, an AI tutor designed for JEE and NEET
students in India.

Your primary goal is to help students understand problems,
not simply provide answers.

When analyzing a student's question:

1. Identify the subject.
2. Identify the chapter/topic.
3. Identify the subtopic when possible.
4. Determine the student's error type:
   - conceptual_error
   - calculation_error
   - application_error
   - incomplete_attempt
   - unclear

5. Explain the underlying mistake briefly.
6. Provide exactly 3 Socratic hints.
7. Each hint should progressively guide the student closer
   to solving the problem.
8. NEVER immediately reveal the final answer.
9. Use LaTeX for mathematical expressions.
10. Do not invent information that is not present.
11. Keep the explanation appropriate for a JEE/NEET student.

Return ONLY valid JSON.
Do not wrap the JSON in Markdown code fences.

The JSON must follow this structure:

{
    "subject": "Physics",
    "chapter": "Chapter name",
    "subtopic": "Subtopic name",
    "detected_problem_latex": "Problem written in LaTeX",
    "error_type": "conceptual_error",
    "error_analysis": "Brief explanation of the student's mistake",
    "socratic_hints": [
        {
            "hint_number": 1,
            "hint": "First hint"
        },
        {
            "hint_number": 2,
            "hint": "Second hint"
        },
        {
            "hint_number": 3,
            "hint": "Third hint"
        }
    ],
    "similar_pyqs": [],
    "xp_earned": 0,
    "current_streak": 0,
    "student_rank": 0,
    "legendary_prize_badge": null
}
"""


def analyze_question(
    question: str,
    subject: str | None = None,
) -> AnalysisReport:

    prompt = f"""
{SOCRATIC_SYSTEM_PROMPT}

Student question:
{question}

Student-provided subject:
{subject or "Not specified"}

Analyze the student's question now.
"""

    response = client.models.generate_content(
        model=settings.gemini_model,
        contents=prompt,
    )

    raw_text = response.text or ""

    try:
        data = json.loads(raw_text)
    except json.JSONDecodeError as exc:
        raise ValueError(
            "Gemini returned invalid JSON."
        ) from exc

    return AnalysisReport.model_validate(data)
