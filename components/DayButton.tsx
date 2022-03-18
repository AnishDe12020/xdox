import classNames from "classnames";
import React, { ReactNode } from "react";
import Button from "./Button";

interface IDayButtonProps {
  children: ReactNode;
  weekDay: string;
  active?: boolean;
}

function DayButton({
  children,
  weekDay,
  active,
}: IDayButtonProps): JSX.Element {
  return (
    <Button
      className={classNames(
        "group inline-flex flex-col bg-transparent text-accent hover:opacity-100"
      )}
    >
      <span
        className={classNames(
          "opacity-60",
          active && "text-blue-500 !opacity-100"
        )}
      >
        {weekDay}
      </span>
      <span
        className={classNames(
          "inline-flex h-12 w-12 cursor-pointer items-center justify-center self-center rounded-full text-center transition duration-200 group-hover:bg-secondary/40",
          active && "border-4 border-blue-500"
        )}
      >
        {children}
      </span>
    </Button>
  );
}

export default DayButton;
