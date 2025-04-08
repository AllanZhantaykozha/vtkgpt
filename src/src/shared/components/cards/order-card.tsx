import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import {
  MapPin,
  Calendar,
  Wallet,
  Loader2,
  CircleCheck,
  CircleX,
} from "lucide-react";
import React from "react";

interface Props {
  status: "pending" | "accepted" | "rejected";
}

const OrderCart: React.FC<Props> = ({ status }) => {
  return (
    <div className="border shadow-md rounded-md p-5 grid gap-5">
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <MapPin size={16} />
            <div className="">Ул. Абая дом 3</div>
          </div>
          <div className="flex gap-2 items-center">
            <Calendar size={16} />
            <div className="">28.03.2024 12:00</div>
          </div>
          <div className="flex gap-2 items-center">
            <Wallet size={16} />
            <div className="">5000</div>
          </div>
          <Badge variant={"outline"}>Электрик</Badge>
        </div>
      </div>
      <div className="mx-auto grid gap-2">
        {status === "pending" ? (
          <div className="flex w-32 py-1 flex-1 items-center justify-center text-white  bg-yellow-500 rounded-md ">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <div className="">В ожидании</div>
          </div>
        ) : status === "accepted" ? (
          <div className="flex gap-2  w-32 py-1 flex-1 items-center justify-center text-white  bg-green-500 rounded-md ">
            <CircleCheck size={16} />
            <div className="">Принято</div>
          </div>
        ) : (
          <div className="flex gap-2 w-32 py-1 flex-1 items-center justify-center text-white  bg-red-500 rounded-md ">
            <CircleX size={16} />
            <div className="">Откланен</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCart;
