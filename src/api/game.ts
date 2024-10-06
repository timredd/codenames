import { WORDS } from "@/assets/words.txt";
import { getStorage } from "@/db";
import { makePersisted } from "@solid-primitives/storage";
import { createContext, createRoot, useContext } from "solid-js";
import { createStore } from "solid-js/store";

type TeamId = number;

export type TeamKind = "red" | "blue";
export type PlayerKind = "spymaster" | "guesser";
export type WordKind = TeamKind | "none" | "bomb";

type Word = {
  owner: TeamId;
  word: string;
  isGuessed: boolean;
};

/** GAME */
interface GameSettings {
  numWords: number;
  timeLimitInMs: number;
}

export interface GameState {
  id: number;
  teams: TeamState[];
  settings: GameSettings;
  state: {
    round: number;
    turn: number;
    timeLeft: number;
  };
}

interface GameContext {
  words: string[];
  redTeam: string[];
  blueTeam: string[];
  neutralWords: string[];
  assassinWord: string;
  currentTurn: TeamId;
  redScore: number;
  blueScore: number;
  winner: TeamId | null;
  spymasterView: boolean;
}

// Define the possible events
type GameEvent =
  | { type: "START_GAME" }
  | { type: "GIVE_CLUE"; clue: string; numWords: number }
  | { type: "GUESS_WORD"; word: string }
  | { type: "END_TURN" }
  | { type: "REVEAL_ALL_WORDS" }
  | { type: "SET_CUSTOM_WORDS"; words: string[] }
  | { type: "TOGGLE_SPYMASTER_VIEW" };

// Define emitted events (if any)
type GameEmittedEvent =
  | { type: "GAME_OVER"; winner: TeamId }
  | { type: "TURN_CHANGED"; team: TeamId };

// Define the store type for Codenames
type CodenamesStore = Store<GameContext, GameEvent, GameEmittedEvent>;

// Helper types
type WordColor = "red" | "blue" | "neutral" | "assassin" | "unknown";

export interface TeamState {
  id: TeamId;
  name: string;
  players: {
    position: "spymaster" | "operative";
    state: PlayerState;
  }[];
  words: Word[];
}

export interface PlayerState {
  id: number;
  name: string;
  setName: (name: string) => void;
}

/** PLAYER */

function createNumericId() {
  return Math.floor(Math.random() * 1000);
}

export function createPlayer(initialState: Omit<PlayerState, "id">) {
  return createRoot(() => {
    const [state, setState] = createStore({
      id: createNumericId(),
      ...initialState,
    });

    const setName = (name: string) => setState("name", name);

    return {
      get id() {
        return state.id;
      },
      get name() {
        return state.name;
      },
      setName,
    };
  });
}

/** TEAM */

function createTeam(initialState?: Omit<TeamState, "id">) {
  return createRoot(() => {
    const id = createNumericId();
    const [state, setState] = createStore<TeamState>({
      id,
      name: initialState?.name ?? `Team ${id}`,
      players: [],
      words: [],
    });

    const setName = (name: string) => setState("name", name);

    const addPlayer = (
      player: PlayerState,
      position: "spymaster" | "guesser" = "guesser",
    ) => {
      setState("players", state.players.length, {
        state: player,
        position,
      });
    };

    return {
      get players() {
        return state.players;
      },
      setName,
      addPlayer,
    };
  });
}

/** GAME */

export const createGame = (initialState?: Omit<GameState, "id">) => {
  return createRoot(() => {
    const [state, setState, init] = makePersisted(
      createStore<GameState>({
        id: createNumericId(),
        teams: [],
        settings: {
          numWords: 25,
          timeLimitInMs: 1000 * 60 * 5, // 5 minutes
        },
      }),
      {
        name: "game-state",
        storage: getStorage(),
      },
    );

    const createTeam = (options?: Omit<TeamState, "id">) => {
      setState("teams", state.teams.length, {
        id: createNumericId(),
        ...options,
      });
    };

    const generateWordList = () => {
      // select random words from WORDS
      const words = new Set<string>();
      for (let i = 0; i < state.settings.numWords; i++) {
        const word = WORDS[Math.floor(Math.random() * WORDS.length)];
        if (!words.has(word)) {
          words.add(word);
        }
      }
      return Array.from(words);
    };

    return {
      get teams() {
        return state.teams;
      },
      get settings() {
        return state.settings;
      },

      createTeam,
    };
  });
};

type GameContextValue = ReturnType<typeof createGame>;

export const GameContext = createContext<GameContextValue>();

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }

  return context;
};
