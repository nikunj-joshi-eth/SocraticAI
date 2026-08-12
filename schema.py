from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field

class SubjectEnum(str, Enum):
    PHYSICS = "Physics"
    CHEMISTRY = "Chemistry"
    MATHEMATICS = "Mathematics"
    BIOLOGY = "Biology"

class ErrorTypeEnum(str, Enum):
    CONCEPTUAL = "Conceptual Misunderstanding"
    CALCULATION = "Calculation Error"
    FORMULA_MISAPPLICATION = "Formula Misapplication"
    QUESTION_MISREADING = "Question Misreading"
    INCOMPLETE_STEP = "Incomplete Step"

class SimilarPYQ(BaseModel):
    pyq_id: str = Field(description="Unique ID or year reference, e.g., 'JEE_MAIN_2023_SHIFT_1'")
    question_latex: str = Field(description="Question text formatted with LaTeX equations")
    correct_option: Optional[str] = Field(None, description="Correct option if MCQ (A/B/C/D)")
    solution_summary: str = Field(description="Brief explanation of the core concept used")

class AnalysisReport(BaseModel):
    subject: SubjectEnum
    chapter: str = Field(description="Target chapter, e.g., 'Rotational Dynamics'")
    subtopic: str = Field(description="Specific subtopic, e.g., 'Moment of Inertia of Rigid Bodies'")
    detected_problem_latex: str = Field(description="Extracted problem text in LaTeX format")
    error_type: ErrorTypeEnum
    error_analysis: str = Field(description="Detailed breakdown of where the student made a mistake")
    socratic_hints: List[str] = Field(
        description="3-step guided questions encouraging self-correction without revealing full answer immediately"
    )
    similar_pyqs: List[SimilarPYQ] = Field(description="2-3 relevant previous year questions for practice")

if __name__ == "__main__":
    import json
    
    # Test instantiating a dummy object to verify validation
    sample = AnalysisReport(
        subject=SubjectEnum.PHYSICS,
        chapter="Electrostatics",
        subtopic="Electric Potential due to Dipole",
        detected_problem_latex=r"Find the electric field at point $P(r, \theta)$ due to a dipole $\vec{p}$.",
        error_type=ErrorTypeEnum.FORMULA_MISAPPLICATION,
        error_analysis="Used axial formula instead of general angle formula.",
        socratic_hints=[
            "What is the angle theta?",
            "Does point P lie on the axis or at an angle?",
            "What is the general formula for potential?"
        ],
        similar_pyqs=[
            SimilarPYQ(
                pyq_id="JEE_MAIN_2021",
                question_latex=r"Find potential at $(r, 60^\circ)$.",
                correct_option="B",
                solution_summary="Use general potential formula."
            )
        ]
    )
    
    print("✅ Pydantic Schema Validated Successfully!\n")
    print(json.dumps(sample.model_dump(), indent=2))