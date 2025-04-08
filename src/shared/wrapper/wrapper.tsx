import React from "react";
import { cn } from "../lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Wrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("container mx-auto xl:px-20 lg:px-10 px-5", className)}>
      {children}
    </div>
  );
};
