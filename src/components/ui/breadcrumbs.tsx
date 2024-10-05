import { cn } from "@/lib/utils";
import * as BreadcrumbPrimitive from "@kobalte/core/breadcrumbs";
import { Polymorphic } from "@kobalte/core/polymorphic";
import { ChevronRightIcon, EllipsisIcon } from "lucide-solid";
import { Show, splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";

export const Breadcrumb = BreadcrumbPrimitive.Root;

export type BreadcrumbListProps<T extends ValidComponent = "ol"> =
  ComponentProps<T> & { class?: string };

export const BreadcrumbList = <T extends ValidComponent = "ol">(
  props: PolymorphicProps<T, BreadcrumbListProps<T>>,
) => {
  const [local, rest] = splitProps(props as BreadcrumbListProps, ["class"]);

  return (
    <Polymorphic
      as="ol"
      class={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5",
        local.class,
      )}
      {...rest}
    />
  );
};

export type BreadcrumbItemProps<T extends ValidComponent = "li"> =
  ComponentProps<T> & { class?: string };

export const BreadcrumbItem = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, BreadcrumbItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as BreadcrumbItemProps, ["class"]);

  return (
    <Polymorphic
      as="li"
      class={cn("inline-flex items-center gap-1.5", local.class)}
      {...rest}
    />
  );
};

export type BreadcrumbLinkProps<T extends ValidComponent = "a"> =
  BreadcrumbPrimitive.BreadcrumbsLinkProps<T> & { class?: string };

export const BreadcrumbLink = <T extends ValidComponent = "a">(
  props: PolymorphicProps<T, BreadcrumbLinkProps<T>>,
) => {
  const [local, rest] = splitProps(props as BreadcrumbLinkProps, ["class"]);

  return (
    <BreadcrumbPrimitive.Link
      class={cn(
        "transition-colors hover:text-foreground data-[current]:font-normal data-[current]:text-foreground",
        local.class,
      )}
      {...rest}
    />
  );
};

export type BreadcrumbSeparatorProps<T extends ValidComponent = "span"> =
  ParentProps<
    BreadcrumbPrimitive.BreadcrumbsSeparatorProps<T> & {
      class?: string;
    }
  >;

export const BreadcrumbSeparator = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, BreadcrumbSeparatorProps<T>>,
) => {
  const [local, rest] = splitProps(props as BreadcrumbSeparatorProps, [
    "class",
    "children",
  ]);

  return (
    <BreadcrumbPrimitive.Separator
      class={cn("[&>svg]:size-3.5", local.class)}
      {...rest}
    >
      <Show
        when={local.children}
        fallback={<ChevronRightIcon class="size-4" />}
      >
        {local.children}
      </Show>
    </BreadcrumbPrimitive.Separator>
  );
};

export type BreadcrumbEllipsisProps<T extends ValidComponent = "span"> =
  ComponentProps<T>;

export const BreadcrumbEllipsis = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, BreadcrumbEllipsisProps<T>>,
) => {
  const [local, rest] = splitProps(props as BreadcrumbEllipsisProps, ["class"]);

  return (
    <Polymorphic
      as="span"
      class={cn("flex size-9 items-center justify-center", local.class)}
      {...rest}
    >
      <EllipsisIcon class="size-4" />
      <span class="sr-only">More</span>
    </Polymorphic>
  );
};
