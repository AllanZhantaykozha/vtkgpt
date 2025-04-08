import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Briefcase, MessageCircleMore, MapPin, StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const ProviderCard: React.FC = () => {
  return (
    <div className="border shadow-md rounded-md p-5 grid gap-5">
      <div className="flex gap-5">
        <Avatar className="w-30 h-30">
          <AvatarImage src="/person.png" alt="person" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="">
          <div className="text-2xl font-semibold pb-3">Имя Фамилия</div>
          <div className="flex gap-2 items-center">
            <MapPin size={16} />
            <div className="">Кокшетау</div>
          </div>
          <div className="flex gap-2 items-center">
            <StarIcon size={16} />
            <div className="">4.2</div>
          </div>
          <div className="flex gap-2 items-center">
            <Briefcase size={16} />
            <div className="">4 года</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        <Badge variant={"outline"}>Электрик</Badge>
        <Badge variant={"outline"}>Сантехник</Badge>
        <Badge variant={"outline"}>Натяжные потолки</Badge>
        <Badge variant={"outline"}>Сварка</Badge>
      </div>
      <div className="flex gap-2">
        <Link href={"/bid/2"} className="flex-1">
          <Button className="w-full">Откликнуться</Button>
        </Link>
        <Link href={"/chat"}>
          <Button>
            <MessageCircleMore />
          </Button>
        </Link>
      </div>
    </div>
  );
};
