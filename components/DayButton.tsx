import classNames from "classnames";
import React from "react";
import useDate from "../hooks/useDate";
import Button from "./Button";

interface IDayButtonProps {
  active?: boolean;
  date: string;
}

function DayButton({ active, date }: IDayButtonProps): JSX.Element {
  const { formatDate } = useDate();

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
        {formatDate(date, "EEE")}
      </span>
      <span
        className={classNames(
          "inline-flex h-12 w-12 cursor-pointer items-center justify-center self-center rounded-full text-center transition duration-200 group-hover:bg-secondary/40",
          active && "border-4 border-blue-500"
        )}
      >
        {formatDate(date, "d")}
      </span>
    </Button>
  );
}

export default DayButton;
