import { useColorMode } from "@kobalte/core/color-mode";
import Sonner from "solid-sonner";

export const toast = Sonner.toast;

export type ToasterProps = Sonner.ToastT;

export const Toaster = (props: ToasterProps) => {
  const context = useColorMode();

  return (
    <Sonner.Toaster
      theme={context.colorMode()}
      position="top-right"
      duration={5000}
      richColors={true}
      class="toaster group"
      toastOptions={{
        classes: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};
