import {
  type Cast,
  type EnqueueObject,
  type EventObject,
  type EventPayloadMap,
  type ExtractEventsFromPayloadMap,
  type Store,
  type StoreAssigner,
  type StoreContext,
  type StorePropertyAssigner,
  createStore,
  createStoreWithProducer,
} from "@xstate/store";
import { type Accessor, from } from "solid-js";

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

export declare function createMachine<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
  TTypes extends {
    emitted?: EventObject;
  },
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
          {
            type: K;
          } & TEventPayloadMap[K],
          Cast<TTypes["emitted"], EventObject>
        >
      | StorePropertyAssigner<
          NoInfer<TContext>,
          {
            type: K;
          } & TEventPayloadMap[K],
          Cast<TTypes["emitted"], EventObject>
        >;
  };
} & {
  types?: TTypes;
}): Store<
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
export function createMachine<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
>(
  initialContext: TContext,
  transitions: TransitionsFromEventPayloadMap<
    TEventPayloadMap,
    TContext,
    EventObject
  >,
): Accessor<
  Store<TContext, ExtractEventsFromPayloadMap<TEventPayloadMap>, EventObject>
> {
  return from(
    createStore<TContext, TEventPayloadMap>(initialContext, transitions),
  );
}

export function createMachineWithProducer<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
  TEmitted extends EventObject = EventObject,
>(
  producer: NoInfer<
    (context: TContext, recipe: (context: TContext) => void) => TContext
  >,
  config: {
    context: TContext;
    on: {
      [K in keyof TEventPayloadMap & string]: (
        context: NoInfer<TContext>,
        event: {
          type: K;
        } & TEventPayloadMap[K],
        enqueue: EnqueueObject<TEmitted>,
      ) => void;
    };
  },
) {
  return from(createStoreWithProducer(producer, config));
}
