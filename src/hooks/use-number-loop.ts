import { useEffect, useState } from "react";

const useNumberLoop = (
  start: number,
  end: number,
  step: number,
  interval: number,
): [number, (value: number) => void] => {
  const [current, setCurrent] = useState(start);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (start < end) {
        if (current >= end) setCurrent(start);
        else setCurrent(current + step);
      } else {
        if (current <= end) setCurrent(start);
        else setCurrent(current - step);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [current, end, interval, start, step]);

  const changeCurrent = (value: number) => {
    if (value < start) setCurrent(end);
    else if (value > end) setCurrent(start);
    else setCurrent(value);
  };

  return [current, changeCurrent];
};

export default useNumberLoop;
