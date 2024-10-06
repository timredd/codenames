import { cn } from "@/lib/utils";
import * as TextFieldPrimitive from "@kobalte/core/text-field";
import { cva } from "cva";
import { splitProps } from "solid-js";
import { Input } from "./input";
import { Label } from "./label";
import { TextArea } from "./textarea";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";
import type { InputProps } from "./input";
import type { TextAreaProps } from "./textarea";

export type TextFieldProps = TextFieldPrimitive.TextFieldRootProps & {
  class?: string;
};

export const TextField = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TextFieldProps>,
) => {
  const [local, rest] = splitProps(props as TextFieldProps, ["class"]);

  return (
    <TextFieldPrimitive.Root class={cn("space-y-1", local.class)} {...rest} />
  );
};

export const textfieldLabel = cva({
  base: "text-sm data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 font-medium",
  variants: {
    label: {
      true: "data-[invalid]:text-destructive",
    },
    error: {
      true: "text-destructive",
    },
    description: {
      true: "font-normal text-muted-foreground",
    },
  },
  defaultVariants: {
    label: true,
  },
});

export type TextFieldInputProps<T extends ValidComponent = "input"> =
  InputProps<T> & {
    class?: string;
  };

export const TextFieldInput = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, TextFieldInputProps>,
) => {
  const [local, rest] = splitProps(props as TextFieldInputProps, ["class"]);

  return <TextFieldPrimitive.Input as={Input} class={local.class} {...rest} />;
};

export type TextFieldTextAreaProps<T extends ValidComponent = "textarea"> =
  TextAreaProps<T> & {
    class?: string;
  };

export const TextFieldTextArea = <T extends ValidComponent = "textarea">(
  props: PolymorphicProps<T, TextFieldTextAreaProps<T>>,
) => {
  const [local, rest] = splitProps(props as TextFieldTextAreaProps, ["class"]);

  return (
    <TextFieldPrimitive.TextArea as={TextArea} class={local.class} {...rest} />
  );
};

export type TextFieldLabelProps = TextFieldPrimitive.TextFieldLabelProps & {
  class?: string;
};

export const TextFieldLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, TextFieldLabelProps>,
) => {
  const [local, rest] = splitProps(props as TextFieldLabelProps, ["class"]);

  return <TextFieldPrimitive.Label as={Label} class={local.class} {...rest} />;
};

export type TextFieldErrorMessageProps =
  TextFieldPrimitive.TextFieldErrorMessageProps & {
    class?: string;
  };

export const TextFieldErrorMessage = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TextFieldErrorMessageProps>,
) => {
  const [local, rest] = splitProps(props as TextFieldErrorMessageProps, [
    "class",
  ]);

  return (
    <TextFieldPrimitive.ErrorMessage
      class={cn(textfieldLabel({ error: true }), local.class)}
      {...rest}
    />
  );
};

export type TextFieldDescriptionProps =
  TextFieldPrimitive.TextFieldDescriptionProps & {
    class?: string;
  };

export const TextFieldDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TextFieldDescriptionProps>,
) => {
  const [local, rest] = splitProps(props as TextFieldDescriptionProps, [
    "class",
  ]);

  return (
    <TextFieldPrimitive.Description
      class={cn(textfieldLabel({ description: true }), local.class)}
      {...rest}
    />
  );
};
