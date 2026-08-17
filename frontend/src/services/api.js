const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

export async function analyzeQuestion(data) {
  try {
    const payload = {
      question: data.question || "Analyze uploaded notebook problem image",
      subject: data.subject || "Physics",
      target_exam: data.exam || "JEE Main",
      image_base64: data.image || null
    };

    const endpoint = API_URL.endsWith("/") ? `${API_URL}questions/` : `${API_URL}/questions/`;

    const response = await fetch(endpoint, {
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