"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Wrapper } from "@/shared/wrapper/wrapper";
import Link from "next/link";
import React, { useState } from "react";
import { NavigationDesktop } from "./navigation/navigation_desktop";
import { NavigationMobile } from "./navigation/navigation_mobile";

export const Header = () => {
  const [isAuth, setIsAuth] = useState<"unauth" | "client" | "provider">(
    "client"
  );
  return (
    <Wrapper className="flex justify-between items-center py-5">
      <div className="text-3xl font-bold">
        <Link href={"/"}>BizSelf</Link>
      </div>

      <Select
        onValueChange={(e: "unauth" | "client" | "provider") => setIsAuth(e)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Account" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="unauth">unauth</SelectItem>
          <SelectItem value="client">client</SelectItem>
          <SelectItem value="provider">provider</SelectItem>
        </SelectContent>
      </Select>

      <NavigationDesktop isAuth={isAuth} />

      <NavigationMobile isAuth={isAuth} />
    </Wrapper>
  );
};
