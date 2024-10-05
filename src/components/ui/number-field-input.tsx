import { cn } from "@/lib/utils";
import * as NumberFieldPrimitive from "@kobalte/core/number-field";
import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-solid";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { Show, splitProps } from "solid-js";

export const NumberField = NumberFieldPrimitive.Root;

export type NumberFieldGroupProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const NumberFieldGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, NumberFieldGroupProps<T>>,
) => {
  const [local, rest] = splitProps(props as NumberFieldGroupProps, ["class"]);

  return (
    <Polymorphic
      as="div"
      class={cn(
        "relative rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        local.class,
      )}
      {...rest}
    />
  );
};

export type NumberFieldLabelProps<T extends ValidComponent = "label"> =
  NumberFieldPrimitive.NumberFieldLabelProps<T> & {
    class?: string;
  };

export const NumberFieldLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, NumberFieldLabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as NumberFieldLabelProps, ["class"]);

  return (
    <NumberFieldPrimitive.Label
      class={cn(
        "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        local.class,
      )}
      {...rest}
    />
  );
};

export type NumberFieldInputProps<T extends ValidComponent = "input"> =
  NumberFieldPrimitive.NumberFieldInputProps<T> & {
    class?: string | undefined;
  };

export const NumberFieldInput = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, NumberFieldInputProps<T>>,
) => {
  const [local, rest] = splitProps(props as NumberFieldInputProps, ["class"]);

  return (
    <NumberFieldPrimitive.Input
      class={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[invalid]:border-error-foreground data-[invalid]:text-error-foreground",
        local.class,
      )}
      {...rest}
    />
  );
};

export type NumberFieldIncrementTriggerProps<
  T extends ValidComponent = "button",
> = ParentProps<
  NumberFieldPrimitive.NumberFieldIncrementTriggerProps<T> & {
    class?: string;
  }
>;

export const NumberFieldIncrementTrigger = <
  T extends ValidComponent = "button",
>(
  props: PolymorphicProps<T, NumberFieldIncrementTriggerProps<T>>,
) => {
  const [local, rest] = splitProps(props as NumberFieldIncrementTriggerProps, [
    "class",
    "children",
  ]);

  return (
    <NumberFieldPrimitive.IncrementTrigger
      class={cn(
        "absolute top-1 right-1 inline-flex size-4 items-center justify-center",
        local.class,
      )}
      {...rest}
    >
      <Show when={local.children} fallback={<ChevronUpIcon class="size-4" />}>
        {local.children}
      </Show>
    </NumberFieldPrimitive.IncrementTrigger>
  );
};

export type NumberFieldDecrementTriggerProps<
  T extends ValidComponent = "button",
> = ParentProps<
  NumberFieldPrimitive.NumberFieldDecrementTriggerProps<T> & {
    class?: string;
  }
>;

export const NumberFieldDecrementTrigger = <
  T extends ValidComponent = "button",
>(
  props: PolymorphicProps<T, NumberFieldDecrementTriggerProps<T>>,
) => {
  const [local, rest] = splitProps(props as NumberFieldDecrementTriggerProps, [
    "class",
    "children",
  ]);

  return (
    <NumberFieldPrimitive.DecrementTrigger
      class={cn(
        "absolute right-1 bottom-1 inline-flex size-4 items-center justify-center",
        local.class,
      )}
      {...rest}
    >
      <Show when={local.children} fallback={<ChevronDownIcon class="size-4" />}>
        {local.children}
      </Show>
    </NumberFieldPrimitive.DecrementTrigger>
  );
};

export type NumberFieldDescriptionProps<T extends ValidComponent = "div"> =
  NumberFieldPrimitive.NumberFieldDescriptionProps<T> & {
    class?: string;
  };

export const NumberFieldDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, NumberFieldDescriptionProps<T>>,
) => {
  const [local, rest] = splitProps(props as NumberFieldDescriptionProps, [
    "class",
  ]);

  return (
    <NumberFieldPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
};

export type NumberFieldErrorMessageProps<T extends ValidComponent = "div"> =
  NumberFieldPrimitive.NumberFieldErrorMessageProps<T> & {
    class?: string;
  };

export const NumberFieldErrorMessage = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, NumberFieldErrorMessageProps<T>>,
) => {
  const [local, rest] = splitProps(props as NumberFieldErrorMessageProps, [
    "class",
  ]);

  return (
    <NumberFieldPrimitive.ErrorMessage
      class={cn("text-error-foreground text-sm", local.class)}
      {...rest}
    />
  );
};
