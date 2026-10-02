"use client";

import { useSyncExternalStore } from "react";

const MEDIA_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(MEDIA_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(MEDIA_QUERY).matches;
}

// `serverSnapshot` has to match whatever the markup assumes before hydration.
// Components that render a resting state (no transform) pass `true`; components
// that render mid-animation markup pass `false`.
export function useReducedMotion(serverSnapshot = true) {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}
