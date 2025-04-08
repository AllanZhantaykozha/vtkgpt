import axios from "axios";
import { systemPrompt } from "@/shared/lib/systemPrompt";

const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const apiKey = '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';

export async function askGPT(prompt: string): Promise<string> {
  try {
    const res = await axios.post(
        openRouterUrl,
        {
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://t.me/eduGpt_VTK_bot",
            "X-Title": "EduGPT Bot",
          },
        }
    );

    return res.data.choices[0].message.content || "Нет ответа 😕";
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("[OpenRouter error]", err.response?.data || err.message);
    } else {
      console.error("[Unknown error]", err);
    }
    return "Ошибка при запросе к AI. Попробуй позже.";
  }
}
