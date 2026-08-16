from pydantic import BaseModel, Field


class QuestionRequest(BaseModel):
    question: str = Field(
        ...,
        min_length=3,
        max_length=10000,
        description="The student's question or attempted solution.",
    )

    subject: str = Field(
        ...,
        min_length=2,
        max_length=50,
        description="Academic subject such as Physics, Chemistry, or Mathematics.",
    )


class QuestionResponse(BaseModel):
    status: str
    message: str