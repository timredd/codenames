import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@kobalte/core/popover";
import { XIcon } from "lucide-solid";
import { mergeProps, splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ParentProps, ValidComponent } from "solid-js";

export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverTitle = PopoverPrimitive.Title;
export const PopoverDescription = PopoverPrimitive.Description;

export const Popover = (props: PopoverPrimitive.PopoverRootProps) => {
  const merge = mergeProps({ gutter: 4 }, props);

  return <PopoverPrimitive.Root {...merge} />;
};

export type PopoverContentProps<T extends ValidComponent = "div"> = ParentProps<
  PopoverPrimitive.PopoverContentProps<T> & {
    class?: string;
  }
>;

export const PopoverContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, PopoverContentProps<T>>,
) => {
  const [local, rest] = splitProps(props as PopoverContentProps, [
    "class",
    "children",
  ]);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        class={cn(
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[closed]:animate-out data-[expanded]:animate-in",
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <PopoverPrimitive.CloseButton class="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-[opacity,box-shadow] hover:opacity-100 focus:outline-none focus:ring-[1.5px] focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <XIcon class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </PopoverPrimitive.CloseButton>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};
