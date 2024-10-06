import { cn } from "@/lib/utils";
import * as ContextMenuPrimitive from "@kobalte/core/context-menu";
import { Polymorphic } from "@kobalte/core/polymorphic";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-solid";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";

export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export const ContextMenu = (
  props: ContextMenuPrimitive.ContextMenuRootProps,
) => {
  return <ContextMenuPrimitive.Root gutter={4} {...props} />;
};

export type ContextMenuContentProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuContentProps<T> & {
    class?: string;
  };

export const ContextMenuContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as ContextMenuContentProps, ["class"]);

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        class={cn(
          "z-50 min-w-32 origin-[var(--kb-menu-content-transform-origin)] animate-in overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          local.class,
        )}
        {...rest}
      />
    </ContextMenuPrimitive.Portal>
  );
};

export type ContextMenuItemProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuItemProps<T> & {
    class?: string;
  };

export const ContextMenuItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as ContextMenuItemProps, ["class"]);

  return (
    <ContextMenuPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
};

export type ContextMenuShortcutProps<T extends ValidComponent = "span"> =
  ComponentProps<T>;

export const ContextMenuShortcut = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, ContextMenuShortcutProps<T>>,
) => {
  const [local, rest] = splitProps(props as ContextMenuShortcutProps, [
    "class",
  ]);

  return (
    <Polymorphic
      as="span"
      class={cn("ml-auto text-xs tracking-widest opacity-60", local.class)}
      {...rest}
    />
  );
};

export type ContextMenuSeparatorProps<T extends ValidComponent = "hr"> =
  ContextMenuPrimitive.ContextMenuSeparatorProps<T> & {
    class?: string;
  };

export const ContextMenuSeparator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, ContextMenuSeparatorProps<T>>,
) => {
  const [local, rest] = splitProps(props as ContextMenuSeparatorProps, [
    "class",
  ]);

  return (
    <ContextMenuPrimitive.Separator
      class={cn("-mx-1 my-1 h-px bg-muted", local.class)}
      {...rest}
    />
  );
};

export type ContextMenuSubTriggerProps<T extends ValidComponent = "div"> =
  ParentProps<
    ContextMenuPrimitive.ContextMenuSubTriggerProps<T> & {
      class?: string;
    }
  >;

export const ContextMenuSubTrigger = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuSubTriggerProps<T>>,
) => {
  const [local, rest] = splitProps(props as ContextMenuSubTriggerProps, [
    "class",
    "children",
  ]);

  return (
    <ContextMenuPrimitive.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <ChevronRightIcon class="ml-auto size-4" />
    </ContextMenuPrimitive.SubTrigger>
  );
};

export type ContextMenuSubContentProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuSubContentProps<T> & {
    class?: string;
  };

export const ContextMenuSubContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuSubContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as ContextMenuSubContentProps, [
    "class",
  ]);

  return (
    <ContextMenuPrimitive.SubContent
      class={cn(
        "z-50 min-w-32 origin-[var(--kb-menu-content-transform-origin)] animate-in overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        local.class,
      )}
      {...rest}
    />
  );
};

export type ContextMenuCheckboxItemProps<T extends ValidComponent = "div"> =
  ParentProps<
    ContextMenuPrimitive.ContextMenuCheckboxItemProps<T> & {
      class?: string;
    }
  >;

export const ContextMenuCheckboxItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuCheckboxItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as ContextMenuCheckboxItemProps, [
    "class",
    "children",
  ]);

  return (
    <ContextMenuPrimitive.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <span class="absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon class="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </ContextMenuPrimitive.CheckboxItem>
  );
};

export type ContextMenuGroupLabelProps<T extends ValidComponent = "span"> =
  ContextMenuPrimitive.ContextMenuGroupLabelProps<T> & {
    class?: string;
  };

export const ContextMenuGroupLabel = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, ContextMenuGroupLabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as ContextMenuGroupLabelProps, [
    "class",
  ]);

  return (
    <ContextMenuPrimitive.GroupLabel
      class={cn("px-2 py-1.5 font-semibold text-sm", local.class)}
      {...rest}
    />
  );
};

export type ContextMenuRadioItemProps<T extends ValidComponent = "div"> =
  ParentProps<
    ContextMenuPrimitive.ContextMenuRadioItemProps<T> & {
      class?: string;
    }
  >;

export const ContextMenuRadioItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuRadioItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as ContextMenuRadioItemProps, [
    "class",
    "children",
  ]);

  return (
    <ContextMenuPrimitive.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <span class="absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon class="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </ContextMenuPrimitive.RadioItem>
  );
};
