import { cn } from "@/lib/cn";
import { type Component, type JSX } from "solid-js";

interface Props extends JSX.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const Icon: Component<Props> = ({ className, ...rest }) => {
  return <span {...rest} class={cn("iconify", className)} />;
};
