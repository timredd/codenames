import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@kobalte/core/dialog";
import { XIcon } from "lucide-solid";
import { splitProps } from "solid-js";

import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export type DialogOverlayProps<T extends ValidComponent = "div"> =
  DialogPrimitive.DialogOverlayProps<T> & {
    class?: string;
  };

export const DialogOverlay = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogOverlayProps<T>>,
) => {
  const [local, rest] = splitProps(props as DialogOverlayProps, ["class"]);

  return (
    <DialogPrimitive.Overlay
      class={cn(
        "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[closed]:animate-out data-[expanded]:animate-in",
        local.class,
      )}
      {...rest}
    />
  );
};

export type DialogContentProps<T extends ValidComponent = "div"> = ParentProps<
  DialogPrimitive.DialogOverlayProps<T> & {
    class?: string;
  }
>;

export const DialogContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as DialogContentProps, [
    "class",
    "children",
  ]);

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <DialogPrimitive.Content
          class={cn(
            "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[closed]:animate-out data-[expanded]:animate-in sm:rounded-lg md:w-full",
            local.class,
          )}
          {...rest}
        >
          {local.children}
          <DialogPrimitive.CloseButton class="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-[opacity,box-shadow] hover:opacity-100 focus:outline-none focus:ring-[1.5px] focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <XIcon class="h-4 w-4" />
            <span class="sr-only">Close</span>
          </DialogPrimitive.CloseButton>
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  );
};

export type DialogTitleProps<T extends ValidComponent = "h2"> =
  DialogPrimitive.DialogTitleProps<T> & {
    class?: string;
  };

export const DialogTitle = <T extends ValidComponent = "h2">(
  props: PolymorphicProps<T, DialogTitleProps<T>>,
) => {
  const [local, rest] = splitProps(props as DialogTitleProps, ["class"]);

  return (
    <DialogPrimitive.Title
      class={cn("font-semibold text-foreground text-lg", local.class)}
      {...rest}
    />
  );
};

export type DialogDescriptionProps<T extends ValidComponent = "p"> =
  DialogPrimitive.DialogDescriptionProps<T> & {
    class?: string;
  };

export const DialogDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, DialogDescriptionProps>,
) => {
  const [local, rest] = splitProps(props as DialogDescriptionProps, ["class"]);

  return (
    <DialogPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
};

export type DialogHeaderProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const DialogHeader = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogHeaderProps<T>>,
) => {
  const [local, rest] = splitProps(props as DialogHeaderProps, ["class"]);

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

export type DialogFooterProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const DialogFooter = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogFooterProps<T>>,
) => {
  const [local, rest] = splitProps(props as DialogFooterProps, ["class"]);

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
