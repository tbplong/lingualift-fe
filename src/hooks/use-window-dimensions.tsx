import { debounce } from "lodash";
import { useState, useEffect } from "react";

const useWindowDimensions = (debounceDelay = 200) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }, debounceDelay);

    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      debouncedHandleResize.cancel(); // Cancel any pending debounced calls
    };
  }, [debounceDelay]);

  return dimensions;
};

export default useWindowDimensions;
