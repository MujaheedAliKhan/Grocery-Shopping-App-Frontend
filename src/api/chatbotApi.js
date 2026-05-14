const API_URL = import.meta.env.VITE_API_URL;

export const askChatbotApi = async (
  message
) => {
  const res = await fetch(
    `${API_URL}/api/chatbot`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    }
  );

  const data = await res.json();

  return data;
};