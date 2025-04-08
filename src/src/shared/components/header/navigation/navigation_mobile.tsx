import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

export const NavigationMobile = ({
  isAuth,
}: {
  isAuth: "unauth" | "client" | "provider";
}) => {
  return (
    <div className="flex lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu size={32} />
        </SheetTrigger>
        <SheetContent>
          <SheetTitle className="hidden">BizSelf</SheetTitle>
          <SheetDescription className="hidden">BizSelf</SheetDescription>
          {isAuth === "unauth" ? (
            <div className="grid gap-3 m-10">
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/"}>
                  Главная
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/auth"}>
                  Найти специалиста
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/provider/auth"}>
                  Стать исполнителем
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/faq"}>
                  FAQ
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/auth"}>
                  Войти
                </Link>
              </div>
            </div>
          ) : isAuth === "provider" ? (
            <div className="grid gap-3 m-10">
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/"}>
                  Главная
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/auth"}>
                  Мои услуги
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/provider/auth"}>
                  Создать услугу
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/faq"}>
                  FAQ
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/auth"}>
                  Профиль
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 m-10">
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/"}>
                  Главная
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/auth"}>
                  Мои заказы
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/provider/auth"}>
                  Опубликовать заказ
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/faq"}>
                  FAQ
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link className="text-2xl" href={"/auth"}>
                  Профиль
                </Link>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
