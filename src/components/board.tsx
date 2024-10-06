import { Index } from "solid-js";

export const Board = () => {
  return (
    <div class="grid grid-cols-5 grid-rows-5">
      <Index each={[1, 2, 3, 4, 5]}>
        {(i) => (
          <Index each={[1, 2, 3, 4, 5]}>
            {(j) => (
              <div class="flex size-full items-center justify-center rounded-md border border-background bg-gray-200">
                <span>{`${i()}-${j()}`}</span>
              </div>
            )}
          </Index>
        )}
      </Index>
    </div>
  );
};
