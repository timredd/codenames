import { cn } from "@/lib/utils";
import * as LinkPrimitive from "@kobalte/core/link";
import { A } from "@solidjs/router";
import { cva } from "cva";
import { Match, Switch, splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "cva";
import type { ValidComponent } from "solid-js";

export const linkVariants = cva({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "size-10",
    },
  },
  defaultVariants: {
    variant: "link",
    size: "default",
  },
});

export type LinkProps<T extends ValidComponent = "a"> =
  LinkPrimitive.LinkRootProps<T> &
    VariantProps<typeof linkVariants> & {
      class?: string;
    };

export const Link = <T extends ValidComponent = "a">(
  props: PolymorphicProps<T, LinkProps<T>>,
) => {
  const [local, rest] = splitProps(props as LinkProps, [
    "variant",
    "size",
    "class",
  ]);

  return (
    <Switch
      fallback={
        <LinkPrimitive.Root
          class={cn(
            linkVariants({ variant: local.variant, size: local.size }),
            local.class,
          )}
          {...rest}
        />
      }
    >
      <Match keyed when={props.href}>
        {(href) => (
          <LinkPrimitive.Root
            as={A}
            href={href}
            class={cn(
              linkVariants({ variant: local.variant, size: local.size }),
              local.class,
            )}
            {...rest}
          />
        )}
      </Match>
    </Switch>
  );
};
