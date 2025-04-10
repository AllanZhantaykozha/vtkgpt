import Image from "next/image";
import {cn} from "@/shared/lib/utils";
import {motion} from "framer-motion";
import React from "react";
import {IMessage} from "@/types/message.type";


const Message = (message : IMessage) => {
    return (
        <motion.div
            initial={{opacity: 0, translateY: 150}}
            animate={{opacity: 1, translateY: 0}}
            exit={{opacity: 0, translateY: 150}}
            transition={{duration: 0.4, ease: "easeInOut"}}
            className="grid grid-cols-[1fr_9fr] gap-3"
        >
            <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full overflow-hidden">
                <Image
                    src={`/${message.user === "gpt" ? "logo.png" : "user.jpg"}`}
                    alt="logo"
                    className="object-cover"
                    width={100}
                    height={100}
                />
            </div>
            <div className="max-w-fit min-w-full">
                <div className="flex justify-between">
                    <div
                        className="text-xs lg:text-sm opacity-70 flex justify-end pb-2">{message.user === "gpt" ? "AI" : "Вы"}</div>
                    <div
                        className="text-[10px] lg:text-xs opacity-30 flex justify-end pb-2">{message.time}</div>
                </div>
                <div>
                    <div
                        className={cn("text-xs lg:text-[14px] gap-2 p-3 lg:px-5 lg:py-3 rounded-xl flex items-baseline backdrop-blur-2xl bg-[#ffffff10]")}>
                        {message.text}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Message