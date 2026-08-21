import base64
from fastapi import APIRouter, HTTPException

from app.models.question import QuestionRequest
from app.models.verification import AnswerVerificationRequest
from app.services.gemini_service import analyze_question
from app.services.supabase_service import (
    get_question,
    get_questions,
    save_question,
)
from app.services.verification_service import verify_answer


router = APIRouter(
    prefix="/questions",
    tags=["Questions"],
)


@router.post("/")
def analyze_student_question(request: QuestionRequest):
    try:
        image_bytes = None
        if request.image_base64 and len(request.image_base64) > 20:
            raw_b64 = request.image_base64.split(",")[-1]
            try:
                image_bytes = base64.b64decode(raw_b64)
            except Exception as exc:
                print(f"Base64 image decode warning: {exc}")

        analysis = analyze_question(
            question=request.question or "Analyze notebook problem image",
            image_bytes=image_bytes,
            subject=request.subject,
            target_exam=request.target_exam or "JEE Main",
        )

        saved_question = save_question(
            question=request.question or "Notebook Image Question",
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
            detail=f"Unable to analyze question: {str(exc)}",
        ) from exc


@router.post("/{question_id}/verify")
def verify_student_answer(
    question_id: str,
    request: AnswerVerificationRequest,
):
    try:
        question = get_question(question_id)

        if not question:
            raise HTTPException(
                status_code=404,
                detail="Question not found.",
            )

        verification = verify_answer(
            answer=request.answer.strip(),
            stored_question=question,
        )

        return {
            "status": "success",
            "question_id": question_id,
            "verification": verification,
        }

    except HTTPException:
        raise

    except Exception as exc:
        print(f"Answer verification error: {exc}")
        raise HTTPException(
            status_code=500,
            detail="Unable to verify answer.",
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
