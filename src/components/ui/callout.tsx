import { cn } from "@/lib/utils";
import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import { cva } from "cva";
import { splitProps } from "solid-js";

import type { VariantProps } from "cva";
import type { ComponentProps, ValidComponent } from "solid-js";

export const calloutVariants = cva({
  base: "rounded-md border-l-4 p-2 pl-4",
  variants: {
    variant: {
      default: "border-info-foreground bg-info text-info-foreground",
      success: "border-success-foreground bg-success text-success-foreground",
      warning: "border-warning-foreground bg-warning text-warning-foreground",
      error: "border-error-foreground bg-error text-error-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type CalloutVariants = VariantProps<typeof calloutVariants>;

export type CalloutProps<T extends ValidComponent = "div"> = ComponentProps<T> &
  CalloutVariants;

export const Callout = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CalloutProps<T>>,
) => {
  const [local, rest] = splitProps(props as CalloutProps, ["class", "variant"]);

  return (
    <Polymorphic
      as="div"
      class={cn(calloutVariants({ variant: local.variant }), local.class)}
      {...rest}
    />
  );
};

export type CalloutTitleProps<T extends ValidComponent = "h3"> =
  ComponentProps<T>;

export const CalloutTitle = <T extends ValidComponent = "h3">(
  props: PolymorphicProps<T, CalloutTitleProps<T>>,
) => {
  const [local, rest] = splitProps(props as CalloutTitleProps, ["class"]);

  return (
    <Polymorphic as="h3" class={cn("font-semibold", local.class)} {...rest} />
  );
};

export type CalloutContentProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const CalloutContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CalloutContentProps>,
) => {
  const [local, rest] = splitProps(props as CalloutContentProps, ["class"]);

  return <Polymorphic as="div" class={cn("mt-2", local.class)} {...rest} />;
};
