import clsx from "clsx";
import { useRef } from "react";

const Chosen = ({
  op,
  content,
  status,
  disabled = false,
  chooseAns,
}: {
  op: number;
  content: string;
  status: "default" | "selected" | "correct" | "wrong";
  disabled?: boolean; // prevent click after submitted
  chooseAns: (chooseNo: number) => void;
}) => {
  const butRef = useRef<HTMLButtonElement | null>(null);
  const length = content.length;

  const getStyleByStatus = () => {
    switch (status) {
      case "selected":
        return "border-secondary bg-secondary text-white"; // Màu cũ của bạn khi chọn
      case "correct":
        return "border-success bg-success text-white"; // Màu xanh lá (Đúng)
      case "wrong":
        return "border-quaternary bg-quaternary text-white"; // Màu đỏ (Sai)
      default:
        return clsx(
          "bg-white border-tertiary-100 text-tertiary-100",
          !disabled &&
            "hover:bg-secondary-100 hover:border-secondary-100 hover:text-tertiary hover:drop-shadow-2xl transition-all duration-100 ease-in",
        );
    }
  };
  return (
    <button
      ref={butRef}
      disabled={disabled}
      onClick={() => chooseAns(op)}
      className={clsx(
        `p-4 btn h-full border-2 rounded-2xl text-tertiary-100 flex justify-start`,
        disabled ? "cursor-default" : "cursor-pointer",
        getStyleByStatus(),
        // choose[op]
        //   ? "border-secondary bg-secondary text-white"
        //   : "bg-white border-tertiary-100 hover:bg-secondary-100 hover:border-secondary-100 hover:text-tertiary hover:drop-shadow-2xl transition-all duration-100 ease-in",
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
