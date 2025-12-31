import { ReactNode } from "react";

import { cn } from "@/utils/cn";

type StatusTagProps = {
  className?: string;
  text: string;
  icon: ReactNode;
};

const StatusTag = ({ className, text, icon }: StatusTagProps) => {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 flex flex-row items-center gap-1 rounded-br-lg rounded-tl-lg bg-red px-3 py-1",
        className,
      )}
    >
      {icon}
      <span className="text-[12px] font-bold text-white">{text}</span>
    </div>
  );
};

export default StatusTag;
