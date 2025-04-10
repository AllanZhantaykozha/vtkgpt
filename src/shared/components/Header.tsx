import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import React from "react";

const Header = () => {
    return (
        <div className="flex gap-5 justify-between items-center pb-5">
            <div className="flex gap-5 items-center">
                <Avatar className="w-12 h-12">
                    <AvatarImage src="/logo.png" alt="logo" className={"object-cover"}/>
                    <AvatarFallback>VTK</AvatarFallback>
                </Avatar>
                <div className="text-md lg:text-xl font-semibold">Vtk EduGPT</div>
            </div>
        </div>
    )
}

export default Header;