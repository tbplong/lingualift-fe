import clsx from "clsx";
import noToChar from "./noToChar";

const AnsBox = ({
  ansNum,
  ansVal,
  loadQuiz,
  isCurrent,
  isReview,
}: {
  ansNum: number;
  ansVal: number;
  loadQuiz: (quizNo: number) => void;
  isCurrent: boolean;
  isReview: boolean;
}) => {
  return (
    <button
      onClick={() => loadQuiz(ansNum)}
      className={clsx(
        "w-full h-12 grid grid-rows-2 border-2 rounded-md overflow-hidden cursor-pointer",
        ansVal === -1
          ? "bg-white"
          : isReview
            ? "bg-quaternary-300"
            : "bg-primary-300",
        isReview ? "border-quaternary-300" : "border-primary-300",
      )}
    >
      <div className={clsx("border-none flex justify-center items-center")}>
        <span
          className={clsx(
            "text-xl mb-0.5",
            ansVal !== -1
              ? "text-white"
              : isReview
                ? "text-quaternary-300"
                : "text-primary",
          )}
        >
          {ansNum}
        </span>
      </div>
      <div
        className={clsx(
          "border-none flex justify-center items-center",
          isCurrent ? "bg-tertiary-100" : "bg-white",
        )}
      >
        <span className="text-tertiary-900 text-xl">{noToChar(ansVal)}</span>
      </div>
    </button>
  );
};

export default AnsBox;
