import { cn } from "@/lib/utils";
import {
  type ComponentProps,
  type FlowProps,
  type ValidComponent,
  splitProps,
} from "solid-js";
import { Dynamic, type DynamicProps } from "solid-js/web";

export type AsProp<T extends ValidComponent> = Omit<
  DynamicProps<T, ComponentProps<T>>,
  "component"
> & {
  as?: DynamicProps<T, ComponentProps<T>>["component"];
};

export type TypographyProps<T extends ValidComponent> = FlowProps<AsProp<T>> & {
  class?: string;
};

export const H1 = <T extends ValidComponent = "h1">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "h1"}
      class={cn(
        "scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const H2 = <T extends ValidComponent = "h2">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "h2"}
      class={cn(
        "scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const H3 = <T extends ValidComponent = "h3">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "h3"}
      class={cn(
        "scroll-m-20 font-semibold text-2xl tracking-tight",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const H4 = <T extends ValidComponent = "h4">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "h4"}
      class={cn(
        "scroll-m-20 font-semibold text-xl tracking-tight",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const Lead = <T extends ValidComponent = "p">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "p"}
      class={cn("text-muted-foreground text-xl", local.class)}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const P = <T extends ValidComponent = "p">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "p"}
      class={cn("leading-7 [&:not(:first-child)]:mt-6", local.class)}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const Large = <T extends ValidComponent = "div">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "div"}
      class={cn("font-semibold text-lg", local.class)}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const Small = <T extends ValidComponent = "p">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "p"}
      class={cn("font-medium text-sm leading-none", local.class)}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const Muted = <T extends ValidComponent = "span">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "span"}
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const InlineCode = <T extends ValidComponent = "code">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "code"}
      class={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const List = <T extends ValidComponent = "ul">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "ul"}
      class={cn("my-6 ml-6 list-disc [&>li]:mt-2", local.class)}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const Quote = <T extends ValidComponent = "blockquote">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "blockquote"}
      class={cn(
        "mt-6 border-l-2 pl-6 text-muted-foreground italic",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};
