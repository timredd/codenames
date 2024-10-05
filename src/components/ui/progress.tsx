import { Label } from "@/components/ui/label";
import * as ProgressPrimitive from "@kobalte/core/progress";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ParentProps, ValidComponent } from "solid-js";

export type ProgressRootProps<T extends ValidComponent = "div"> = ParentProps<
  ProgressPrimitive.ProgressRootProps<T> & {
    class?: string;
  }
>;

export const Progress = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ProgressRootProps<T>>,
) => {
  const [local, rest] = splitProps(props as ProgressRootProps, [
    "class",
    "children",
  ]);

  return (
    <ProgressPrimitive.Root {...rest}>
      {local.children}
      <ProgressPrimitive.Track class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <ProgressPrimitive.Fill class="h-full w-[var(--kb-progress-fill-width)] flex-1 bg-primary transition-all" />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
};

export const ProgressLabel = (props: ProgressPrimitive.ProgressLabelProps) => {
  return <ProgressPrimitive.Label as={Label} {...props} />;
};

export const ProgressValueLabel = (
  props: ProgressPrimitive.ProgressValueLabelProps,
) => {
  return <ProgressPrimitive.ValueLabel as={Label} {...props} />;
};
