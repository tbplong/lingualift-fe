import "react-range-slider-input/dist/style.css";
import "./styles.css";

import { useRef, useState } from "react";
import RangeSlider from "react-range-slider-input";

import { Filter as FilterIcon, Star } from "@/components/icons";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

import { cn } from "@/utils/cn";
import { EXAM_MAX_DIFFICULTY } from "@/routes/exam";

export type Filter = {
  level: [number, number];
};

type FilterProps = {
  filter: Filter;
  onApplyFilter: (filter: Partial<Filter>) => void;
  className?: string;
};

const Filter = ({ filter, onApplyFilter, className }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  const activeFilterCount = Object.values(filter).filter((value) =>
    typeof value === "boolean"
      ? value
      : value[0] !== 1 || value[1] !== EXAM_MAX_DIFFICULTY,
  ).length;
  const isFilterActive = activeFilterCount > 0;

  const getLevelFilterMessage = () => {
    const [minLevel, maxLevel] = filter.level;
    if (minLevel === 1 && maxLevel === EXAM_MAX_DIFFICULTY) {
      return "All";
    }
    if (minLevel === maxLevel) {
      return minLevel;
    }
    return `${minLevel} - ${maxLevel}`;
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => {
          if (isOpen) {
            onApplyFilter(filter);
          }
          setIsOpen((prev) => !prev);
        }}
        className={cn(
          "relative flex h-11 min-w-28 select-none items-center justify-between text-nowrap rounded-lg border border-tertiary px-2.5 py-2 text-black hover:cursor-pointer",
          isFilterActive && "bg-primary text-white",
        )}
      >
        <span>Filter</span>
        <FilterIcon className={isFilterActive ? "fill-white" : ""} />
        {isFilterActive && (
          <div className="absolute right-0 top-0 flex size-6 -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full border border-primary bg-white text-xs text-primary">
            {activeFilterCount}
          </div>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full z-10 flex min-w-[80vw] translate-y-1 flex-col gap-5 rounded border border-tertiary-300 bg-white p-4 shadow lg:min-w-[400px]">
          <div className="flex flex-col gap-1">
            <div className="mb-3 flex items-center gap-2">
              <Star className="size-5 fill-secondary" />
              <span className="text-sm lg:text-base">
                Difficulty: {getLevelFilterMessage()}
              </span>
            </div>
            <div className="flex items-center gap-2 px-2">
              <span>1</span>
              <RangeSlider
                step={1}
                min={1}
                max={5}
                value={filter.level}
                onInput={(value) => {
                  onApplyFilter({
                    level: value,
                  });
                }}
                id="level-filter-slider"
              />
              <span>{EXAM_MAX_DIFFICULTY}</span>
            </div>
          </div>
          {isFilterActive && (
            <button
              className="self-end text-sm underline"
              onClick={() => {
                onApplyFilter({
                  level: [1, EXAM_MAX_DIFFICULTY],
                });
                setIsOpen(false);
              }}
            >
              Clear filter
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;
