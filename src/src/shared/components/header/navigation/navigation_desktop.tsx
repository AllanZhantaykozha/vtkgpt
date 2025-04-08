import Link from "next/link";
import React from "react";

export const NavigationDesktop = ({
  isAuth,
}: {
  isAuth: "unauth" | "client" | "provider";
}) => {
  return (
    <div className="hidden lg:block">
      {isAuth === "unauth" ? (
        <div className="flex gap-5">
          <div className="cursor-pointer">
            <Link href={"/"}>Главная</Link>
          </div>
          <div className="cursor-pointer">
            <Link href={"/auth"}>Найти специалиста</Link>
          </div>
          <div className="cursor-pointer">
            <Link href={"/provider/auth"}>Стать исполнителем</Link>
          </div>
          <div className="cursor-pointer">
            <Link href={"/faq"}>FAQ</Link>
          </div>
          <div className="cursor-pointer">
            <Link href={"/auth"}>Войти</Link>
          </div>
        </div>
      ) : isAuth === "provider" ? (
        <div className="flex gap-5">
          <div className="cursor-pointer">
            <Link href={"/"}>Главная</Link>
          </div>
          <div className="cursor-pointer">
            <Link href={"/services"}>Мои услуги</Link>
          </div>
          <div className="cursor-pointer">
            <Link href={"/services/create"}>Создать услугу</Link>
          </div>
          <div className="cursor-pointer">
            <Link href={"/faq"}>FAQ</Link>
          </div>
          <div className="cursor-pointer">
            <Link href={"/auth"}>Профиль</Link>
          </div>
        </div>
      ) : (
        <div className="flex gap-5">
          <div className="cursor-pointer">
            <Link href={"/bid"}>Мои заявки</Link>
          </div>
          <div className="cursor-pointer">
            <Link href={"/orders"}>Мои заказы</Link>
          </div>

          <div className="cursor-pointer">
            <Link href={"/orders/create"}>Опубликовать заказ</Link>
          </div>
          <div className="cursor-pointer">
            <Link href={"/faq"}>FAQ</Link>
          </div>
          <div className="cursor-pointer">
            <Link href={"/auth"}>Профиль</Link>
          </div>
        </div>
      )}
    </div>
  );
};
