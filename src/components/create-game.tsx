import {
  type StatesBase,
  createMachine,
} from "@solid-primitives/state-machine";
import { createStore } from "@xstate/store";

interface CreateGameOptions {
  numPlayers: number;
  numWords: number;
}

type State = {
  settings: {
    numPlayers: number;
    numWords: number;
  };
};

interface GameStates extends StatesBase<"lobby"> {}

type Actions = {};

export const createGame = (options: CreateGameOptions) => {
  const [store, setStore] = createMachine({
    initial: "lobby",
    states: {
      lobby(input, to) {},
    },
  });
};
