import type {
  Cast,
  EventObject,
  EventPayloadMap,
  ExtractEventsFromPayloadMap,
  Observer,
  Recipe,
  Store,
  StoreAssigner,
  StoreCompleteAssigner,
  StoreContext,
  StoreInspectionEvent,
  StorePartialAssigner,
  StorePropertyAssigner,
  StoreSnapshot,
} from "@xstate/store";
import {
  createEffect,
  createRoot,
  createSignal,
  createUniqueId,
  on,
  untrack,
  useTransition,
} from "solid-js";
import { createStore as createSolidStore, produce } from "solid-js/store";

const inspectionObservers = new WeakMap<
  // biome-ignore lint/suspicious/noExplicitAny: Required
  Store<any, any, any>,
  Set<Observer<StoreInspectionEvent>>
>();

// export function createStoreCore<
//   TContext extends StoreContext,
//   TEventPayloadMap extends EventPayloadMap,
//   TEmitted extends EventObject,
// >(
//   initialContext: TContext,
//   transitions: {
//     [K in keyof TEventPayloadMap & string]: (
//       state: TContext,
//       event: { type: K } & TEventPayloadMap[K],
//       emit: (event: TEmitted) => void,
//     ) => Partial<TContext> | undefined;
//   },
// ): Store<TContext, ExtractEventsFromPayloadMap<TEventPayloadMap>, TEmitted> {

function createStoreCore<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
  TEmitted extends EventObject,
>(
  initialContext: TContext,
  transitions: {
    [K in keyof TEventPayloadMap & string]:
      | StoreAssigner<
          NoInfer<TContext>,
          { type: K } & TEventPayloadMap[K],
          TEmitted
        >
      | StorePropertyAssigner<
          NoInfer<TContext>,
          { type: K } & TEventPayloadMap[K],
          TEmitted
        >;
  },
  updater?: (
    context: NoInfer<TContext>,
    recipe: (context: NoInfer<TContext>) => NoInfer<TContext>,
  ) => NoInfer<TContext>,
): Store<TContext, ExtractEventsFromPayloadMap<TEventPayloadMap>, TEmitted> {
  type StoreEvent = ExtractEventsFromPayloadMap<TEventPayloadMap>;

  const [state, setState] = createSolidStore(initialContext);
  const [emitted, setEmitted] = createSignal<TEmitted[]>([]);
  const [isPending, startTransition] = useTransition();

  const transition = createStoreTransition(transitions, updater);

  const initialSnapshot: StoreSnapshot<TContext> = {
    context: initialContext,
    status: "active",
    output: undefined,
    error: undefined,
  };
  const currentSnapshot: StoreSnapshot<TContext> = initialSnapshot;

  function receive(event: StoreEvent) {}

  const store: Store<TContext, StoreEvent, TEmitted> = {
    sessionId: createUniqueId(),

    send(event) {
      // const transition = transitions[event.type];
      // if (!transition) {
      //   return;
      // }
      //
      startTransition(() => {
        setState(
          produce((s) => {
            const emit = (e: TEmitted) => setEmitted((prev) => [...prev, e]);

            if (typeof transition === "function") {
              const result = transition(s, event, { emit });
              if (result) {
                Object.assign(s, result);
              }
            } else {
              const results: Array<Partial<NoInfer<TContext>>> = [];
              for (const key in transition) {
                const value = transition[key];
                if (typeof value === "function") {
                  const result = value(s, event, { emit });
                } else {
                }
              }
              if (results) {
                Object.assign(s, results);
              }
            }
          }),
        );
      });
    },

    on: (emittedEventType, handler) => {
      const dispose = createRoot((disposer) => {
        createEffect(
          on(
            emitted,
            (events) => {
              for (const event of events) {
                if (event.type === emittedEventType) {
                  untrack(() => handler(event));
                }
              }
            },
            { defer: true },
          ),
        );
        return disposer;
      });

      return {
        unsubscribe() {
          dispose();
        },
      };
    },

    inspect(observer) {
      return {
        unsubscribe() {
          () => undefined;
        },
      };
    },

    subscribe(observer) {
      return {
        unsubscribe() {
          () => undefined;
        },
      };
    },

    getInitialSnapshot() {
      return initialSnapshot;
    },
    getSnapshot() {
      return currentSnapshot;
    },
  };
  return store;
}

export type TransitionsFromEventPayloadMap<
  TEventPayloadMap extends EventPayloadMap,
  TContext extends StoreContext,
  TEmitted extends EventObject,
> = {
  [K in keyof TEventPayloadMap & string]:
    | StoreAssigner<
        TContext,
        {
          type: K;
        } & TEventPayloadMap[K],
        TEmitted
      >
    | StorePropertyAssigner<
        TContext,
        {
          type: K;
        } & TEventPayloadMap[K],
        TEmitted
      >;
};

/**
 * Creates a **store** that has its own internal state and can be sent events
 * that update its internal state based on transitions.
 *
 * @example
 *
 * ```ts
 * const store = createStore({
 *   types: {
 *     // ...
 *   },
 *   context: { count: 0 },
 *   on: {
 *     inc: (context, event: { by: number }) => {
 *       return {
 *         count: context.count + event.by
 *       };
 *     }
 *   }
 * });
 *
 * store.subscribe((snapshot) => {
 *   console.log(snapshot);
 * });
 *
 * store.send({ type: 'inc', by: 5 });
 * // Logs { context: { count: 5 }, status: 'active', ... }
 * ```
 */
export function createStore<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
  TTypes extends { emitted?: EventObject },
>({
  context,
  on,
  types,
}: {
  context: TContext;
  on: {
    [K in keyof TEventPayloadMap & string]:
      | StoreAssigner<
          NoInfer<TContext>,
          { type: K } & TEventPayloadMap[K],
          Cast<TTypes["emitted"], EventObject>
        >
      | StorePropertyAssigner<
          NoInfer<TContext>,
          { type: K } & TEventPayloadMap[K],
          Cast<TTypes["emitted"], EventObject>
        >;
  };
} & { types?: TTypes }): Store<
  TContext,
  ExtractEventsFromPayloadMap<TEventPayloadMap>,
  Cast<TTypes["emitted"], EventObject>
>;

/**
 * Creates a **store** that has its own internal state and can be sent events
 * that update its internal state based on transitions.
 *
 * @example
 *
 * ```ts
 * const store = createStore(
 *   // Initial context
 *   { count: 0 },
 *   // Transitions
 *   {
 *     inc: (context, event: { by: number }) => {
 *       return {
 *         count: context.count + event.by
 *       };
 *     }
 *   }
 * );
 *
 * store.subscribe((snapshot) => {
 *   console.log(snapshot);
 * });
 *
 * store.send({ type: 'inc', by: 5 });
 * // Logs { context: { count: 5 }, status: 'active', ... }
 * ```
 */
export function createStore<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
>(
  initialContext: TContext,
  transitions: TransitionsFromEventPayloadMap<
    TEventPayloadMap,
    TContext,
    EventObject
  >,
): Store<TContext, ExtractEventsFromPayloadMap<TEventPayloadMap>, EventObject>;

// biome-ignore lint/suspicious/noExplicitAny: Required
export function createStore(initialContextOrObject: any, transitions?: any) {
  if (transitions === undefined) {
    return createStoreCore(
      initialContextOrObject.context,
      initialContextOrObject.on,
    );
  }
  return createStoreCore(initialContextOrObject, transitions);
}

/**
 * Creates a store function, which is a function that accepts the current
 * snapshot and an event and returns a new snapshot.
 *
 * @param transitions
 * @param updater
 * @returns
 */
export function createStoreTransition<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
  TEmitted extends EventObject,
>(
  transitions: {
    [K in keyof TEventPayloadMap & string]:
      | StoreAssigner<TContext, { type: K } & TEventPayloadMap[K], TEmitted>
      | StorePropertyAssigner<
          TContext,
          { type: K } & TEventPayloadMap[K],
          TEmitted
        >;
  },
  updater?: (
    context: TContext,
    recipe: (context: TContext) => TContext,
  ) => TContext,
) {
  return (
    snapshot: StoreSnapshot<TContext>,
    event: ExtractEventsFromPayloadMap<TEventPayloadMap>,
  ): [StoreSnapshot<TContext>, TEmitted[]] => {
    type StoreEvent = ExtractEventsFromPayloadMap<TEventPayloadMap>;
    let currentContext = snapshot.context;
    const assigner = transitions?.[event.type as StoreEvent["type"]];
    const emitted: TEmitted[] = [];

    const enqueue = {
      emit: (ev: TEmitted) => {
        emitted.push(ev);
      },
    };

    if (!assigner) {
      return [snapshot, emitted];
    }

    if (typeof assigner === "function") {
      currentContext = updater
        ? updater(currentContext, (draftContext) =>
            (
              assigner as StoreCompleteAssigner<TContext, StoreEvent, TEmitted>
            )?.(draftContext, event, enqueue),
          )
        : setter(currentContext, (draftContext) =>
            Object.assign(
              {},
              currentContext,
              assigner?.(
                draftContext,
                event as any, // TODO: help me
                enqueue,
              ),
            ),
          );
    } else {
      const partialUpdate: Record<string, unknown> = {};
      for (const key of Object.keys(assigner)) {
        const propAssignment = assigner[key];
        partialUpdate[key] =
          typeof propAssignment === "function"
            ? (
                propAssignment as StorePartialAssigner<
                  TContext,
                  StoreEvent,
                  typeof key,
                  TEmitted
                >
              )(currentContext, event, enqueue)
            : propAssignment;
      }
      currentContext = Object.assign({}, currentContext, partialUpdate);
    }

    return [{ ...snapshot, context: currentContext }, emitted];
  };
}

function setter<TContext extends StoreContext>(
  context: TContext,
  recipe: Recipe<TContext, TContext>,
): TContext {
  return recipe(context);
}
