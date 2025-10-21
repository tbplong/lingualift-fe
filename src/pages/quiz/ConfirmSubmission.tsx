import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";

const ConfirmSubmission = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate({ from: "/quiz" });
  const confirmSubmit = () => {
    navigate({ to: "/" });
  };
  return (
    <div
      onClick={onClose}
      className={clsx(
        `fixed z-10 inset-0 flex justify-center items-center transition-colors
    `,
        open ? "visible bg-black/40" : "invisible",
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          `bg-white rounded-xl flex flex-col items-center justify-between shadow px-4 pt-4 pb-4 transition-all h-42 w-fit`,
          open ? "scale-100 opacity-100" : "scale-125 opacity-0",
        )}
      >
        <span className="text-4xl font-bold text-primary">
          Do you want to <span className="text-secondary">Submit?</span>
        </span>
        <div className="flex flex-row justify-between w-full gap-4 h-20 text-4xl font-bold">
          <button
            onClick={onClose}
            className="flex-1 border-3 rounded-lg border-quaternary text-quaternary hover:bg-quaternary hover:text-white cursor-pointer transition-colors duration-100 ease-in"
          >
            No
          </button>
          <button
            onClick={confirmSubmit}
            className="flex-1 border-3 rounded-lg border-success text-success hover:bg-success hover:text-white cursor-pointer transition-colors duration-100 ease-in"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSubmission;
