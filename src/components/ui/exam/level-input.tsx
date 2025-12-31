import { useState } from "react";

import { Star } from "@/components/icons";
import { cn } from "@/utils/cn";

type LevelInputProps = {
  level: number;
  maxLevel: number;
  onChange: (level: number) => void;
};

export const LevelInput = ({ level, maxLevel, onChange }: LevelInputProps) => {
  const [hoveringIndex, setHoveringIndex] = useState<number>();

  return (
    <div className="flex items-center">
      {Array(maxLevel)
        .fill(true)
        .map((_, index) => (
          <div
            key={index}
            onClick={() => {
              onChange(index + 1);
            }}
            onMouseEnter={() => {
              setHoveringIndex(index);
            }}
            onMouseLeave={() => {
              setHoveringIndex(undefined);
            }}
            className="cursor-pointer p-0.5"
          >
            <Star
              className={cn(
                "size-4 sm:size-6",
                hoveringIndex !== undefined && level !== hoveringIndex + 1
                  ? index <= hoveringIndex
                    ? "fill-secondary-300"
                    : "fill-tertiary-300"
                  : index + 1 <= level
                    ? "fill-secondary"
                    : "fill-tertiary-300",
              )}
            />
          </div>
        ))}
    </div>
  );
};
