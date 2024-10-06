import { cn } from "@/lib/utils";
import * as AvatarPrimitive from "@kobalte/core/image";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";

export type AvatarRootProps<T extends ValidComponent = "span"> =
  AvatarPrimitive.ImageRootProps<T> & {
    class?: string;
  };

export const Avatar = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, AvatarRootProps<T>>,
) => {
  const [local, rest] = splitProps(props as AvatarRootProps, ["class"]);

  return (
    <AvatarPrimitive.Root
      class={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        local.class,
      )}
      {...rest}
    />
  );
};

export type AvatarImageProps<T extends ValidComponent = "img"> =
  AvatarPrimitive.ImageImgProps<T> & {
    class?: string;
  };

export const AvatarImage = <T extends ValidComponent = "img">(
  props: PolymorphicProps<T, AvatarImageProps<T>>,
) => {
  const [local, rest] = splitProps(props as AvatarImageProps, ["class"]);

  return (
    <AvatarPrimitive.Img
      class={cn("aspect-square size-full", local.class)}
      {...rest}
    />
  );
};

export type AvatarFallbackProps<T extends ValidComponent = "span"> =
  AvatarPrimitive.ImageFallbackProps<T> & {
    class?: string;
  };

export const AvatarFallback = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, AvatarFallbackProps<T>>,
) => {
  const [local, rest] = splitProps(props as AvatarFallbackProps, ["class"]);

  return (
    <AvatarPrimitive.Fallback
      class={cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        local.class,
      )}
      {...rest}
    />
  );
};
