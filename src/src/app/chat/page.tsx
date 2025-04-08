"use client";

import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Separator } from "@/shared/ui/separator";
import { Wrapper } from "@/shared/wrapper/wrapper";
import {
  Briefcase,
  Copy,
  Hammer,
  Paintbrush,
  Phone,
  Send,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface IMessage {
  text: string;
  time: string;
  data: string;
  user: "provider" | "me";
}

function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getCurrentDate(): string {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  return `${day}.${month}.${year}`;
}

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [data, setData] = useState<string>("");

  const addMessage = () => {
    if (!data) return;

    setData("");

    setMessages([
      ...messages,
      {
        data: getCurrentDate(),
        text: data,
        user: "me",
        time: getCurrentTime(),
      },
    ]);
  };

  return (
    <Wrapper className="flex flex-col  h-[90vh] px-5 py-5">
      <div className="flex gap-5 justify-between items-center">
        <div className="flex gap-5 items-center">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/person.png" alt="person" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-md lg:text-xl font-semibold">Имя Фамилия</div>
        </div>
        <Dialog>
          <DialogTrigger className="flex gap-2 rounded-md bg-black text-white items-center px-3 py-2">
            <Phone size={18} />
            Позвнить
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Номер телефона Имя Фамилия</DialogTitle>
              <DialogDescription className="flex gap-3 justify-center items-center">
                <span className="text-3xl text-center py-10 text-black font-semibold">
                  +7 700 000 00 00
                </span>
                <Copy
                  color="black"
                  className="cursor-pointer"
                  onClick={() =>
                    navigator.clipboard.writeText("+7 700 000 00 00")
                  }
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <Separator className="my-5" />

      {messages.length === 0 ? (
        <div className="p-5 flex flex-col items-center gap-5 w-fit h-full justify-center m-auto">
          <div className="gap-2 flex flex-col items-center">
            <Avatar className="w-26 h-26">
              <AvatarImage src="/person.png" alt="person" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-col text-center">
              <div className="text-2xl font-semibold">Имя Фамилия</div>
              <div className="">Возраст: 44</div>
              <div className="">Город: Кокшетау</div>
            </div>
          </div>
          <div className="flex lg:gap-10 justify-between gap-5 px-10">
            <div className="flex flex-col items-center">
              <div className="text-xl font-medium">
                <Briefcase />
              </div>
              <div className="">24 лет</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl font-medium">
                <Star />
              </div>
              <div className="">3.2</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl font-medium">
                <Hammer />
              </div>
              <div className="">Электрик</div>
            </div>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-grow pr-2">
          <div className="grid gap-2">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className="text-center text-xs opacity-50 my-2">
                  {msg.data}
                </div>
                <div
                  key={i}
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
                    <div>{msg.text}</div>
                    <div className="text-xs opacity-50">{msg.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      <div className="flex gap-5 pt-4">
        <Input
          value={data}
          onChange={(e) => setData(e.currentTarget.value)}
          placeholder="Напишите свое сообщение..."
        />
        <Button onClick={addMessage}>
          <Send />
        </Button>
      </div>
    </Wrapper>
  );
};

export default Chat;
