import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Input } from "@/shared/ui/input";
import { SlidersHorizontal } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex gap-5", className)}>
      <Input placeholder="Допустим электрик..." type="search" />

      <Drawer>
        <DrawerTrigger>
          <SlidersHorizontal />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
