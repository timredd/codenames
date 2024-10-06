import { GameContext, type createGame } from "@/api/game";
import type { ParentProps } from "solid-js";

export type GameProps = ParentProps<{
  game: ReturnType<typeof createGame>;
}>;

export const Game = (props: GameProps) => {
  return (
    <GameContext.Provider value={props.game}>
      {props.children}
    </GameContext.Provider>
  );
};
