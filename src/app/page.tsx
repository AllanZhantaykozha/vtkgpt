"use client";

import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Wrapper } from "@/shared/wrapper/wrapper";
import { MicOff, VolumeX } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { askGPT } from "@/shared/lib/gpt";
import { IMessage } from "@/types/message.type";
import { Typewriter } from "react-simple-typewriter";
import { AnimatePresence } from "framer-motion";
import { getCurrentDate, getCurrentTime } from "@/shared/lib/date";
import WelcomeChat from "@/shared/components/WelcomeChat";
import Keyboard from "@/shared/components/Keyboard";
import Message from "@/shared/components/Message";
import Header from "@/shared/components/Header";

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
      }
    }
  }, []);

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

  const stopListening = (): void => {
    const recognition = recognitionRef.current;
    if (recognition && isListening) {
      recognition.abort();
      setIsListening(false);
    }
  };

  function stopSpeaking(): void {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }

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

  return (
      <Wrapper className="flex flex-col px-5 py-5 h-screen">
        <Header />

        {!messages.length ?
            <WelcomeChat setText={setText} />
            : (
                <ScrollArea className="flex-grow pr-2 h-[60%] md:w-[600px] m-auto hide-scrollbar">
                  <div className="grid gap-10 pt-10">
                    <AnimatePresence>
                      {messages.map((msg: IMessage, i: number) => (
                        <Message data={msg.data} time={msg.time} user={msg.user} text={msg.text} key={i} />
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
            )}

        <div className="flex flex-col gap-2 pt-4 md:w-[600px] md:m-auto">
          {isListening && <div className="text-sm text-muted-foreground">🎙️ Слушаю...</div>}

          {loading && (
              <div className="text-[10px] lg:text-sm text-muted-foreground">
                <Typewriter
                    words={['Генерируется ответ...']}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
              </div>
          )}

          <div className="flex gap-3">
            {isSpeaking && (
                <Button variant="outline" onClick={stopSpeaking}
                        className="backdrop-blur-2xl bg-[#ffffff10] border-[#ffffff20] border lg:text-md text-xs">
                  <VolumeX className="mr-2 w-4 h-4"/> Остановить речь
                </Button>
            )}
            {isListening && (
                <Button variant="outline" onClick={stopListening}
                        className="backdrop-blur-2xl bg-[#ffffff10] border-[#ffffff20] border lg:text-md text-xs">
                  <MicOff className="mr-2 w-4 h-4"/> Остановить запись
                </Button>
            )}
          </div>

          <Keyboard text={text} setText={setText} addMessage={addMessage} addSpeechMessage={addSpeechMessage} loading={loading} />
        </div>
      </Wrapper>
  );
};

export default Chat;
