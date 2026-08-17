const API_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

export async function analyzeQuestion(data) {
  try {
    const payload = {
      question: data.question || "Analyze uploaded problem",
      subject: data.subject || "Mathematics",
      target_exam: data.exam || "JEE Main"
    };

    const response = await fetch(`${API_URL}/questions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Backend API returned status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}