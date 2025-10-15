import clsx from "clsx";
import { useRef } from "react";
import noToChar from "./noToChar";

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

  return (
    <button
      ref={butRef}
      onClick={() => chooseAns(op)}
      className={clsx(
        "p-4 btn h-full border-2 rounded-2xl text-2xl text-tertiary-100 flex justify-start cursor-pointer",
        choose[op]
          ? "border-secondary-300 bg-secondary-300 text-white"
          : "bg-white border-tertiary-100 hover:bg-secondary-100 hover:border-secondary-100 hover:text-tertiary hover:drop-shadow-2xl hover:animate-[fadeIn_0.1s_ease-in]",
      )}
    >
      <span className="font-semibold">{`${noToChar(op)}. ${content}`}</span>
    </button>
  );
};

export default Chosen;
