import { ReactNode, useMemo, useRef, useState } from "react";

import ArrowDown from "@/components/icons/arrow-down";
import ArrowUp from "@/components/icons/arrow-up";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn } from "@/utils/cn";

export type SingleSelectInputType<T> = {
  className?: string;
  options: T[];
  value: T;
  onSelect: (option: T) => void;
  renderValueItem?: (value: T) => ReactNode;
  renderOptionItem?: (option: T) => ReactNode;
};
export default function SingleSelectInput<T>({
  className,
  options,
  value,
  onSelect,
  renderValueItem = (value: T) =>
    typeof value === "string" ? <p className="truncate">{value}</p> : null,
  renderOptionItem = (option: T) =>
    typeof option === "string" ? <p className="truncate">{option}</p> : null,
}: SingleSelectInputType<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(inputRef, () => setIsOpen(false));
  const containerClass = useMemo(
    () =>
      cn(
        "relative flex h-fit w-full select-none items-center rounded-lg border border-tertiary px-2.5 py-2 text-black focus-within:border-primary hover:cursor-pointer",
        className,
      ),
    [className],
  );

  return (
    <div
      className={containerClass}
      onClick={() => {
        setIsOpen((isOpen) => !isOpen);
      }}
      ref={inputRef}
    >
      <div className="grow">{renderValueItem(value)}</div>
      {isOpen && options.length > 0 ? (
        <div className="absolute left-0 top-[115%] z-10 max-h-40 w-full overflow-hidden overflow-y-scroll rounded-lg border-t bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          {options.map((option, index) => (
            <div
              className="flex h-10 cursor-pointer items-center px-2.5 transition-all duration-75 hover:bg-slate-300"
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {renderOptionItem(option)}
            </div>
          ))}
        </div>
      ) : null}
      <div className="ml-2 flex h-full items-center">
        {isOpen ? (
          <ArrowDown className="size-auto" />
        ) : (
          <ArrowUp className="size-auto" />
        )}
      </div>
    </div>
  );
}
