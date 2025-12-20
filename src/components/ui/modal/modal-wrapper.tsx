import { ReactNode } from "react";

type ModalWrapperProps = {
  children: ReactNode;
  show: boolean;
  close: () => void;
  backgroundColor?: string;
};

const ModalWrapper = ({
  children,
  show,
  close,
  backgroundColor = "bg-[#3d486380]",
}: ModalWrapperProps) => {
  return (
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
};

export default ModalWrapper;
