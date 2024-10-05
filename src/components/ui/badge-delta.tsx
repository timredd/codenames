import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { cva } from "cva";
import {
  ArrowDownIcon,
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpLeftIcon,
} from "lucide-solid";
import { splitProps } from "solid-js";

import type { BadgeProps } from "@/components/ui/badge";
import type { VariantProps } from "cva";
import type { LucideIcon } from "lucide-solid";
import { Dynamic } from "solid-js/web";

const badgeDeltaVariants = cva({
  base: [""],
  variants: {
    delta: {
      increase: "bg-success text-success-foreground hover:bg-success",
      moderateIncrease: "bg-success text-success-foreground hover:bg-success",
      unchanged: "bg-warning text-warning-foreground hover:bg-warning",
      moderateDecrease: "bg-error text-error-foreground hover:bg-error",
      decrease: "bg-error text-error-foreground hover:bg-error",
    },
  },
  defaultVariants: {
    delta: "unchanged",
  },
});

export interface BadgeDeltaVariants
  extends VariantProps<typeof badgeDeltaVariants> {}

type DeltaType = NonNullable<BadgeDeltaVariants["delta"]>;

const iconMap: Record<DeltaType, LucideIcon> = {
  increase: ArrowUpIcon,
  moderateIncrease: ArrowUpLeftIcon,
  unchanged: ArrowRightIcon,
  moderateDecrease: ArrowDownRightIcon,
  decrease: ArrowDownIcon,
};

export type BadgeDeltaProps = Omit<BadgeProps, "variant"> & BadgeDeltaVariants;

export const BadgeDelta = (props: BadgeDeltaProps) => {
  const [local, rest] = splitProps(props as BadgeDeltaProps, [
    "class",
    "children",
    "delta",
  ]);

  return (
    <Badge
      class={cn(badgeDeltaVariants({ delta: local.delta }), local.class)}
      {...rest}
    >
      <span class="flex gap-1">
        <Dynamic
          component={iconMap[local.delta ?? "unchanged"]}
          class="size-4"
        />
        {local.children}
      </span>
    </Badge>
  );
};
