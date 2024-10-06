import { cn } from "@/lib/utils";
import * as HoverCardPrimitive from "@kobalte/core/hover-card";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";

export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export interface HoverCardProps extends HoverCardPrimitive.HoverCardRootProps {
  class?: string;
}

export const HoverCard = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, HoverCardProps>,
) => {
  return <HoverCardPrimitive.Root gutter={4} {...props} />;
};

export type HoverCardContentProps<T extends ValidComponent = "div"> =
  HoverCardPrimitive.HoverCardContentProps<T> & {
    class?: string;
  };

export const HoverCardContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, HoverCardContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as HoverCardContentProps, ["class"]);

  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[closed]:animate-out data-[expanded]:animate-in",
          local.class,
        )}
        {...rest}
      />
    </HoverCardPrimitive.Portal>
  );
};
