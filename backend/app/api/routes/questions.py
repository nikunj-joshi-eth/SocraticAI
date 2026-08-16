from fastapi import APIRouter, HTTPException

from app.models.question import QuestionRequest
from app.services.gemini_service import analyze_question
from app.services.supabase_service import (
    get_question,
    get_questions,
    save_question,
)


router = APIRouter(
    prefix="/questions",
    tags=["Questions"],
)


@router.post("/")
def analyze_student_question(request: QuestionRequest):
    try:
        analysis = analyze_question(
            question=request.question,
            subject=request.subject,
        )

        saved_question = save_question(
            question=request.question,
            subject=request.subject,
            analysis=analysis,
        )

        return {
            "status": "success",
            "analysis": analysis,
            "database": {
                "saved": True,
                "id": saved_question[0]["id"] if saved_question else None,
            },
        }

    except Exception as exc:
        print(f"Question analysis error: {exc}")

        raise HTTPException(
            status_code=500,
            detail="Unable to analyze and save the question.",
        ) from exc
        
@router.get("/{question_id}")
def get_student_question(question_id: str):
    try:
        question = get_question(question_id)

        if not question:
            raise HTTPException(
                status_code=404,
                detail="Question not found.",
            )

        return {
            "status": "success",
            "question": question,
        }

    except HTTPException:
        raise

    except Exception as exc:
        print(f"Question retrieval error: {exc}")

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve the question.",
        ) from exc
    
@router.get("/")
def get_question_history(limit: int = 20):
    try:
        if limit < 1 or limit > 100:
            raise HTTPException(
                status_code=400,
                detail="Limit must be between 1 and 100.",
            )

        questions = get_questions(limit=limit)

        return {
            "status": "success",
            "count": len(questions),
            "questions": questions,
        }

    except HTTPException:
        raise

    except Exception as exc:
        print(f"Question history error: {exc}")

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve question history.",
        ) from exc