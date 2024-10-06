import { cn } from "@/lib/utils";
import { Polymorphic } from "@kobalte/core/polymorphic";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ValidComponent } from "solid-js";

export type CardProps<T extends ValidComponent = "div"> = ComponentProps<T>;

export const Card = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CardProps<T>>,
) => {
  const [local, rest] = splitProps(props as CardProps, ["class"]);

  return (
    <Polymorphic
      as="div"
      class={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        local.class,
      )}
      {...rest}
    />
  );
};

export type CardHeaderProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const CardHeader = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CardHeaderProps<T>>,
) => {
  const [local, rest] = splitProps(props as CardHeaderProps, ["class"]);

  return (
    <Polymorphic
      as="div"
      class={cn("flex flex-col space-y-1.5 p-6", local.class)}
      {...rest}
    />
  );
};

export type CardTitleProps<T extends ValidComponent = "h3"> = ComponentProps<T>;

export const CardTitle = <T extends ValidComponent = "h3">(
  props: PolymorphicProps<T, CardTitleProps<T>>,
) => {
  const [local, rest] = splitProps(props as CardTitleProps, ["class"]);

  return (
    <Polymorphic
      as="h3"
      class={cn(
        "font-semibold text-2xl leading-none tracking-tight",
        local.class,
      )}
      {...rest}
    />
  );
};

export type CardDescriptionProps<T extends ValidComponent = "p"> =
  ComponentProps<T>;

export const CardDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, CardDescriptionProps<T>>,
) => {
  const [local, rest] = splitProps(props as CardDescriptionProps, ["class"]);

  return (
    <Polymorphic
      as="p"
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
};

export type CardContentProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const CardContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CardContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as CardContentProps, ["class"]);

  return <Polymorphic as="div" class={cn("p-6 pt-0", local.class)} {...rest} />;
};

export type CardFooterProps<T extends ValidComponent = "div"> =
  ComponentProps<T>;

export const CardFooter = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CardFooterProps<T>>,
) => {
  const [local, rest] = splitProps(props as CardFooterProps, ["class"]);

  return (
    <Polymorphic
      as="div"
      class={cn("flex items-center p-6 pt-0", local.class)}
      {...rest}
    />
  );
};
