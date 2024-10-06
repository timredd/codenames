import { Separator } from "@/components/ui/separator";
import { type FlowProps, For, Show, createSignal, onMount } from "solid-js";
import { JoinAsButton } from "./components/join-button";

import { useGameContext } from "@/api/game";
import { Board } from "@/components/board";
import { getStorage } from "@/db";
import { makePersisted } from "@solid-primitives/storage";

export default function LandingPage(props: FlowProps) {
  const game = useGameContext();

  onMount(() => {
    game.createTeam();
    game.createTeam();
  });

  const [userNickname, setUserNickname] = makePersisted(
    createSignal<string>(""),
    {
      name: "user-nickname",
      storage: getStorage(),
    },
  );

  return (
    <main class="relative mx-auto flex h-full w-full max-w-screen-lg grow flex-col gap-8 px-6 py-8 md:gap-10 md:py-10 lg:gap-12 lg:px-8 lg:py-12">
      <Show when={userNickname()} fallback="Missing user nickname!">
        <div class="grid w-full grow grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <div class="flex flex-col gap-4 rounded-lg border border-primary p-4 shadow-md">
            <h1 class="font-bold text-4xl">Players</h1>
          </div>

          <div class="flex flex-col gap-4 rounded-lg border border-primary p-4 shadow-md">
            <div class="grid grow grid-rows-2 gap-y-4">
              <For each={game.teams}>
                {(team) => (
                  <div class="flex flex-col gap-4 rounded-lg border border-primary p-4 shadow-md">
                    <h2 class="font-bold text-2xl">{team.name}</h2>
                    <Separator class="bg-black" />
                    <div class="flex flex-col gap-4 rounded-lg border border-primary p-4">
                      <JoinAsButton team="red" position="spymaster" />
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>

          <Board />
        </div>
      </Show>
    </main>
  );
}
