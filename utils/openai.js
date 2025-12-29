import fetch from "node-fetch";
import "dotenv/config";

export async function getOpenAPIResponse(userMessage) {
  const message = userMessage || "Tell me a random joke";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: [{ role: "user", content: message }],
    }),
  };

  const response = await fetch("https://api.openai.com/v1/responses", options);
  const data = await response.json();

  // ✅ Extract only plain text
  return data.output?.[0]?.content?.[0]?.text || "No response found";
}
