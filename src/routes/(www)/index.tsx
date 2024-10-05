import { Link } from "@/components/ui/link";
import { type FlowProps, createEffect, createSignal } from "solid-js";

export default function LandingPage(props: FlowProps) {
  const [value, setValue] = createSignal("");

  createEffect(() => {
    console.log(value());
  });

  return (
    <main class="relative mx-auto flex w-full max-w-screen-lg grow flex-col gap-8 px-6 py-8 md:gap-10 md:py-10 lg:gap-12 lg:px-8 lg:py-12">
      <div
        id="hero"
        class="flex w-full max-w-screen-md flex-col items-start gap-4 pt-12 text-left md:gap-8"
      >
        <h1 class="scroll-m-20 font-extrabold font-mono text-[128px] tracking-tight">
          BANNED
        </h1>
        <h2 class="scroll-m-20 pb-2 font-medium text-2xl tracking-tight first:mt-0">
          Respirators and masks are being banned throughout the world. See which
          countries are banning masks.
        </h2>
        <Link href="/locations" variant="default">
          View list of bans
        </Link>
      </div>
      {props.children}
    </main>
  );
}
