const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

// Auto-ping backend on mount to wake up Render cold starts
export async function pingBackend() {
  try {
    const endpoint = API_URL.endsWith("/") ? `${API_URL}health` : `${API_URL}/health`;
    fetch(endpoint).catch(() => {});
  } catch (e) {}
}

export async function analyzeQuestion(data) {
  try {
    const payload = {
      question: data.question || "Analyze uploaded notebook problem image",
      subject: data.subject || "Physics",
      target_exam: data.exam || "JEE Main",
      image_base64: data.image || null
    };

    const endpoint = API_URL.endsWith("/") ? `${API_URL}questions/` : `${API_URL}/questions/`;

    // 45-second controller timeout to handle Render cold-start delays
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Backend API returned status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}