"use client";

import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Separator } from "@/shared/ui/separator";
import { Wrapper } from "@/shared/wrapper/wrapper";
import { AudioLines, Send, MicOff, VolumeX } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { askGPT } from "@/shared/lib/gpt";
import { MarkdownViewer } from "@/shared/lib/markdown";
import { IMessage } from "@/types/message.type";

function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
}

function getCurrentDate(): string {
  const now = new Date();
  return `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${now.getFullYear()}`;
}

const Chat = () => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        void addMessage();
      } else {
        addSpeechMessage();
      }
    }
  };


  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  // ✅ TTS через браузерное API (можно заменить на ElevenLabs)
  function speak(text: string): void {
    if (typeof window === "undefined" || typeof window.speechSynthesis === "undefined") return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    utterance.rate = 1.8;
    utterance.pitch = 0.5;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking(): void {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
      }
    }
  }, []);

  const addMessage = async (): Promise<void> => {
    if (!text.trim()) return;

    const userMessage: IMessage = {
      data: getCurrentDate(),
      text,
      user: "me",
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setText("");
    setLoading(true);

    try {
      const reply = await askGPT(text);
      const botMessage: IMessage = {
        data: getCurrentDate(),
        text: reply,
        user: "gpt",
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
      speak(reply);
    } catch (error) {
      console.error("Ошибка GPT:", error);
    }

    setLoading(false);
  };

  const addSpeechMessage = (): void => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.lang = "ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechResult = event.results[0][0].transcript;
      setText(speechResult);
      setIsListening(false);
      setTimeout(() => {
        void addMessage();
      }, 200);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Ошибка распознавания:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const stopListening = (): void => {
    const recognition = recognitionRef.current;
    if (recognition && isListening) {
      recognition.abort();
      setIsListening(false);
    }
  };

  return (
      <Wrapper className="flex flex-col px-5 py-5 h-screen">
        <div className="flex gap-5 justify-between items-center">
          <div className="flex gap-5 items-center">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/logo2.png" alt="logo" className={"object-coveR"} />
              <AvatarFallback>VTK</AvatarFallback>
            </Avatar>
            <div className="text-md lg:text-xl font-semibold">Vtk Edu GPT</div>
          </div>
        </div>

        <Separator className="my-5" />

        {messages.length === 0 ? (
            <div className="p-5 flex flex-col items-center gap-5 w-fit h-full justify-center m-auto">
              <div className="gap-2 flex flex-col items-center">
                <Avatar className="w-64 h-64">
                  <AvatarImage src="/logo2.png" alt="logo" className={"object-cover"} />
                  <AvatarFallback>VTK</AvatarFallback>
                </Avatar>
                <div className="flex-col text-center">
                  <div className="text-xl font-semibold">
                    Привет! Я — EduGPT, твой AI-ассистент в колледже.
                    <br /> Задай вопрос по предмету, и я постараюсь объяснить!
                  </div>
                </div>
              </div>
            </div>
        ) : (
            <ScrollArea className="flex-grow pr-2 h-[60%]">
              <div className="grid gap-2">
                {messages.map((msg, i) => (
                    <div key={i}>
                      <div className="text-center text-xs opacity-50 my-2">{msg.data}</div>
                      <div
                          className={cn(
                              "flex",
                              msg.user === "me" ? "justify-end" : "justify-start"
                          )}
                      >
                        <div
                            className={cn(
                                "text-md w-fit rounded-md gap-2 py-1 px-3 flex items-baseline",
                                msg.user === "me"
                                    ? "text-black bg-white border"
                                    : "text-white bg-black"
                            )}
                        >
                          <div>
                            <MarkdownViewer content={msg.text} />
                          </div>
                          <div className="text-xs opacity-50">{msg.time}</div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </ScrollArea>
        )}

        <div className="flex flex-col gap-2 pt-4">
          <div className="flex gap-3">z
            <Input
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
                placeholder="Напишите свое сообщение..."
                onKeyDown={handleKeyDown}
            />
            <Button onClick={text ? addMessage : addSpeechMessage} disabled={loading}>
              {text ? <Send /> : <AudioLines />}
            </Button>
          </div>

          {isListening && (
              <div className="text-sm text-muted-foreground">🎙️ Слушаю...</div>
          )}
          {loading && (
              <div className="text-sm text-muted-foreground">⌛ Генерируется ответ...</div>
          )}

          <div className="flex gap-3">
            {isSpeaking && (
                <Button variant="outline" onClick={stopSpeaking}>
                  <VolumeX className="mr-2 w-4 h-4" /> Остановить речь
                </Button>
            )}
            {isListening && (
                <Button variant="outline" onClick={stopListening}>
                  <MicOff className="mr-2 w-4 h-4" /> Остановить запись
                </Button>
            )}
          </div>
        </div>
      </Wrapper>
  );
};

export default Chat;
