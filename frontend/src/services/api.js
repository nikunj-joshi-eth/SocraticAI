const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || (
  import.meta.env.DEV ? "http://127.0.0.1:8000" : "https://socraticai-api.onrender.com"
);

export async function pingBackend() {
  try {
    const endpoint = API_URL.endsWith("/") ? `${API_URL}health` : `${API_URL}/health`;
    const response = await fetch(endpoint);
    return response.ok;
  } catch (error) {
    console.warn("Backend health check failed:", error);
    return false;
  }
}

export async function analyzeQuestion(data) {
  const payload = {
    question: data.question || "Analyze uploaded notebook problem image",
    subject: data.subject || "Physics",
    target_exam: data.exam || "JEE Main",
    image_base64: data.image || null,
  };

  const endpoint = API_URL.endsWith("/") ? `${API_URL}questions/` : `${API_URL}/questions/`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      let detail = `Backend API returned status ${response.status}`;
      try {
        const errorBody = await response.json();
        if (errorBody?.detail) detail = errorBody.detail;
      } catch {
        // Keep the status-based error when the backend did not return JSON.
      }
      throw new Error(detail);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
