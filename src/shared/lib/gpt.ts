import axios from "axios";
import { systemPrompt } from "@/shared/lib/systemPrompt";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = "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"

export async function askGPT(prompt: string): Promise<string> {
    try {
        const res = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "meta-llama/llama-4-maverick:free",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );
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

//
// interface OllamaResponse {
//     model: string;
//     response: string;
//     done: boolean;
// }
//
// export async function askGPT(
//     prompt: string,
//     modelName: string = "deepseek-r1:14b"
// ): Promise<string> {
//     try {
//         const messages: OllamaMessage[] = [
//             { role: 'system', content: systemPrompt },
//             { role: 'user', content: prompt }
//         ];
//
//         const response = await fetch("http://localhost:11434/api/chat", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 model: modelName,
//                 messages: messages,
//                 stream: false,
//                 options: {
//                     temperature: 0.3, // Меньше креативности = быстрее
//                     max_tokens: 300,  // Ограничение длины ответа
//                     num_ctx: 512      // Ограничение контекста
//                 }
//             }),
//         });
//
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//
//         const data: OllamaResponse = await response.json();
//         console.log(data)
//         return data.message.content.replace(/<think>.*?<\/think>/gs, '');
//
//     } catch (error) {
//         console.error("Ошибка:", error);
//         throw new Error("Не удалось получить ответ от Ollama");
//     }
// }
