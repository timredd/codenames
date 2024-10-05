import { cn } from "@/lib/utils";
import * as ImagePrimitive from "@kobalte/core/image";
import { splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";

export type ImageRootProps<T extends ValidComponent = "span"> =
  ImagePrimitive.ImageRootProps<T> & { class?: string };

export const ImageRoot = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, ImageRootProps>,
) => {
  const [local, rest] = splitProps(props as ImageRootProps, ["class"]);

  return (
    <ImagePrimitive.Root
      class={cn(
        "relative flex aspect-video shrink-0 overflow-hidden",
        local.class,
      )}
      {...rest}
    />
  );
};

export type ImageProps<T extends ValidComponent = "img"> =
  ImagePrimitive.ImageImgProps<T> & { class?: string };

export const Image = <T extends ValidComponent = "img">(
  props: PolymorphicProps<T, ImageProps<T>>,
) => {
  const [local, rest] = splitProps(props as ImageProps, ["class"]);

  return (
    <ImagePrimitive.Img
      class={cn("aspect-square h-full w-full", local.class)}
      {...rest}
    />
  );
};

export type ImageFallbackProps<T extends ValidComponent = "span"> =
  ImagePrimitive.ImageFallbackProps<T> & {
    class?: string;
  };

export const ImageFallback = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, ImageFallbackProps<T>>,
) => {
  const [local, rest] = splitProps(props as ImageFallbackProps, ["class"]);

  return (
    <ImagePrimitive.Fallback
      class={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        local.class,
      )}
      {...rest}
    />
  );
};
