import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only after the client has hydrated. Unlike a `useEffect` + `setState`
 * flag, this doesn't trigger extra renders synchronously inside an effect —
 * `useSyncExternalStore` is React's own primitive for values that must differ
 * between the server-rendered markup and the client's first paint.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
