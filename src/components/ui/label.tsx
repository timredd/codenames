import { cn } from "@/lib/utils";
import { cva } from "cva";
import { splitProps } from "solid-js";

import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "cva";
import type { ComponentProps, ValidComponent } from "solid-js";

export const labelVariants = cva({
  base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
});

export type LabelProps<T extends ValidComponent = "label"> = ComponentProps<T> &
  VariantProps<typeof labelVariants> & {
    class?: string;
  };

export const Label = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, LabelProps<T>>,
) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Polymorphic
      as="label"
      class={cn(labelVariants(), local.class)}
      {...rest}
    />
  );
};
