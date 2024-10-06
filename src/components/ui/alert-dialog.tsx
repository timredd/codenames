import { cn } from "@/lib/utils";
import { AlertDialog as AlertDialogPrimitive } from "@kobalte/core/alert-dialog";
import { Polymorphic } from "@kobalte/core/polymorphic";
import { splitProps } from "solid-js";
import { buttonVariants } from "./button";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ValidComponent } from "solid-js";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export type AlertDialogContentProps<T extends ValidComponent = "div"> =
  AlertDialogPrimitive.AlertDialogContentProps<T> & {
    class?: string;
  };

export const AlertDialogContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AlertDialogContentProps>,
) => {
  const [local, rest] = splitProps(props as AlertDialogContentProps, ["class"]);

  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[closed]:animate-out data-[expanded]:animate-in",
          local.class,
        )}
      />
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <AlertDialogPrimitive.Content
          class={cn(
            "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[closed]:animate-out data-[expanded]:animate-in sm:rounded-lg md:w-full",
            local.class,
          )}
          {...rest}
        />
      </div>
    </AlertDialogPrimitive.Portal>
  );
};

export type AlertDialogHeaderProps<T extends ValidComponent = "div"> =
  ComponentProps<T> & {
    class?: string;
  };

export const AlertDialogHeader = <T extends ValidComponent = "div">(
  props: PolymorphicProps<"div", AlertDialogHeaderProps<T>>,
) => {
  const [local, rest] = splitProps(props as AlertDialogHeaderProps, ["class"]);

  return (
    <Polymorphic
      as="div"
      class={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        local.class,
      )}
      {...rest}
    />
  );
};

export type AlertDialogFooterProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const AlertDialogFooter = <T extends ValidComponent = "div">(
  props: PolymorphicProps<"div", AlertDialogFooterProps<T>>,
) => {
  const [local, rest] = splitProps(props as AlertDialogFooterProps, ["class"]);

  return (
    <Polymorphic
      as="div"
      class={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        local.class,
      )}
      {...rest}
    />
  );
};

export type AlertDialogTitleProps<T extends ValidComponent = "h2"> =
  AlertDialogPrimitive.AlertDialogTitleProps<T> & {
    class?: string;
  };

export const AlertDialogTitle = <T extends ValidComponent = "h2">(
  props: PolymorphicProps<T, AlertDialogTitleProps<T>>,
) => {
  const [local, rest] = splitProps(props as AlertDialogTitleProps, ["class"]);

  return (
    <AlertDialogPrimitive.Title
      class={cn("font-semibold text-lg", local.class)}
      {...rest}
    />
  );
};

export type AlertDialogDescriptionProps<T extends ValidComponent = "p"> =
  AlertDialogPrimitive.AlertDialogDescriptionProps<T> & {
    class?: string;
  };

export const AlertDialogDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, AlertDialogDescriptionProps<T>>,
) => {
  const [local, rest] = splitProps(props as AlertDialogDescriptionProps, [
    "class",
  ]);

  return (
    <AlertDialogPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
};

export type AlertDialogCloseProps<T extends ValidComponent = "button"> =
  AlertDialogPrimitive.AlertDialogCloseButtonProps<T> & {
    class?: string;
  };

export const AlertDialogClose = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, AlertDialogCloseProps<T>>,
) => {
  const [local, rest] = splitProps(props as AlertDialogCloseProps, ["class"]);

  return (
    <AlertDialogPrimitive.CloseButton
      class={cn(
        buttonVariants({
          variant: "outline",
        }),
        "mt-2 md:mt-0",
        local.class,
      )}
      {...rest}
    />
  );
};

export const AlertDialogAction = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, AlertDialogCloseProps<T>>,
) => {
  const [local, rest] = splitProps(props as AlertDialogCloseProps, ["class"]);

  return (
    <AlertDialogPrimitive.CloseButton
      class={cn(buttonVariants(), local.class)}
      {...rest}
    />
  );
};
