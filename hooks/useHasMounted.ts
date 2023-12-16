import { useState, useEffect } from "react";

// This read was amazing.
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  return { hasMounted };
}