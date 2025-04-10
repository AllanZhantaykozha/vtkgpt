import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import {AudioLines, Send} from "lucide-react";
import React from "react";

interface Props {
    text: string;
    setText: (text: string) => void;
    addMessage: () => void;
    addSpeechMessage: () => void;
    loading: boolean;
}

const Keyboard = ({text, setText, addSpeechMessage, addMessage, loading}: Props) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (text.trim()) {
                void addMessage;
            } else {
                void addSpeechMessage;
            }
        }
    };

    return (
        <div
            className="flex gap-3 rounded-2xl items-center p-1 lg:p-3 backdrop-blur-2xl bg-[#ffffff10] border-[#ffffff20] border ">
            <Input
                value={text}
                className="focus-visible:outline-none focus-visible:ring-0 border-none outline-0 text-xs lg:text-md "
                onChange={(e) => setText(e.currentTarget.value)}
                placeholder="Напишите свое сообщение..."
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
            />
            <Button className="rounded-full p-5" onClick={text ? addMessage : addSpeechMessage} disabled={loading}>
                {text ? <Send/> : <AudioLines/>}
            </Button>
        </div>
    )
}

export default Keyboard