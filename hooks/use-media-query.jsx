import { useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
  query,
  { defaultValue = false, initializeWithValue = true } = {}
) {
  const getMatches = (query) => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  // Handles the change event of the media query.
  function handleChange() {
    setMatches(getMatches(query));
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Add the event listener for media query changes
    matchMedia.addEventListener("change", handleChange);

    return () => {
      // Clean up the event listener
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
