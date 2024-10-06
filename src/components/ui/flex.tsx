import { cn } from "@/lib/utils";
import { mergeProps, splitProps } from "solid-js";

import type { ComponentProps, ValidComponent } from "solid-js";

type JustifyContent =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";
type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";
type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";

export type FlexProps<T extends ValidComponent = "div"> = ComponentProps<T> & {
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
};

export const Flex = (props: FlexProps) => {
  const defaultProps = {
    flexDirection: "row",
    justifyContent: "between",
    alignItems: "center",
  } satisfies FlexProps;
  const merge = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(merge, [
    "flexDirection",
    "justifyContent",
    "alignItems",
    "class",
  ]);

  return (
    <div
      class={cn(
        "flex w-full",
        flexDirection[local.flexDirection],
        justifyContent[local.justifyContent],
        alignItems[local.alignItems],
        local.class,
      )}
      {...rest}
    />
  );
};

const justifyContent: { [key in JustifyContent]: string } = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const alignItems: { [key in AlignItems]: string } = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const flexDirection: { [key in FlexDirection]: string } = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
};
