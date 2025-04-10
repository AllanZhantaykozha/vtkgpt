import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import {Typewriter} from "react-simple-typewriter";
import {Button} from "@/shared/ui/button";
import React from "react";

interface Props {
    setText: (text: string) => void;
}


const WelcomeChat = ({setText}: Props) => {
    return (
        <div className="lg:p-5 md:w-[600px] m-auto flex flex-col items-center gap-5 h-full justify-center">
            <div className="gap-2 flex flex-col items-center">
                <Avatar className="w-32 h-32">
                    <AvatarImage src="/logo.png" alt="logo" className={"object-cover"} />
                    <AvatarFallback>VTK</AvatarFallback>
                </Avatar>
                <div className="flex-col text-center">
                    <div className="text-xl lg:text-3xl font-bold text-[#8993b5] mb-5">
                        <Typewriter
                            words={['Привет! Я — VTK EduGPT.', "Твой AI-ассистент в колледже."]}
                            loop={0}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </div>
                    <div className="text-xs lg:text-md font-normal">Чем я могу сегодня могу помочь?</div>
                    <div className="text-xs lg:text-md font-normal">Задай вопрос по предмету, и я постараюсь объяснить!</div>

                    <div className="flex gap-2 flex-wrap mt-5 justify-center">
                        <Button
                            onClick={() => setText('Напиши мне где находится главный корпус и на каком автобусе можно доехать до корпуса')}
                            className=" text-[10px] lg:text-xs rounded-2xl flex items-center backdrop-blur-2xl bg-[#ffffff10]"
                        >
                            Где находится главный корпус?
                        </Button>
                        <Button
                            onClick={() => setText('Напиши мне какие документы мне нужны для поступление в колледж в 2025 году')}
                            className="text-[10px] lg:text-xs rounded-2xl flex items-center backdrop-blur-2xl bg-[#ffffff10]"
                        >
                            Какие документы нужны для поступление?
                        </Button>
                        <Button
                            onClick={() => setText('Напиши мне какая стипендия на 2025 год?')}
                            className="text-[10px] lg:text-xs rounded-2xl flex items-center backdrop-blur-2xl bg-[#ffffff10]"
                        >
                            Какая стипендия на 2025 год?
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeChat;