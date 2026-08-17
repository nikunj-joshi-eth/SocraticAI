from functools import lru_cache
import logging
from typing import Optional

from app.core.config import get_settings
from app.models.ai import AnalysisReport

logger = logging.getLogger("supabase_service")

@lru_cache
def get_supabase_client():
    settings = get_settings()

    if not settings.supabase_url or not settings.supabase_key:
        return None

    try:
        from supabase import Client, create_client
        return create_client(
            settings.supabase_url,
            settings.supabase_key,
        )
    except Exception as e:
        logger.warning(f"Could not connect to Supabase: {e}")
        return None

def save_question(
    question: str,
    subject: str,
    analysis: dict,
):
    client = get_supabase_client()
    if not client:
        logger.info("Supabase credentials not set. Returning local save confirmation.")
        return [{"id": "LOCAL_DB_RECORD"}]

    try:
        data = {
            "question_text": question,
            "subject": subject,
            "topic": analysis.get("chapter", "General"),
            "difficulty_type": analysis.get("error_type", "Conceptual"),
            "concept": analysis.get("subtopic", "General Concept"),
            "hint": (
                analysis.get("socratic_hints", [""])[0]
            ),
            "ai_analysis": analysis,
        }

        response = (
            client
            .table("questions")
            .insert(data)
            .execute()
        )

        return response.data
    except Exception as e:
        logger.warning(f"Supabase write skipped: {e}")
        return [{"id": "LOCAL_DB_RECORD"}]

def get_question(question_id: str):
    client = get_supabase_client()
    if not client:
        return None

    try:
        response = (
            client
            .table("questions")
            .select("*")
            .eq("id", question_id)
            .single()
            .execute()
        )

        return response.data
    except Exception as e:
        logger.warning(f"Supabase read error: {e}")
        return None

def get_questions(limit: int = 20):
    client = get_supabase_client()
    if not client:
        return []

    try:
        response = (
            client
            .table("questions")
            .select("*")
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )

        return response.data
    except Exception as e:
        logger.warning(f"Supabase query error: {e}")
        return []