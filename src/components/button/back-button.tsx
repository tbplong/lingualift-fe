import { useNavigate, useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

import { BackButton as BackButtonIcon } from "@/components/icons";
import clsx from "clsx";

type BackButtonProps = {
  onClick?: () => void;
  className?: string;
  text?: string;
  toRoutePath?: string;
  textClass?: string;
  icon?: React.ReactNode;
};

const BackButton = ({
  onClick,
  className,
  text = "Back",
  toRoutePath,
  textClass,
  icon,
}: BackButtonProps) => {
  const { history } = useRouter();
  const navigate = useNavigate();

  const handleBackClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else if (toRoutePath) {
      navigate({ to: toRoutePath });
    } else {
      history.go(-1);
    }
  }, [history, onClick, toRoutePath, navigate]);

  return (
    <button
      className={`flex flex-row items-center gap-x-2 ${className}`}
      onClick={handleBackClick}
    >
      {/* <button onClick={handleBackClick} className="size-6"> */}
      {icon ? icon : <BackButtonIcon className={clsx(textClass)} />}
      {/* </button> */}

      <span
        className={clsx(
          "text-xs font-medium text-tertiary xl:text-base",
          textClass,
        )}
      >
        {text}
      </span>
    </button>
  );
};

export default BackButton;
