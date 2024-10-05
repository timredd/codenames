import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@kobalte/core/select";
import { CheckIcon, ChevronDownIcon } from "lucide-solid";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ParentProps, ValidComponent } from "solid-js";

export const SelectValue = SelectPrimitive.Value;
export const SelectDescription = SelectPrimitive.Description;
export const SelectErrorMessage = SelectPrimitive.ErrorMessage;
export const SelectItemDescription = SelectPrimitive.ItemDescription;
export const SelectSection = SelectPrimitive.Section;

export type SelectProps<
  TOption,
  TOptGroup = never,
  T extends ValidComponent = "div",
> = SelectPrimitive.SelectRootProps<TOption, TOptGroup, T> & {
  class?: string;
};

export const Select = <
  TOption,
  TOptGroup = never,
  T extends ValidComponent = "div",
>(
  props: PolymorphicProps<T, SelectProps<TOption, TOptGroup, T>>,
) => {
  const [local, rest] = splitProps(props as SelectProps<TOption, TOptGroup>, [
    "class",
  ]);

  return <SelectPrimitive.Root class={local.class} {...rest} />;
};

export type SelectHiddenSelectProps =
  SelectPrimitive.SelectHiddenSelectProps & { class?: string };

export const SelectHiddenSelect = (props: SelectHiddenSelectProps) => {
  const [local, rest] = splitProps(props as SelectHiddenSelectProps, ["class"]);

  return <SelectPrimitive.HiddenSelect class={local.class} {...rest} />;
};

export type SelectTriggerProps<T extends ValidComponent = "button"> =
  ParentProps<SelectPrimitive.SelectTriggerProps<T> & { class?: string }>;

export const SelectTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, SelectTriggerProps<T>>,
) => {
  const [local, rest] = splitProps(props as SelectTriggerProps, [
    "class",
    "children",
  ]);

  return (
    <SelectPrimitive.Trigger
      class={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background transition-shadow placeholder:text-muted-foreground focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    >
      {props.children}
      <SelectPrimitive.Icon class="flex size-4 items-center justify-center opacity-50">
        <ChevronDownIcon class="size-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

export type SelectContentProps<T extends ValidComponent = "div"> =
  SelectPrimitive.SelectContentProps<T> & {
    class?: string;
  };

export const SelectContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SelectContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as SelectContentProps, ["class"]);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[closed]:animate-out data-[expanded]:animate-in",
          local.class,
        )}
        {...rest}
      >
        <SelectPrimitive.Listbox class="p-1 focus-visible:outline-none" />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

export type SelectItemProps<T extends ValidComponent = "li"> = ParentProps<
  SelectPrimitive.SelectItemProps<T> & { class?: string }
>;

export const SelectItem = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, SelectItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as SelectItemProps, [
    "class",
    "children",
  ]);

  return (
    <SelectPrimitive.Item
      class={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <SelectPrimitive.ItemIndicator class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <CheckIcon class="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemLabel>{local.children}</SelectPrimitive.ItemLabel>
    </SelectPrimitive.Item>
  );
};

export type SelectLabelProps<T extends ValidComponent = "label"> =
  SelectPrimitive.SelectLabelProps<T> & { class?: string };

export const SelectLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, SelectLabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as SelectLabelProps, ["class"]);

  return <SelectPrimitive.Label as={Label} class={local.class} {...rest} />;
};
