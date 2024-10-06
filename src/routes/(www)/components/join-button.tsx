import { type PlayerKind, type TeamKind, useGameContext } from "@/api/game";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Show, splitProps } from "solid-js";

interface JoinAsButtonProps extends ButtonProps {
  team: TeamKind;
  position: PlayerKind;
}

export const JoinAsButton = (props: JoinAsButtonProps) => {
  const [local, rest] = splitProps(props, ["class", "team", "position"]);

  const game = useGameContext();

  return (
    <>
      <div class="h-10 gap-4 rounded-lg border border-muted-foreground" />
      <Button
        variant="default"
        class={cn("w-fit place-self-end", local.class)}
        {...rest}
      >
        <Show when={local.position === "spymaster"} fallback="Join as guesser">
          Join as spymaster
        </Show>
      </Button>
    </>
  );
};
