import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false); // Start with 'false' instead of 'undefined'

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = (event) => {
      setIsMobile(event.matches); // event.matches gives you a boolean
    };

    // Set the initial state based on the current width
    setIsMobile(mql.matches);

    // Add the event listener to update the state when the window size changes
    mql.addEventListener("change", onChange);

    return () => {
      mql.removeEventListener("change", onChange); // Cleanup on unmount
    };
  }, []);

  return isMobile; // Return the boolean value directly
}
