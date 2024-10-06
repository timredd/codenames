import { createGame } from "@/api/game";
import { Game } from "@/components/game";
import { cn } from "@/lib/utils";
import { type FlowProps, splitProps } from "solid-js";

export default function RootLayout(
  props: FlowProps<{
    class?: string;
  }>,
) {
  const [local, rest] = splitProps(props, ["children", "class"]);

  const game = createGame();

  return (
    <Game game={game}>
      <div class={cn("flex min-h-dvh flex-col", local.class)} {...rest}>
        <div class="relative mx-auto flex w-full max-w-screen-lg grow flex-col gap-8 px-6 py-8 md:gap-10 md:py-10 lg:gap-12 lg:px-8 lg:py-12">
          {local.children}
        </div>
      </div>
    </Game>
  );
}
