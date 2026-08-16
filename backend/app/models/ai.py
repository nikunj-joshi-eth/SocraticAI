from typing import List, Optional

from pydantic import BaseModel, Field


class SimilarPYQ(BaseModel):
    question: str
    answer: str
    year: int
    exam: str
    subject: str
    chapter: str
    difficulty: str


class SocraticHint(BaseModel):
    hint_number: int
    hint: str


class AnalysisReport(BaseModel):
    subject: str
    chapter: str
    subtopic: Optional[str] = None

    detected_problem_latex: str

    error_type: str
    error_analysis: str

    socratic_hints: List[SocraticHint] = Field(default_factory=list)

    similar_pyqs: List[SimilarPYQ] = Field(default_factory=list)

    xp_earned: int = 0
    current_streak: int = 0
    student_rank: int = 0
    legendary_prize_badge: Optional[str] = None