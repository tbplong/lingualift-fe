import { useState, useEffect } from "react";

const getOrientation = () => {
  if (screen.orientation && screen.orientation.type) {
    if (
      screen.orientation.type === "landscape-primary" ||
      screen.orientation.type === "landscape-secondary"
    ) {
      return "landscape";
    }
    return "portrait";
  }
  if (window.orientation === 0 || window.orientation === 180) {
    return "portrait";
  }
  return "landscape";
};

export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    getOrientation(),
  );

  useEffect(() => {
    const handleOrientationChange = () => setOrientation(getOrientation());

    screen.orientation.addEventListener("change", handleOrientationChange);

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      screen.orientation.removeEventListener("change", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return orientation;
};
