import { textfieldLabel } from "@/components/ui/textfield";
import { cn } from "@/lib/utils";
import * as NumberFieldPrimitive from "@kobalte/core/Number-field";
import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import { MinusIcon, PlusIcon } from "lucide-solid";
import type { ComponentProps, ValidComponent, VoidProps } from "solid-js";
import { splitProps } from "solid-js";

export const NumberFieldHiddenInput = NumberFieldPrimitive.HiddenInput;

export type NumberFieldLabelProps<T extends ValidComponent = "div"> =
  NumberFieldPrimitive.NumberFieldLabelProps<T> & {
    class?: string;
  };

export const NumberFieldLabel = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, NumberFieldLabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as NumberFieldLabelProps, ["class"]);

  return (
    <NumberFieldPrimitive.Label
      class={cn(textfieldLabel({ label: true }), local.class)}
      {...rest}
    />
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
      class={cn(
        textfieldLabel({ description: true, label: false }),
        local.class,
      )}
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
      class={cn(textfieldLabel({ error: true }), local.class)}
      {...rest}
    />
  );
};

export type NumberFieldProps<T extends ValidComponent = "div"> =
  NumberFieldPrimitive.NumberFieldRootProps<T> & {
    class?: string;
  };

export const NumberField = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, NumberFieldProps<T>>,
) => {
  const [local, rest] = splitProps(props as NumberFieldProps, ["class"]);

  return (
    <NumberFieldPrimitive.Root
      class={cn("grid gap-1.5", local.class)}
      {...rest}
    />
  );
};

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
        "relative rounded-md transition-shadow focus-within:outline-none focus-within:ring-[1.5px] focus-within:ring-ring",
        local.class,
      )}
      {...rest}
    />
  );
};

export type NumberFieldInputProps<T extends ValidComponent = "input"> =
  NumberFieldPrimitive.NumberFieldInputProps<T> & {
    class?: string;
  };

export const NumberFieldInput = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, VoidProps<NumberFieldInputProps<T>>>,
) => {
  const [local, rest] = splitProps(props as NumberFieldInputProps, ["class"]);

  return (
    <NumberFieldPrimitive.Input
      class={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-10 py-1 text-center text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
};

export type NumberFieldDecrementTriggerProps<
  T extends ValidComponent = "button",
> = VoidProps<
  NumberFieldPrimitive.NumberFieldDecrementTriggerProps<T> & {
    class?: string;
  }
>;

export const NumberFieldDecrementTrigger = <
  T extends ValidComponent = "button",
>(
  props: PolymorphicProps<T, VoidProps<NumberFieldDecrementTriggerProps<T>>>,
) => {
  const [local, rest] = splitProps(props as NumberFieldDecrementTriggerProps, [
    "class",
  ]);

  return (
    <NumberFieldPrimitive.DecrementTrigger
      class={cn(
        "-translate-y-1/2 absolute top-1/2 left-0 p-3 disabled:cursor-not-allowed disabled:opacity-20",
        local.class,
      )}
      {...rest}
    >
      <MinusIcon class="size-4">
        <title>Decrement</title>
      </MinusIcon>
    </NumberFieldPrimitive.DecrementTrigger>
  );
};

export type NumberFieldIncrementTriggerProps<
  T extends ValidComponent = "button",
> = VoidProps<
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
  ]);

  return (
    <NumberFieldPrimitive.IncrementTrigger
      class={cn(
        "-translate-y-1/2 absolute top-1/2 right-0 p-3 disabled:cursor-not-allowed disabled:opacity-20",
        local.class,
      )}
      {...rest}
    >
      <PlusIcon class="size-4">
        <title>Increment</title>
      </PlusIcon>
    </NumberFieldPrimitive.IncrementTrigger>
  );
};
