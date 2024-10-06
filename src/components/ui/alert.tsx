import { cn } from "@/lib/utils";
import * as AlertPrimitive from "@kobalte/core/alert";
import { Polymorphic } from "@kobalte/core/polymorphic";
import { cva } from "cva";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "cva";
import type { ComponentProps, ValidComponent } from "solid-js";

export const alertVariants = cva({
  base: "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive:
        "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type AlertProps<T extends ValidComponent = "div"> =
  AlertPrimitive.AlertRootProps<T> &
    VariantProps<typeof alertVariants> & {
      class?: string;
    };

export const Alert = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AlertProps<T>>,
) => {
  const [local, rest] = splitProps(props as AlertProps, ["class", "variant"]);

  return (
    <AlertPrimitive.Root
      class={cn(
        alertVariants({
          variant: props.variant,
        }),
        local.class,
      )}
      role="alert"
      {...rest}
    />
  );
};

export type AlertTitleProps<T extends ValidComponent = "h5"> =
  ComponentProps<T>;

export const AlertTitle = <T extends ValidComponent = "h5">(
  props: PolymorphicProps<T, AlertTitleProps<T>>,
) => {
  const [local, rest] = splitProps(props as AlertTitleProps, ["class"]);

  return (
    <Polymorphic
      as="h5"
      class={cn("mb-1 font-medium leading-none tracking-tight", local.class)}
      {...rest}
    />
  );
};

export type AlertDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const AlertDescription = <T extends ValidComponent = "div">(
  props: AlertDescriptionProps<T>,
) => {
  const [local, rest] = splitProps(props as AlertDescriptionProps, ["class"]);

  return (
    <Polymorphic
      as="div"
      class={cn("text-sm [&_p]:leading-relaxed", local.class)}
      {...rest}
    />
  );
};
