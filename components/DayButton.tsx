import classNames from "classnames";
import React from "react";
import useDate from "../hooks/useDate";
import Button from "./Button";

interface IDayButtonProps {
  active?: boolean;
  date: string;
  forDay: number;
  onClick: (date: string) => void;
}

function DayButton({
  active,
  date,
  onClick,
  forDay,
}: IDayButtonProps): JSX.Element {
  const { formatDate } = useDate();

  return (
    <Button
      className={classNames(
        "md:text-md group inline-flex flex-col items-center justify-center bg-transparent px-1 text-sm text-accent hover:opacity-100 md:px-2 lg:px-3"
      )}
      onClick={() => {
        onClick(date);
      }}
    >
      <span
        className={classNames(
          "opacity-60",
          active && "text-blue-500 !opacity-100"
        )}
      >
        {formatDate(date, "dd")} {formatDate(date, "LLL")}
      </span>
      <span
        className={classNames(
          "mt-1 inline-flex h-8 w-8 cursor-pointer items-center justify-center self-center rounded-full text-center transition duration-200 md:h-10 md:w-10 md:group-hover:bg-secondary/40",
          active && "bg-blue-700"
        )}
      >
        {forDay}
      </span>
    </Button>
  );
}

export default DayButton;
