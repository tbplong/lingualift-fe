import clsx from "clsx";
import { useRef } from "react";

const Chosen = ({
  op,
  content,
  choose,
  chooseAns,
}: {
  op: number;
  content: string;
  choose: Record<number, boolean>;
  chooseAns: (chooseNo: number) => void;
}) => {
  const butRef = useRef<HTMLButtonElement | null>(null);
  const length = content.length;
  return (
    <button
      ref={butRef}
      onClick={() => chooseAns(op)}
      className={clsx(
        `p-4 btn h-full border-2 rounded-2xl text-tertiary-100 flex justify-start cursor-pointer`,
        choose[op]
          ? "border-secondary bg-secondary text-white"
          : "bg-white border-tertiary-100 hover:bg-secondary-100 hover:border-secondary-100 hover:text-tertiary hover:drop-shadow-2xl transition-all duration-100 ease-in",
      )}
    >
      <span
        className={clsx(
          "font-semibold text-justify",
          length >= 60 ? "text-sm" : length >= 30 ? "text-lg" : "text-2xl",
        )}
      >
        {`${content}`}
      </span>
    </button>
  );
};

export default Chosen;
