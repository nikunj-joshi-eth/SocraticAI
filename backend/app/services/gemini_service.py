import os
import sys
from typing import Optional, Union, Dict, Any

from app.core.config import get_settings

# Add project root to sys.path to access the shared AI engine modules.
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from gemini_engine import analyze_student_problem

settings = get_settings()


def analyze_question(
    question: str = "",
    image_bytes: Optional[bytes] = None,
    subject: Optional[str] = None,
    target_exam: str = "JEE Main",
    student_name: str = "Aspirant",
    dream_college: str = "IIT Bombay",
) -> Dict[str, Any]:
    """Run the real Gemini-backed Socratic analysis pipeline.

    Production requests must have a Gemini API key. We deliberately fail fast
    instead of allowing the AI engine's local demo fallback to masquerade as
    a successful production analysis.
    """
    if not settings.gemini_api_key.strip():
        raise RuntimeError("GEMINI_API_KEY is not configured on the backend")

    # Keep the shared engine's environment-based configuration in sync with
    # the validated application settings.
    os.environ["GEMINI_API_KEY"] = settings.gemini_api_key
    os.environ["GEMINI_MODEL"] = settings.gemini_model

    # Preserve the student's selected subject and exam as explicit context.
    # The model may still auto-detect the subject from the actual problem,
    # but it now has the UI selection available as a strong prior.
    contextual_question = (
        f"Selected subject: {subject or 'Not specified'}\n"
        f"Target exam: {target_exam or 'JEE Main'}\n\n"
        f"Student doubt:\n{question or 'Analyze the uploaded notebook problem image.'}"
    )

    report = analyze_student_problem(
        image_input=image_bytes,
        text_prompt=contextual_question,
        target_exam=target_exam or "JEE Main",
        student_name=student_name,
        dream_college=dream_college,
    )
    return report.model_dump()
