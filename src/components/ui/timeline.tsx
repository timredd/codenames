import { cn } from "@/lib/utils";
import { Polymorphic, type PolymorphicProps } from "@kobalte/core";
import {
  For,
  Show,
  createMemo,
  mergeProps,
  splitProps,
  untrack,
} from "solid-js";

import type {
  ComponentProps,
  JSX,
  JSXElement,
  ParentProps,
  ValidComponent,
} from "solid-js";

export type TimelineBullet = {
  size: number;
  lineSize: number;
  isActive?: boolean;
};

export type TimelineItem = {
  title: JSX.Element;
  description?: JSX.Element;
  isActive: boolean;
  isActiveBullet: boolean;
  isLast?: boolean;
};

export type Timeline = {
  items: TimelineItem[];
};

export type TimelineProps<T extends ValidComponent = "ul"> = ComponentProps<T> &
  Timeline;

/*
  No bullet or line is active when activeItem is -1
  First bullet is active only if activeItem is 0 or more
  First line is active only if activeItem is 1 or more
*/
export const Timeline = <T extends ValidComponent = "ul">(
  props: PolymorphicProps<T, TimelineProps<T>>,
) => {
  const merged = mergeProps(
    { size: 16, lineSize: 2 } satisfies TimelineProps,
    props,
  );

  const [local, rest] = splitProps(merged as TimelineProps, ["class", "items"]);

  return (
    <TimelineContent {...rest}>
      <For each={local.items}>
        {(item, index) => (
          <TimelineItem
            title={item.title}
            description={item.description}
            isLast={index() === props.items.length - 1}
            isActive={
              props.activeItem === -1 ? false : props.activeItem >= index() + 1
            }
            isActiveBullet={
              props.activeItem === -1 ? false : props.activeItem >= index()
            }
            size={props.size}
            lineSize={props.lineSize}
            bulletComponent={() => item.bulletComponent}
          />
        )}
      </For>
    </TimelineContent>
  );
};

export type TimelineContentProps<T extends ValidComponent = "ul"> =
  ComponentProps<T>;

export const TimelineContent = <T extends ValidComponent = "ul">(
  props: PolymorphicProps<T, TimelineContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as TimelineContentProps, ["class"]);

  return (
    <Polymorphic
      as="ul"
      class={local.class}
      style={{
        "padding-left": `${props.size / 2}px`,
      }}
      {...rest}
    />
  );
};

type RequiredParameter<T> = T extends () => unknown ? never : T;

export type TimelineItemProps<T extends ValidComponent = "li"> =
  TimelineItem & {
    class?: string;
    // JSX
    title: JSXElement;
    description?: JSXElement;
    bulletComponent?:
      | JSX.Element
      | RequiredParameter<(props: TimelineItemBulletProps) => JSXElement>;
  };

const TimelineItem = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, TimelineItemProps<T>>,
) => {
  const [local, components, rest] = splitProps(
    props as TimelineItemProps,
    // Props
    ["class", "isLast", "isActive", "isActiveBullet"],
    // Components
    ["description", "title"],
  );

  const bulletComponent = createMemo(() => {
    const bullet = props.bulletComponent;
    const fn = typeof bullet === "function" && bullet.length > 0;
    return fn ? untrack(() => bullet) : bullet;
  });

  return (
    <Polymorphic
      as="li"
      class={cn(
        "relative border-l pb-8 pl-8",
        local.isLast && "border-l-transparent pb-0",
        local.isActive && !local.isLast && "border-l-primary",
        local.class,
      )}
      style={{
        "border-left-width": `${bulletProps.lineSize}px`,
      }}
      {...rest}
    >
      {bulletComponent()}
      <TimelineItemTitle>{components.title}</TimelineItemTitle>
      <Show when={components.description}>
        <TimelineItemDescription>
          {components.description}
        </TimelineItemDescription>
      </Show>
    </Polymorphic>
  );
};

export type TimelineItemBulletProps<T extends ValidComponent = "div"> =
  ParentProps<ComponentProps<T>> & TimelineBullet;

export const TimelineItemBullet = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TimelineItemBulletProps<T>>,
) => {
  const [local, rest] = splitProps(props as TimelineItemBulletProps, [
    "class",
    "children",
    "size",
    "lineSize",
    "isActive",
  ]);

  return (
    <Polymorphic
      as="div"
      aria-hidden="true"
      class={cn(
        "absolute top-0 flex items-center justify-center rounded-full border bg-background",
        local.isActive && "border-primary",
        local.class,
      )}
      style={{
        width: `${local.size}px`,
        height: `${local.size}px`,
        left: `${-local.size / 2 - local.lineSize / 2}px`,
        "border-width": `${local.lineSize}px`,
      }}
      {...rest}
    >
      {local.children}
    </Polymorphic>
  );
};

export type TimelineItemTitleProps<T extends ValidComponent = "div"> =
  ParentProps<ComponentProps<T>>;

export const TimelineItemTitle = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TimelineItemTitleProps<T>>,
) => {
  const [local, rest] = splitProps(props as TimelineItemTitleProps, [
    "class",
    "children",
  ]);

  return (
    <Polymorphic
      as="div"
      class={cn("mb-1 font-semibold text-base leading-none", local.class)}
      {...rest}
    >
      {local.children}
    </Polymorphic>
  );
};

export type TimelineItemDescriptionProps<T extends ValidComponent = "p"> =
  ComponentProps<T>;

export const TimelineItemDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, TimelineItemDescriptionProps<T>>,
) => {
  const [local, rest] = splitProps(props as TimelineItemDescriptionProps, [
    "class",
    "children",
  ]);

  return (
    <Polymorphic
      as="p"
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    >
      {local.children}
    </Polymorphic>
  );
};
