import { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalWrapperPortalProps = {
  children: ReactNode;
  show: boolean;
  close: () => void;
  backgroundColor?: string;
};

const ModalWrapperPortal = ({
  children,
  show,
  close,
  backgroundColor = "bg-[#3d486380]",
}: ModalWrapperPortalProps) => {
  const modalContent = (
    <div
      className={`${show ? "flex" : "hidden"} fixed left-0 top-0 z-[9999] h-screen w-screen items-center justify-center `}
    >
      <div
        onClick={close}
        className={`absolute left-0 top-0 size-full cursor-pointer ${backgroundColor}`}
      />
      {children}
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
};

export default ModalWrapperPortal;
