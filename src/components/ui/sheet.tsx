import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@kobalte/core/dialog";
import { cva } from "cva";
import { XIcon } from "lucide-solid";
import { mergeProps, splitProps } from "solid-js";

import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "cva";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;

export const sheetVariants = cva({
  base: "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[expanded]:animate-in data-[closed]:animate-out duration-200",
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[closed]:slide-out-to-top data-[expanded]:slide-in-from-top",
      bottom:
        "inset-x-0 bottom-0 border-t data-[closed]:slide-out-to-bottom data-[expanded]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[closed]:slide-out-to-left data-[expanded]:slide-in-from-left sm:max-w-sm",
      right:
        "inset-y-0 right-0 h-full w-3/4 border-l data-[closed]:slide-out-to-right data-[expanded]:slide-in-from-right sm:max-w-sm",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

export type SheetOverlayProps<T extends ValidComponent = "div"> =
  DialogPrimitive.DialogOverlayProps<T> & {
    class?: string;
  };

export const SheetOverlay = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SheetOverlayProps<T>>,
) => {
  const [local, rest] = splitProps(props as SheetOverlayProps, ["class"]);

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

export type SheetContentProps<T extends ValidComponent = "div"> = ParentProps<
  DialogPrimitive.DialogContentProps<T> &
    VariantProps<typeof sheetVariants> & {
      class?: string;
    }
>;

export const SheetContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SheetContentProps>,
) => {
  const merge = mergeProps({ side: "right" }, props);

  const [local, rest] = splitProps(merge, ["class", "children", "side"]);

  return (
    <DialogPrimitive.Portal>
      <SheetOverlay />
      <DialogPrimitive.Content
        class={sheetVariants({ side: local.side, class: local.class })}
        {...rest}
      >
        {local.children}
        <DialogPrimitive.CloseButton class="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-[opacity,box-shadow] hover:opacity-100 focus:outline-none focus:ring-[1.5px] focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <XIcon class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </DialogPrimitive.CloseButton>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export type SheetTitleProps<T extends ValidComponent = "h2"> =
  DialogPrimitive.DialogTitleProps<T> & {
    class?: string;
  };

export const SheetTitle = <T extends ValidComponent = "h2">(
  props: PolymorphicProps<T, SheetTitleProps<T>>,
) => {
  const [local, rest] = splitProps(props as SheetTitleProps, ["class"]);

  return (
    <DialogPrimitive.Title
      class={cn("font-semibold text-foreground text-lg", local.class)}
      {...rest}
    />
  );
};

export type SheetDescriptionProps<T extends ValidComponent = "p"> =
  DialogPrimitive.DialogTitleProps<T> & {
    class?: string;
  };

export const SheetDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, SheetDescriptionProps<T>>,
) => {
  const [local, rest] = splitProps(props as SheetDescriptionProps, ["class"]);

  return (
    <DialogPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
};

export type SheetHeaderProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const SheetHeader = <T extends ValidComponent = "div">(
  props: SheetHeaderProps<T>,
) => {
  const [local, rest] = splitProps(props as SheetHeaderProps, ["class"]);

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

export type SheetFooterProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const SheetFooter = <T extends ValidComponent = "div">(
  props: SheetFooterProps<T>,
) => {
  const [local, rest] = splitProps(props as SheetFooterProps, ["class"]);

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
