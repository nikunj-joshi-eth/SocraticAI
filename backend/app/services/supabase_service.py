from functools import lru_cache

from supabase import Client, create_client

from app.core.config import get_settings
from app.models.ai import AnalysisReport


@lru_cache
def get_supabase_client() -> Client:
    settings = get_settings()

    if not settings.supabase_url:
        raise RuntimeError("SUPABASE_URL is not configured")

    if not settings.supabase_key:
        raise RuntimeError("SUPABASE_KEY is not configured")

    return create_client(
        settings.supabase_url,
        settings.supabase_key,
    )


def save_question(
    question: str,
    subject: str,
    analysis: AnalysisReport,
):
    client = get_supabase_client()

    data = {
        "question_text": question,
        "subject": subject,
        "topic": analysis.chapter,
        "difficulty_type": analysis.error_type,
        "concept": analysis.subtopic,
        "hint": (
            analysis.socratic_hints[0].hint
            if analysis.socratic_hints
            else None
        ),
        "follow_up_question": None,
        "ai_analysis": analysis.model_dump(),
    }

    response = (
        client
        .table("questions")
        .insert(data)
        .execute()
    )

    return response.data


def get_question(question_id: str):
    client = get_supabase_client()

    response = (
        client
        .table("questions")
        .select("*")
        .eq("id", question_id)
        .single()
        .execute()
    )

    return response.data

def get_questions(limit: int = 20):
    client = get_supabase_client()

    response = (
        client
        .table("questions")
        .select("*")
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
    )

    return response.data