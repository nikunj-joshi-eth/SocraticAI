const API_URL = "http://127.0.0.1:8000";


export async function analyzeQuestion(data) {

    const response = await fetch(
        `${API_URL}/questions/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );


    if (!response.ok) {
        throw new Error("Backend request failed");
    }


    return await response.json();
}