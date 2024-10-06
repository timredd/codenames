import { cn } from "@/lib/utils";
import * as CollapsiblePrimitive from "@kobalte/core/collapsible";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";

export const Collapsible = CollapsiblePrimitive.Root;

export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

export type CollapsibleContentProps<T extends ValidComponent = "div"> =
  CollapsiblePrimitive.CollapsibleContentProps<T> & {
    class?: string;
  };

export const CollapsibleContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CollapsibleContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as CollapsibleContentProps, ["class"]);

  return (
    <CollapsiblePrimitive.Content
      class={cn(
        "animate-collapsible-up data-[expanded]:animate-collapsible-down",
        local.class,
      )}
      {...rest}
    />
  );
};
