import { cn } from "@/lib/cn";
import { type FC, type HTMLAttributes, } from "react";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const Icon: FC<Props> = ({ className, ...rest }) => {
  return <span {...rest} className={cn("iconify", className)} />;
};
