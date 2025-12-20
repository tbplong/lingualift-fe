import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useImperativeHandle, useState } from "react";
import { useEventListener } from "usehooks-ts";

type ModalProps = {
  children: ReactNode;
  dismissOnClickOutside?: boolean;
  dismissOnEsc?: boolean;
  onDismiss?: () => void;
};

export type ModalHandler = {
  open: (callback?: () => void) => void;
  close: (callback?: () => void) => void;
  isOpen: boolean;
};

export const Modal = ({
  ref,
  children,
  dismissOnClickOutside = true,
  dismissOnEsc = true,
  onDismiss,
}: ModalProps & {
  ref: React.RefObject<ModalHandler | null>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: (callback) => {
      if (callback) callback();

      setIsOpen(true);
    },
    close: (callback) => {
      if (callback) callback();
      setIsOpen(false);
    },
    isOpen,
  }));

  useEventListener("keydown", (event) => {
    if (dismissOnEsc && event.key === "Escape") {
      setIsOpen(false);
      if (onDismiss) onDismiss();
    }
  });

  return (
    <AnimatePresence
      // Disable any initial animations on children that
      // are present when the component is first rendered
      initial={true}
    >
      {isOpen ? (
        <motion.div
          onClick={() => {
            if (dismissOnClickOutside) setIsOpen(false);
            if (onDismiss) onDismiss();
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="inline"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
