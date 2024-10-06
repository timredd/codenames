import type { ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { AsProp } from "./typography";

export type AspectRatioProps<T extends ValidComponent = "div"> = AsProp<T> & {
  ratio?: number;
};

export const AspectRatio = <T extends ValidComponent = "div">(
  props: AspectRatioProps<T>,
) => {
  const merged = mergeProps({ ratio: 1 / 1 }, props);

  const [local, rest] = splitProps(merged, ["as", "ratio"]);

  return (
    <Dynamic
      component={local.as ?? "div"}
      style={{
        position: "relative",
        width: "100%",
        "padding-bottom": `${100 / (local.ratio ?? 1)}%`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        {...rest}
      />
    </Dynamic>
  );
};
