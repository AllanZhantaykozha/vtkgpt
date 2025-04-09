import axios from "axios";
import { systemPrompt } from "@/shared/lib/systemPrompt";

const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const apiKey = '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';


export async function askGPT(prompt: string): Promise<string> {
  try {
    const res = await axios.post(
        openRouterUrl,
        {
          model: "openrouter/quasar-alpha",
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
      console.log(res.data);
    return res.data.choices[0].message.content || "Нет ответа 😕";
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.log("[OpenRouter error]", err.response?.data || err.message);
    } else {
      console.log("[Unknown error]", err);
    }
    return "Ошибка при запросе к AI. Попробуй позже.";
  }
}
