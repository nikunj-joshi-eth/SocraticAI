import os
import sys
from typing import Optional, Union, Dict, Any

# Add project root to sys.path to access AI engine modules
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from gemini_engine import analyze_student_problem

def analyze_question(
    question: str = "",
    image_bytes: Optional[bytes] = None,
    subject: Optional[str] = None,
    target_exam: str = "JEE Advanced",
    student_name: str = "Aspirant",
    dream_college: str = "IIT Bombay"
) -> Dict[str, Any]:
    """
    Bridge service connecting FastAPI endpoints to Gemini 1.5 Pro Multimodal Reasoning Engine,
    OpenCV image preprocessing pipeline, PYQ database search, and All-India Gamified Leaderboard.
    """
    report = analyze_student_problem(
        image_input=image_bytes,
        text_prompt=question if question else None,
        target_exam=target_exam,
        student_name=student_name,
        dream_college=dream_college
    )
    return report.model_dump()