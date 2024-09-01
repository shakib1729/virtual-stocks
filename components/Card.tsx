// Libs
import type { ReactNode } from "react";

export const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-full h-full rounded-md relative p-8 border-2 bg-white border-neutral-200 ${className}`}
    >
      {children}
    </div>
  );
};
