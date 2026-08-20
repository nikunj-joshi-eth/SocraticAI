# 💡 SocraticAI — Autonomous Multimodal Socratic Tutor for STEM Aspirants

> **Transforming STEM Education from Passive Solution Copying into Active Socratic Thinking.**  
> *Powered by Google Gemini 3.5 Flash Vision, OpenCV, FastAPI, React 18, and Supabase.*

---

## 🎯 Overview

Every year, over 2.5 million students in India prepare for highly competitive national entrance examinations (**JEE Main, JEE Advanced, and NEET UG**). When stuck on complex multi-concept physics problems or calculus proofs, traditional solution apps deliver instant, spoon-fed answers.

Reading complete final solutions gives students a false sense of understanding. On exam day, when presented with unseen problem variations, they freeze because they never developed the underlying problem-solving intuition.

**SocraticAI** bridges this critical gap. Inspired by the classical **Socratic Method**, SocraticAI reads handwritten notebook photos, evaluates the student's handwritten partial working steps, pinpoints exact conceptual blindspots, and guides them through **3 progressive micro-hints** without ever spoiling the final answer.

---

## 🌟 Key Features

* **📷 Multimodal Vision OCR & LaTeX Transcription:** Converts raw handwritten math and physics notebook photos into standardized LaTeX notation ($\vec{p} = \sum q_i \vec{r}_i$) using OpenCV adaptive thresholding and Google Gemini 3.5 Flash Vision.
* **🔍 Attempt-Aware Error Diagnosis:** Evaluates handwritten partial work to distinguish between *Conceptual Blindspots*, *Formula Misapplications*, *Calculation Slips*, and *Speed Bottlenecks*.
* **💡 3-Step Progressive Socratic Micro-Hints:**
  * **Hint 1:** Validates correct initial steps and prompts the next immediate step right where the student's handwritten work stopped.
  * **Hint 2:** Guides the student through vector decomposition or algebraic system setup.
  * **Hint 3:** Prompts dimensional unit checks or boundary-case verification ($n = 1$).
* **🔓 Gamified XP Reward System (+145 XP):** Enforces active effort by awarding **+145 XP** and climbing the All-India Leaderboard only when students complete **>50% of the Socratic hint steps**.
* **🎯 Exam Goal Isolation (JEE vs NEET):**
  * **JEE Main & Advanced:** Physics, Chemistry, Mathematics (PCM)
  * **NEET UG:** Physics, Chemistry, Biology (PCB)
* **📚 Archive PYQ Recommendation Engine:** Automatically matches 1–2 similar archive Previous Year Questions (PYQs) from JEE Advanced or NEET for conceptual reinforcement.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | **React 18, Vite, Framer Motion** | Single-page responsive app with dark-mode glassmorphism and 3D card tilt effects |
| **Styling** | **Vanilla CSS Tokens** | Fast, zero-runtime CSS tokens for dark-mode components and responsive layouts |
| **API Gateway** | **FastAPI (Python 3.13), Uvicorn** | High-performance asynchronous REST API with CORS middleware and Pydantic validation |
| **AI Engine** | **Google Gemini 3.5 Flash Vision** | Multimodal reasoning, handwritten OCR parsing, and structured JSON output schemas |
| **Image Preprocessing** | **OpenCV (`cv2`), PIL** | Adaptive thresholding, contrast adjustment, and image byte conversion |
| **Database** | **Supabase PostgreSQL** | Diagnostic ticket persistence, user streaks, and leaderboard rank tracking |
| **Deployment** | **Vercel (Frontend), Render (Backend)** | Serverless production deployment with 45-second timeout resilience |

---

## 📂 Repository Directory Structure

```text
geminix/
├── backend/                       # FastAPI Backend Gateway
│   ├── app/                       # Application Package
│   │   ├── main.py                # FastAPI app entry point & CORS configuration
│   │   ├── api/routes/
│   │   │   └── questions.py       # POST /questions/ endpoint (prompt & image payload)
│   │   ├── models/
│   │   │   └── question.py        # QuestionRequest Pydantic schema
│   │   └── services/
│   │       └── gemini_service.py  # Service connecting API routes to Gemini AI Engine
│   ├── .env                       # Backend Environment Variables
│   └── requirements.txt           # Python dependencies
│
├── frontend/                      # React 18 + Vite Frontend Application
│   ├── src/
│   │   ├── App.jsx                # Core application layout
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx    # Glassmorphic Hero landing banner
│   │   │   └── DoubtPortalSection.jsx # Doubt Portal, photo uploader & Socratic hints
│   │   ├── components/
│   │   │   ├── MathText.jsx       # LaTeX parser & Unicode math renderer
│   │   │   └── TiltCard.jsx       # Framer Motion 3D card component
│   │   ├── services/
│   │   │   └── api.js             # Fetch API client (45s timeout & backend auto-ping)
│   │   └── context/
│   │       └── ExamContext.jsx    # Target Exam state management (JEE / NEET)
│   ├── index.css                  # Custom CSS Tokens & Glassmorphism styles
│   └── vite.config.js             # Vite build configuration
│
├── gemini_engine.py               # Core Gemini 3.5 Flash AI Engine & Pydantic JSON Schemas
├── image_processor.py              # OpenCV image preprocessor (auto-deskew & contrast boost)
└── guardrails.py                  # Quality & safety guardrails (blur detection)
```

---

## 🚀 Local Quickstart Guide

### Prerequisites
* **Node.js** v18+ and **npm**
* **Python** v3.13+
* **Google Gemini API Key** (from Google AI Studio)

---

### 1. Clone & Set Up Backend

```bash
# Clone repository
git clone https://github.com/nikunj-joshi-eth/SocraticAI.git
cd geminix

# Create and activate Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install backend dependencies
pip install -r backend/requirements.txt
```

Create a `.env` file inside `backend/`:

```env
ENVIRONMENT=development
PORT=8000
APP_NAME=SocraticAI API
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash-lite
ALLOWED_ORIGINS=*
```

Start the FastAPI server:

```bash
cd backend
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
The API will be live at `http://127.0.0.1:8000`.

---

### 2. Set Up Frontend

Open a new terminal tab:

```bash
cd frontend

# Install Node dependencies
npm install

# Start Vite development server
npm run dev
```

The application will be live at `http://localhost:3000`.

---

## 📡 API Endpoint Reference

### `POST /questions/`
Analyzes text or image prompts and generates structured Socratic hints.

* **Request Body (JSON):**
  ```json
  {
    "question": "Two cars A and B move at 100 km/h and 80 km/h. Find relative speed.",
    "subject": "Physics",
    "target_exam": "JEE Main",
    "image_base64": "data:image/jpeg;base64,..."
  }
  ```
* **Response (JSON):**
  ```json
  {
    "status": "success",
    "analysis": {
      "subject": "Physics",
      "chapter": "Kinematics",
      "subtopic": "Relative Motion",
      "detected_problem_latex": "Two cars A and B move at 100 km/h...",
      "error_type": "Incomplete Step",
      "socratic_hints": [
        "Great start identifying given speeds! Now convert to m/s...",
        "Express relative velocity in vector form...",
        "Check dimensional consistency before calculating..."
      ],
      "xp_earned": 145,
      "student_rank": 6
    }
  }
  ```

---

## 📄 License & Acknowledgments

This project is submitted for the **Google Gemini AI Competition**.  
Built with ❤️ for STEM aspirants nationwide.
