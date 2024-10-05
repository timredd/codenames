import { cn } from "@/lib/utils";
import OTPFieldPrimitive from "@corvu/otp-field";
import { DotIcon } from "lucide-solid";
import { Show, splitProps } from "solid-js";

import type { DynamicProps, RootProps } from "@corvu/otp-field";
import type { ComponentProps, ValidComponent } from "solid-js";

export const REGEXP_ONLY_DIGITS = "^\\d*$";
export const REGEXP_ONLY_CHARS = "^[a-zA-Z]*$";
export const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]*$";

export type OTPFieldProps<T extends ValidComponent = "div"> = RootProps<T> & {
  class?: string;
};

export const OTPFieldInput = OTPFieldPrimitive.Input;

export const OTPField = <T extends ValidComponent = "div">(
  props: DynamicProps<T, OTPFieldProps<T>>,
) => {
  const [local, rest] = splitProps(props as OTPFieldProps, ["class"]);

  return (
    <OTPFieldPrimitive
      class={cn(
        "flex items-center gap-2 disabled:cursor-not-allowed has-[:disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
};

export type OTPFieldGroupProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const OTPFieldGroup = <T extends ValidComponent = "div">(
  props: DynamicProps<T, OTPFieldGroupProps<T>>,
) => {
  const [local, rest] = splitProps(props as OTPFieldGroupProps, ["class"]);

  return <div class={cn("flex items-center", local.class)} {...rest} />;
};

export type OTPFieldSlotProps<T extends ValidComponent = "div"> =
  ComponentProps<T> & { index: number };

export const OTPFieldSlot = <T extends ValidComponent = "div">(
  props: DynamicProps<T, OTPFieldSlotProps<T>>,
) => {
  const [local, rest] = splitProps(
    props as DynamicProps<T, OTPFieldSlotProps>,
    ["class", "index"],
  );

  const context = OTPFieldPrimitive.useContext();

  const char = () => context.value()[local.index];

  const showFakeCaret = () =>
    context.value().length === local.index && context.isInserting();

  return (
    <div
      class={cn(
        "group relative flex size-10 items-center justify-center border-input border-y border-r text-sm first:rounded-l-md first:border-l last:rounded-r-md",
        local.class,
      )}
      {...rest}
    >
      <div
        class={cn(
          "absolute inset-0 z-10 transition-all group-first:rounded-l-md group-last:rounded-r-md",
          context.activeSlots().includes(local.index) &&
            "ring-2 ring-ring ring-offset-background",
        )}
      />
      {char()}
      <Show when={showFakeCaret()}>
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      </Show>
    </div>
  );
};

export type OTPFieldSeparatorProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const OTPFieldSeparator = <T extends ValidComponent = "div">(
  props: DynamicProps<T, OTPFieldSeparatorProps<T>>,
) => {
  return (
    <div {...props}>
      <DotIcon class="size-6" />
    </div>
  );
};
