import { cn } from "@/lib/utils";
import * as DropdownMenuPrimitive from "@kobalte/core/dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-solid";
import { splitProps, mergeProps } from "solid-js";

import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export type DropdownMenuProps = DropdownMenuPrimitive.DropdownMenuRootProps & {
  class?: string;
};

export const DropdownMenu = (props: DropdownMenuProps) => {
  const merged = mergeProps({ gutter: 4 }, props);

  return <DropdownMenuPrimitive.Root {...merged} />;
};

export type DropdownMenuContentProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuContentProps<T> & {
    class?: string;
  };

export const DropdownMenuContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuContentProps, [
    "class",
  ]);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 min-w-8rem overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[closed]:animate-out data-[expanded]:animate-in",
          local.class,
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

export type DropdownMenuItemProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuItemProps<T> & {
    class?: string;
    inset?: boolean;
  };

export const DropdownMenuItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuItemProps, [
    "class",
    "inset",
  ]);

  return (
    <DropdownMenuPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.inset && "pl-8",
        local.class,
      )}
      {...rest}
    />
  );
};

export type DropdownMenuGroupLabelProps<T extends ValidComponent = "span"> =
  DropdownMenuPrimitive.DropdownMenuGroupLabelProps<T> & {
    class?: string;
  };

export const DropdownMenuGroupLabel = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, DropdownMenuGroupLabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuGroupLabelProps, [
    "class",
  ]);

  return (
    <DropdownMenuPrimitive.GroupLabel
      as="div"
      class={cn("px-2 py-1.5 font-semibold text-sm", local.class)}
      {...rest}
    />
  );
};

export type DropdownMenuItemLabelProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuItemLabelProps<T> & {
    class?: string;
  };

export const DropdownMenuItemLabel = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuItemLabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuItemLabelProps, [
    "class",
  ]);

  return (
    <DropdownMenuPrimitive.ItemLabel
      as="div"
      class={cn("px-2 py-1.5 font-semibold text-sm", local.class)}
      {...rest}
    />
  );
};

export type DropdownMenuSeparatorProps<T extends ValidComponent = "hr"> =
  DropdownMenuPrimitive.DropdownMenuItemLabelProps<T> & {
    class?: string;
  };

export const DropdownMenuSeparator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, DropdownMenuSeparatorProps<T>>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuSeparatorProps, [
    "class",
  ]);

  return (
    <DropdownMenuPrimitive.Separator
      class={cn("-mx-1 my-1 h-px bg-muted", local.class)}
      {...rest}
    />
  );
};

export type DropdownMenuShortcutProps<T extends ValidComponent = "span"> =
  ComponentProps<T>;

export const DropdownMenuShortcut = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, DropdownMenuShortcutProps<T>>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuShortcutProps, [
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

export type DropdownMenuSubTriggerProps<T extends ValidComponent = "div"> =
  ParentProps<
    DropdownMenuPrimitive.DropdownMenuSubTriggerProps<T> & {
      class?: string;
    }
  >;

export const DropdownMenuSubTrigger = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuSubTriggerProps<T>>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuSubTriggerProps, [
    "class",
    "children",
  ]);

  return (
    <DropdownMenuPrimitive.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[expanded]:bg-accent",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <ChevronRightIcon class="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
};

export type DropdownMenuSubContentProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuSubTriggerProps<T> & {
    class?: string;
  };

export const DropdownMenuSubContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuSubContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuSubContentProps, [
    "class",
  ]);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 min-w-8rem overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[closed]:animate-out data-[expanded]:animate-in",
          local.class,
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

export type DropdownMenuCheckboxItemProps<T extends ValidComponent = "div"> =
  ParentProps<
    DropdownMenuPrimitive.DropdownMenuCheckboxItemProps<T> & {
      class?: string;
    }
  >;

export const DropdownMenuCheckboxItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuCheckboxItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuCheckboxItemProps, [
    "class",
    "children",
  ]);

  return (
    <DropdownMenuPrimitive.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <DropdownMenuPrimitive.ItemIndicator class="absolute left-2 inline-flex h-4 w-4 items-center justify-center">
        <CheckIcon class="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
      {props.children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
};

export type DropdownMenuRadioItemProps<T extends ValidComponent = "div"> =
  ParentProps<
    DropdownMenuPrimitive.DropdownMenuRadioItemProps<T> & {
      class?: string;
    }
  >;

export const DropdownMenuRadioItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuRadioItemProps>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuRadioItemProps, [
    "class",
    "children",
  ]);

  return (
    <DropdownMenuPrimitive.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <DropdownMenuPrimitive.ItemIndicator class="absolute left-2 inline-flex h-4 w-4 items-center justify-center">
        <CircleIcon class="h-2 w-2" />
      </DropdownMenuPrimitive.ItemIndicator>
      {props.children}
    </DropdownMenuPrimitive.RadioItem>
  );
};
