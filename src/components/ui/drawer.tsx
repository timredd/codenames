import { cn } from "@/lib/utils";
import DrawerPrimitive from "@corvu/drawer";
import { splitProps } from "solid-js";

import type {
  ContentProps,
  DescriptionProps,
  DynamicProps,
  LabelProps,
  OverlayProps,
} from "@corvu/drawer";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";

export const Drawer = DrawerPrimitive;
export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerPortal = DrawerPrimitive.Portal;
export const DrawerClose = DrawerPrimitive.Close;

export type DrawerOverlayProps<T extends ValidComponent = "div"> =
  OverlayProps<T> & {
    class?: string;
  };

export const DrawerOverlay = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerOverlayProps<T>>,
) => {
  const [local, rest] = splitProps(props as DrawerOverlayProps, ["class"]);

  const context = DrawerPrimitive.useContext();

  return (
    <DrawerPrimitive.Overlay
      class={cn(
        "fixed inset-0 z-50 data-[transitioning]:transition-colors data-[transitioning]:duration-300",
        local.class,
      )}
      style={{
        "background-color": `rgb(0 0 0 / ${0.8 * context.openPercentage()})`,
      }}
      {...rest}
    />
  );
};

export type DrawerContentProps<T extends ValidComponent = "div"> = ParentProps<
  ContentProps<T> & {
    class?: string;
  }
>;

export const DrawerContent = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as DrawerContentProps, [
    "class",
    "children",
  ]);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        class={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background after:absolute after:inset-x-0 after:top-full after:h-1/2 after:bg-inherit data-[transitioning]:transition-transform data-[transitioning]:duration-300 md:select-none",
          local.class,
        )}
        {...rest}
      >
        <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {props.children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
};

export type DrawerHeaderProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const DrawerHeader = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerHeaderProps<T>>,
) => {
  const [local, rest] = splitProps(props as DrawerHeaderProps, ["class"]);

  return (
    <div
      class={cn("grid gap-1.5 p-4 text-center sm:text-left", local.class)}
      {...rest}
    />
  );
};

export type DrawerFooterProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const DrawerFooter = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerFooterProps<T>>,
) => {
  const [local, rest] = splitProps(props as DrawerFooterProps, ["class"]);

  return (
    <div class={cn("t-auto flex flex-col gap-2 p-4", local.class)} {...rest} />
  );
};

export type DrawerTitleProps<T extends ValidComponent = "div"> =
  LabelProps<T> & {
    class?: string;
  };

export const DrawerTitle = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerTitleProps<T>>,
) => {
  const [local, rest] = splitProps(props as DrawerTitleProps, ["class"]);

  return (
    <DrawerPrimitive.Label
      class={cn(
        "font-semibold text-lg leading-none tracking-tight",
        local.class,
      )}
      {...rest}
    />
  );
};

export type DrawerDescriptionProps<T extends ValidComponent = "div"> =
  DescriptionProps<T> & {
    class?: string;
  };

export const DrawerDescription = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerDescriptionProps<T>>,
) => {
  const [local, rest] = splitProps(props as DrawerDescriptionProps, ["class"]);

  return (
    <DrawerPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
};
