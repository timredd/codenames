import { cn } from "@/lib/utils";
import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import { cva } from "cva";
import { splitProps } from "solid-js";

import type { VariantProps } from "cva";
import type { ComponentProps, ValidComponent } from "solid-js";

export const badgeVariants = cva({
  base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    variant: {
      default:
        "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type BadgeProps<T extends ValidComponent = "div"> = ComponentProps<T> &
  VariantProps<typeof badgeVariants>;

export const Badge = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, BadgeProps<T>>,
) => {
  const [local, rest] = splitProps(props as BadgeProps, ["class", "variant"]);

  return (
    <Polymorphic
      as="div"
      class={cn(
        badgeVariants({
          variant: local.variant,
        }),
        local.class,
      )}
      {...rest}
    />
  );
};
