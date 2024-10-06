import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@kobalte/core/checkbox";
import { CheckIcon } from "lucide-solid";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent, VoidProps } from "solid-js";

export const CheckboxErrorMessage = CheckboxPrimitive.ErrorMessage;
export const CheckboxDescription = CheckboxPrimitive.Description;

export type CheckboxProps<T extends ValidComponent = "div"> =
  CheckboxPrimitive.CheckboxRootProps<T> & {
    class?: string;
  };

export const Checkbox = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CheckboxProps<T>>,
) => {
  const [local, rest] = splitProps(props as CheckboxProps, ["class"]);

  return <CheckboxPrimitive.Root class={local.class} {...rest} />;
};

export type CheckboxInputProps<T extends ValidComponent = "input"> =
  CheckboxPrimitive.CheckboxInputProps<T> & { class?: string };

export const CheckboxInput = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, CheckboxInputProps<T>>,
) => {
  const [local, rest] = splitProps(props as CheckboxInputProps, ["class"]);

  return (
    <CheckboxPrimitive.Input
      class={cn(
        "[&:focus-visible+div]:outline-none [&:focus-visible+div]:ring-[1.5px] [&:focus-visible+div]:ring-ring [&:focus-visible+div]:ring-offset-2 [&:focus-visible+div]:ring-offset-background",
        local.class,
      )}
      {...rest}
    />
  );
};

export type CheckboxControlProps<T extends ValidComponent = "div"> = VoidProps<
  CheckboxPrimitive.CheckboxControlProps<T> & { class?: string }
>;

export const CheckboxControl = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CheckboxControlProps<T>>,
) => {
  const [local, rest] = splitProps(props as CheckboxControlProps, [
    "class",
    "children",
  ]);

  return (
    <>
      <CheckboxInput />
      <CheckboxPrimitive.Control
        class={cn(
          "h-4 w-4 shrink-0 rounded-sm border border-primary shadow transition-shadow focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[disabled]:cursor-not-allowed data-[checked]:bg-primary data-[checked]:text-primary-foreground data-[disabled]:opacity-50",
          local.class,
        )}
        {...rest}
      >
        <CheckboxPrimitive.Indicator class="flex items-center justify-center text-current">
          <CheckIcon class="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
    </>
  );
};

export type CheckboxLabelProps<T extends ValidComponent = "label"> =
  CheckboxPrimitive.CheckboxLabelProps<T> & { class?: string };

export const CheckboxLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, CheckboxLabelProps<T>>,
) => {
  const [local, rest] = splitProps(props as CheckboxLabelProps, ["class"]);

  return <CheckboxPrimitive.Label as={Label} class={local.class} {...rest} />;
};
