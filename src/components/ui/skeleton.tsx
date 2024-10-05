import { cn } from "@/lib/utils";
import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import * as SkeletonPrimitive from "@kobalte/core/skeleton";
import { splitProps } from "solid-js";

import type { ComponentProps, ValidComponent } from "solid-js";

export type SimpleSkeletonProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const SimpleSkeleton = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SimpleSkeletonProps<T>>,
) => {
  const [local, rest] = splitProps(props as SimpleSkeletonProps, ["class"]);

  return (
    <Polymorphic
      as="div"
      class={cn("animate-pulse rounded-md bg-primary/10", local.class)}
      {...rest}
    />
  );
};

export type SkeletonProps<T extends ValidComponent = "div"> =
  SkeletonPrimitive.SkeletonRootProps<T> & { class?: string };

export const Skeleton = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SkeletonProps<T>>,
) => {
  const [local, rest] = splitProps(props as SkeletonProps, ["class"]);

  return (
    <SkeletonPrimitive.Root
      class={cn(
        "bg-primary/10 data-[animate='true']:animate-pulse ",
        local.class,
      )}
      {...rest}
    />
  );
};
