import { cn } from "@/lib/utils";
import * as PaginationPrimitive from "@kobalte/core/pagination";
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "lucide-solid";
import { mergeProps, splitProps } from "solid-js";
import { buttonVariants } from "./button";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "cva";
import type { ValidComponent, VoidProps } from "solid-js";

export const PaginationItems = PaginationPrimitive.Items;

export interface PaginationProps
  extends PaginationPrimitive.PaginationRootProps {
  class?: string;
}

export const Pagination = <T extends ValidComponent = "nav">(
  props: PolymorphicProps<T, PaginationProps>,
) => {
  const [local, rest] = splitProps(props as PaginationProps, ["class"]);

  return (
    <PaginationPrimitive.Root
      class={cn(
        "mx-auto flex w-full justify-center [&>ul]:flex [&>ul]:flex-row [&>ul]:items-center [&>ul]:gap-1",
        local.class,
      )}
      {...rest}
    />
  );
};

export type PaginationItemProps<T extends ValidComponent = "button"> =
  PaginationPrimitive.PaginationItemProps<T> &
    Pick<VariantProps<typeof buttonVariants>, "size"> & {
      class?: string;
    };

export const PaginationItem = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, PaginationItemProps<T>>,
) => {
  const merge = mergeProps({ size: "icon" } as PaginationItemProps, props);

  const [local, rest] = splitProps(merge, ["class", "size"]);

  return (
    <PaginationPrimitive.Item
      class={cn(
        buttonVariants({
          variant: "ghost",
          size: local.size,
        }),
        "aria-[current=page]:border aria-[current=page]:border-input aria-[current=page]:bg-background aria-[current=page]:shadow-sm aria-[current=page]:hover:bg-accent aria-[current=page]:hover:text-accent-foreground",
        local.class,
      )}
      {...rest}
    />
  );
};

export type PaginationEllipsisProps<T extends ValidComponent = "div"> =
  VoidProps<
    PaginationPrimitive.PaginationEllipsisProps<T> & {
      class?: string;
    }
  >;

export const PaginationEllipsis = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, PaginationEllipsisProps<T>>,
) => {
  const [local, rest] = splitProps(props as PaginationEllipsisProps, ["class"]);

  return (
    <PaginationPrimitive.Ellipsis
      class={cn("flex h-9 w-9 items-center justify-center", local.class)}
      {...rest}
    >
      <EllipsisIcon class="h-4 w-4" />
      <span class="sr-only">More pages</span>
    </PaginationPrimitive.Ellipsis>
  );
};

export type PaginationPreviousProps<T extends ValidComponent = "button"> =
  PaginationPrimitive.PaginationPreviousProps<T> &
    Pick<VariantProps<typeof buttonVariants>, "size"> & {
      class?: string;
    };

export const PaginationPrevious = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, PaginationPreviousProps<T>>,
) => {
  const merge = mergeProps({ size: "icon" }, props);

  const [local, rest] = splitProps(merge, ["class", "size"]);

  return (
    <PaginationPrimitive.Previous
      class={cn(
        buttonVariants({
          variant: "ghost",
          size: local.size,
        }),
        "aria-[current=page]:border aria-[current=page]:border-input aria-[current=page]:bg-background aria-[current=page]:shadow-sm aria-[current=page]:hover:bg-accent aria-[current=page]:hover:text-accent-foreground",
        local.class,
      )}
      {...rest}
    >
      <ChevronLeftIcon class="h-4 w-4" />
    </PaginationPrimitive.Previous>
  );
};

export type PaginationNextProps<T extends ValidComponent = "button"> =
  PaginationPrimitive.PaginationNextProps<T> &
    Pick<VariantProps<typeof buttonVariants>, "size"> & {
      class?: string;
    };

export const PaginationNext = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, PaginationNextProps<T>>,
) => {
  const merge = mergeProps({ size: "icon" }, props);

  const [local, rest] = splitProps(merge, ["class", "size"]);

  return (
    <PaginationPrimitive.Next
      class={cn(
        buttonVariants({
          variant: "ghost",
          size: local.size,
        }),
        "aria-[current=page]:border aria-[current=page]:border-input aria-[current=page]:bg-background aria-[current=page]:shadow-sm aria-[current=page]:hover:bg-accent aria-[current=page]:hover:text-accent-foreground",
        local.class,
      )}
      {...rest}
    >
      <ChevronRightIcon class="h-4 w-4" />
    </PaginationPrimitive.Next>
  );
};
