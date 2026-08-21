from pydantic import BaseModel, Field


class AnswerVerificationRequest(BaseModel):
    answer: str = Field(min_length=1, max_length=10000)


class AnswerVerificationResponse(BaseModel):
    verdict: str
    confidence: float = Field(ge=0, le=1)
    feedback: str
    mistake: str | None = None
    xp_earned: int = Field(ge=0)
