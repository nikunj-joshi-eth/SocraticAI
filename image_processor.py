import cv2
import numpy as np
from PIL import Image, ImageOps, ImageEnhance
import os
from typing import Union, Tuple

def fix_exif_orientation(pil_image: Image.Image) -> Image.Image:
    """Correct image orientation using EXIF metadata from phone uploads."""
    try:
        return ImageOps.exif_transpose(pil_image)
    except Exception:
        return pil_image

def enhance_handwritten_contrast(cv_image: np.ndarray) -> np.ndarray:
    """
    Applies CLAHE (Contrast Limited Adaptive Histogram Equalization) and mild sharpening
    to make handwritten pen/pencil equations sharp and high contrast for OCR.
    """
    # Convert to YUV color space to process luminance channel only
    yuv = cv2.cvtColor(cv_image, cv2.COLOR_BGR2YUV)
    
    # Apply CLAHE to Y channel
    clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(8, 8))
    yuv[:, :, 0] = clahe.apply(yuv[:, :, 0])
    
    # Convert back to BGR
    enhanced = cv2.cvtColor(yuv, cv2.COLOR_YUV2BGR)
    
    # Mild sharpening kernel for equations & superscripts
    sharpen_kernel = np.array([
        [0, -0.5, 0],
        [-0.5, 3.0, -0.5],
        [0, -0.5, 0]
    ])
    sharpened = cv2.filter2D(enhanced, -1, sharpen_kernel)
    return sharpened

def auto_deskew(cv_image: np.ndarray) -> np.ndarray:
    """Detects text line angle and auto-rotates the image if skewed."""
    gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    
    # Find all foreground points
    coords = np.column_stack(np.where(thresh > 0))
    if coords.shape[0] == 0:
        return cv_image
        
    angle = cv2.minAreaRect(coords)[-1]
    
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle
        
    # Only rotate if skew is noticeable (> 0.5 degrees and < 15 degrees)
    if abs(angle) > 0.5 and abs(angle) < 15.0:
        (h, w) = cv_image.shape[:2]
        center = (w // 2, h // 2)
        M = cv2.getRotationMatrix2D(center, angle, 1.0)
        rotated = cv2.warpAffine(
            cv_image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE
        )
        return rotated
        
    return cv_image

def auto_crop_margins(cv_image: np.ndarray, margin: int = 15) -> np.ndarray:
    """Crops empty outer white margins around handwritten text."""
    gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    
    # Find bounding box of foreground content
    x, y, w, h = cv2.boundingRect(thresh)
    
    img_h, img_w = cv_image.shape[:2]
    
    # Add margin with boundary checks
    x1 = max(0, x - margin)
    y1 = max(0, y - margin)
    x2 = min(img_w, x + w + margin)
    y2 = min(img_h, y + h + margin)
    
    # Avoid cropping if bounding box is unreasonably small (< 10% of image)
    if (x2 - x1) > (0.1 * img_w) and (y2 - y1) > (0.1 * img_h):
        return cv_image[y1:y2, x1:x2]
        
    return cv_image

def resize_for_gemini(pil_image: Image.Image, max_dim: int = 1600) -> Image.Image:
    """Resizes image keeping aspect ratio so max dimension <= max_dim for optimal Vision token usage."""
    w, h = pil_image.size
    if max(w, h) <= max_dim:
        return pil_image
        
    if w > h:
        new_w = max_dim
        new_h = int(h * (max_dim / w))
    else:
        new_h = max_dim
        new_w = int(w * (max_dim / h))
        
    return pil_image.resize((new_w, new_h), Image.Resampling.LANCZOS)

def preprocess_problem_image(
    image_input: Union[str, Image.Image],
    save_processed_copy: bool = False,
    output_path: str = "processed_problem.jpg"
) -> Image.Image:
    """
    Main Preprocessing Pipeline for JEE/NEET handwritten math/physics equations:
    1. EXIF orientation fix
    2. OpenCV Contrast Enhancement (CLAHE + Sharpening)
    3. Auto-deskew
    4. Auto-crop outer background margins
    5. Resolution optimization for Gemini API
    """
    try:
        # Load image
        if isinstance(image_input, str):
            pil_img = Image.open(image_input)
        else:
            pil_img = image_input
            
        # 1. EXIF orientation
        pil_img = fix_exif_orientation(pil_img).convert("RGB")
        
        # Convert PIL -> OpenCV BGR
        cv_img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
        
        # 2. Contrast & Sharpening
        cv_img = enhance_handwritten_contrast(cv_img)
        
        # 3. Auto Deskew
        cv_img = auto_deskew(cv_img)
        
        # 4. Auto Margin Crop
        cv_img = auto_crop_margins(cv_img)
        
        # Convert OpenCV BGR -> PIL
        processed_pil = Image.fromarray(cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB))
        
        # 5. Resize for Gemini token budget
        final_img = resize_for_gemini(processed_pil)
        
        if save_processed_copy:
            final_img.save(output_path, "JPEG", quality=95)
            print(f"✅ Processed image saved to: {output_path}")
            
        return final_img

    except Exception as e:
        print(f"⚠️ Preprocessing warning: {e}. Falling back to original image.")
        if isinstance(image_input, str):
            return Image.open(image_input).convert("RGB")
        return image_input

if __name__ == "__main__":
    print("=== Image Preprocessor Loaded Successfully ===")
    print("Use preprocess_problem_image('path_to_image.jpg') before sending images to Gemini!")
