import cv2
import numpy as np
from PIL import Image
from typing import Tuple, Union, Optional
from pydantic import BaseModel

class GuardrailResult(BaseModel):
    is_valid: bool
    blur_score: float
    error_code: Optional[str] = None  # "BLURRY_IMAGE", "DARK_IMAGE", "EMPTY_IMAGE", None
    message: str

def check_image_blur(cv_image: np.ndarray, threshold: float = 100.0) -> Tuple[bool, float]:
    """
    Computes variance of Laplacian to measure image sharpness/blurriness.
    Scores < threshold indicate blurry images.
    """
    gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
    score = cv2.Laplacian(gray, cv2.CV_64F).var()
    return score >= threshold, float(score)

def validate_input_image(
    image_input: Union[str, Image.Image],
    blur_threshold: float = 80.0
) -> GuardrailResult:
    """
    Validates uploaded student image quality before making expensive AI model calls.
    Checks:
    1. Image readability / sharpness (Laplacian variance)
    2. Luminance / brightness (detects pitch black or overexposed uploads)
    3. Minimum dimension bounds
    """
    try:
        if isinstance(image_input, str):
            pil_img = Image.open(image_input)
        else:
            pil_img = image_input

        # Convert to OpenCV BGR
        cv_img = cv2.cvtColor(np.array(pil_img.convert("RGB")), cv2.COLOR_RGB2BGR)
        h, w = cv_img.shape[:2]

        # 1. Dimension Check
        if w < 100 or h < 100:
            return GuardrailResult(
                is_valid=False,
                blur_score=0.0,
                error_code="TOO_SMALL",
                message="Uploaded image resolution is too low. Please upload a clear photo of the problem."
            )

        # 2. Brightness Check
        gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
        mean_brightness = np.mean(gray)
        if mean_brightness < 20:
            return GuardrailResult(
                is_valid=False,
                blur_score=0.0,
                error_code="DARK_IMAGE",
                message="Image is too dark. Please take a photo in good lighting."
            )

        # 3. Sharpness / Blur Check
        is_sharp, blur_score = check_image_blur(cv_img, threshold=blur_threshold)
        if not is_sharp:
            return GuardrailResult(
                is_valid=False,
                blur_score=blur_score,
                error_code="BLURRY_IMAGE",
                message="Image appears too blurry for equation reading. Please hold your camera steady and retake the photo."
            )

        return GuardrailResult(
            is_valid=True,
            blur_score=blur_score,
            message="Image quality check passed."
        )

    except Exception as e:
        return GuardrailResult(
            is_valid=False,
            blur_score=0.0,
            error_code="PROCESSING_ERROR",
            message=f"Failed to process image file: {str(e)}"
        )

if __name__ == "__main__":
    print("=== Guardrails & Input Validation Module Loaded ===")
