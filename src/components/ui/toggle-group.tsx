import { cn } from "@/lib/utils";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as ToggleGroupPrimitive from "@kobalte/core/toggle-group";
import { createContext, createMemo, splitProps, useContext } from "solid-js";
import { type ToggleVariants, toggleVariants } from "./toggle";

import type { Accessor, ParentProps, ValidComponent } from "solid-js";

type ToggleGroupContextValue = Accessor<ToggleVariants>;

const ToggleGroupContext = createContext<ToggleGroupContextValue>();

const useToggleGroup = () => {
  const context = useContext(ToggleGroupContext);

  if (!context) {
    throw new Error(
      "`useToggleGroup`: must be used within a `ToggleGroup` component",
    );
  }

  return context;
};

export type ToggleGroupProps<T extends ValidComponent = "div"> = ParentProps<
  ToggleGroupPrimitive.ToggleGroupRootProps<T> &
    ToggleVariants & {
      class?: string;
    }
>;

export const ToggleGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ToggleGroupProps<T>>,
) => {
  const [local, rest] = splitProps(props as ToggleGroupProps, [
    "class",
    "children",
    "size",
    "variant",
  ]);

  const value = createMemo<ToggleVariants>(() => ({
    size: local.size,
    variant: local.variant,
  }));

  return (
    <ToggleGroupPrimitive.Root
      class={cn("flex items-center justify-center gap-1", local.class)}
      {...rest}
    >
      <ToggleGroupContext.Provider value={value}>
        {local.children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
};

export type ToggleGroupItemProps<T extends ValidComponent = "button"> =
  ToggleGroupPrimitive.ToggleGroupItemProps<T> & {
    class?: string;
  };

export const ToggleGroupItem = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, ToggleGroupItemProps<T>>,
) => {
  const [local, rest] = splitProps(props as ToggleGroupItemProps, ["class"]);

  const context = useToggleGroup();

  return (
    <ToggleGroupPrimitive.Item
      class={cn(
        toggleVariants({
          variant: context().variant,
          size: context().size,
        }),
        local.class,
      )}
      {...rest}
    />
  );
};
