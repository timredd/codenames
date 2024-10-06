import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@kobalte/core/radio-group";
import { CircleIcon } from "lucide-solid";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { JSX, ValidComponent } from "solid-js";
import { Label } from "./label";

export const RadioGroupErrorMessage = RadioGroupPrimitive.ErrorMessage;

export type RadioGroupProps<T extends ValidComponent = "div"> =
  RadioGroupPrimitive.RadioGroupRootProps<T> & { class?: string | undefined };

export const RadioGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, RadioGroupProps<T>>,
) => {
  const [local, rest] = splitProps(props as RadioGroupProps, ["class"]);

  return (
    <RadioGroupPrimitive.Root class={cn("grid gap-2", local.class)} {...rest} />
  );
};

export type RadioGroupLabelProps<T extends ValidComponent = "label"> =
  RadioGroupPrimitive.RadioGroupLabelProps<T> & { class?: string };

export const RadioGroupLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, RadioGroupLabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as RadioGroupLabelProps, ["class"]);

  return <RadioGroupPrimitive.Label as={Label} class={local.class} {...rest} />;
};

export type RadioGroupItemInputProps<T extends ValidComponent = "input"> =
  RadioGroupPrimitive.RadioGroupItemInputProps<T> & {
    class?: string;
  };

export const RadioGroupItemInput = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, RadioGroupItemInputProps<T>>,
) => {
  const [local, rest] = splitProps(props as RadioGroupItemInputProps, [
    "class",
  ]);

  return <RadioGroupPrimitive.ItemInput class={local.class} {...rest} />;
};

export type RadioGroupItemControlProps<T extends ValidComponent = "div"> =
  RadioGroupPrimitive.RadioGroupItemControlProps<T> & {
    class?: string;
  };

export const RadioGroupItemControl = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, RadioGroupItemControlProps<T>>,
) => {
  const [local, rest] = splitProps(props as RadioGroupItemControlProps, [
    "class",
  ]);

  return (
    <RadioGroupPrimitive.ItemControl
      class={cn(
        "aspect-square size-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
};

export type RadioGroupItemProps<T extends ValidComponent = "div"> =
  RadioGroupPrimitive.RadioGroupItemProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

export const RadioGroupItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, RadioGroupItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as RadioGroupItemProps, [
    "class",
    "children",
  ]);

  return (
    <RadioGroupPrimitive.Item
      class={cn("flex items-center space-x-2", local.class)}
      {...rest}
    >
      <RadioGroupItemInput />
      <RadioGroupItemControl>
        <RadioGroupPrimitive.ItemIndicator class="flex h-full items-center justify-center ">
          <CircleIcon class="size-2.5 fill-current text-current" />
        </RadioGroupPrimitive.ItemIndicator>
      </RadioGroupItemControl>
      {local.children}
    </RadioGroupPrimitive.Item>
  );
};

export type RadioGroupItemLabelProps<T extends ValidComponent = "label"> =
  RadioGroupPrimitive.RadioGroupItemLabelProps<T> & {
    class?: string;
  };

export const RadioGroupItemLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, RadioGroupItemLabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as RadioGroupItemLabelProps, [
    "class",
  ]);

  return (
    <RadioGroupPrimitive.ItemLabel
      as={Label}
      class={cn(
        "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        local.class,
      )}
      {...rest}
    />
  );
};
