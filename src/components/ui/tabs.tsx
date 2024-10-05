import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@kobalte/core/Tabs";
import { cva } from "cva";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "cva";
import type { ValidComponent, VoidProps } from "solid-js";

export type TabsProps<T extends ValidComponent = "div"> =
  TabsPrimitive.TabsRootProps<T> & {
    class?: string;
  };

export const Tabs = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TabsProps<T>>,
) => {
  const [local, rest] = splitProps(props as TabsProps, ["class"]);

  return (
    <TabsPrimitive.Root
      class={cn("w-full data-[orientation=vertical]:flex", local.class)}
      {...rest}
    />
  );
};

export type TabsListProps<T extends ValidComponent = "div"> =
  TabsPrimitive.TabsListProps<T> & {
    class?: string;
  };

export const TabsList = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TabsListProps<T>>,
) => {
  const [local, rest] = splitProps(props as TabsListProps, ["class"]);

  return (
    <TabsPrimitive.List
      class={cn(
        "relative flex w-full rounded-lg bg-muted p-1 text-muted-foreground data-[orientation=vertical]:flex-col data-[orientation=horizontal]:items-center data-[orientation=vertical]:items-stretch",
        local.class,
      )}
      {...rest}
    />
  );
};

export type TabsContentProps<T extends ValidComponent = "div"> =
  TabsPrimitive.TabsContentProps<T> & {
    class?: string;
  };

export const TabsContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TabsContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as TabsContentProps, ["class"]);

  return (
    <TabsPrimitive.Content
      class={cn(
        "transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[orientation=horizontal]:mt-2 data-[orientation=vertical]:ml-2",
        local.class,
      )}
      {...rest}
    />
  );
};

export type TabsTriggerProps<T extends ValidComponent = "button"> =
  TabsPrimitive.TabsTriggerProps<T> & {
    class?: string;
  };

export const TabsTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, TabsTriggerProps<T>>,
) => {
  const [local, rest] = splitProps(props as TabsTriggerProps, ["class"]);

  return (
    <TabsPrimitive.Trigger
      class={cn(
        "peer relative z-10 inline-flex h-7 w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 font-medium text-sm outline-none transition-colors disabled:pointer-events-none disabled:opacity-50 data-[selected]:text-foreground",
        local.class,
      )}
      {...rest}
    />
  );
};

const TabsIndicatorVariants = cva({
  base: "absolute transition-all duration-200 outline-none",
  variants: {
    variant: {
      block:
        "data-[orientation=horizontal]:bottom-1 data-[orientation=horizontal]:left-0 data-[orientation=vertical]:right-1 data-[orientation=vertical]:top-0 data-[orientation=horizontal]:h-[calc(100%-0.5rem)] data-[orientation=vertical]:w-[calc(100%-0.5rem)] bg-background shadow rounded-md peer-focus-visible:ring-[1.5px] peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-focus-visible:outline-none",
      underline:
        "data-[orientation=horizontal]:-bottom-[1px] data-[orientation=horizontal]:left-0 data-[orientation=vertical]:-right-[1px] data-[orientation=vertical]:top-0 data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px] bg-primary",
    },
  },
  defaultVariants: {
    variant: "block",
  },
});

export type TabsIndicatorProps<T extends ValidComponent = "div"> = VoidProps<
  TabsPrimitive.TabsIndicatorProps<T> &
    VariantProps<typeof TabsIndicatorVariants> & {
      class?: string;
    }
>;

export const TabsIndicator = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TabsIndicatorProps<T>>,
) => {
  const [local, rest] = splitProps(props as TabsIndicatorProps, [
    "class",
    "variant",
  ]);

  return (
    <TabsPrimitive.Indicator
      class={cn(TabsIndicatorVariants({ variant: local.variant }), local.class)}
      {...rest}
    />
  );
};
