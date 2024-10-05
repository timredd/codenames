import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@kobalte/core/accordion";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { ChevronDownIcon } from "lucide-solid";
import { splitProps } from "solid-js";
import type { ParentProps, ValidComponent } from "solid-js";

export const Accordion = AccordionPrimitive.Root;

export type AccordionItemProps<T extends ValidComponent = "div"> =
  AccordionPrimitive.AccordionItemProps<T> & {
    class?: string;
  };

export const AccordionItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as AccordionItemProps, ["class"]);

  return (
    <AccordionPrimitive.Item class={cn("border-b", local.class)} {...rest} />
  );
};

export type AccordionTriggerProps<T extends ValidComponent = "button"> =
  ParentProps<
    AccordionPrimitive.AccordionTriggerProps<T> & {
      class?: string;
    }
  >;

export const AccordionTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, AccordionTriggerProps<T>>,
) => {
  const [local, rest] = splitProps(props as AccordionTriggerProps, [
    "class",
    "children",
  ]);

  return (
    <AccordionPrimitive.Header class="flex" as="div">
      <AccordionPrimitive.Trigger
        class={cn(
          "flex flex-1 items-center justify-between py-4 font-medium text-sm transition-shadow hover:underline focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring [&[data-expanded]>svg]:rotate-180",
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <ChevronDownIcon class="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

export type AccordionContentProps<T extends ValidComponent = "div"> =
  ParentProps<
    AccordionPrimitive.AccordionContentProps<T> & {
      class?: string;
    }
  >;

export const AccordionContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as AccordionContentProps, [
    "class",
    "children",
  ]);

  return (
    <AccordionPrimitive.Content
      class={cn(
        "animate-accordion-up overflow-hidden text-sm data-[expanded]:animate-accordion-down",
        local.class,
      )}
      {...rest}
    >
      <div class="pt-0 pb-4">{local.children}</div>
    </AccordionPrimitive.Content>
  );
};
