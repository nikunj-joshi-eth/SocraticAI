from typing import Optional
from pydantic import BaseModel, Field


class QuestionRequest(BaseModel):
    question: Optional[str] = Field(
        default="Analyze uploaded notebook problem image",
        description="The student's question or attempted solution.",
    )

    subject: str = Field(
        default="Physics",
        description="Academic subject such as Physics, Chemistry, or Mathematics.",
    )

    target_exam: Optional[str] = Field(
        default="JEE Main",
        description="Target exam such as JEE Main, JEE Advanced, or NEET UG."
    )

    image_base64: Optional[str] = Field(
        default=None,
        description="Base64 encoded notebook photo image bytes."
    )


class QuestionResponse(BaseModel):
    status: str
    message: str