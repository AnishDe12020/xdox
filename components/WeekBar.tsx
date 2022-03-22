import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import useDate from "../hooks/useDate";
import Button from "./Button";
import DayButton from "./DayButton";

const WeekBar = (): JSX.Element => {
  const { getCurrentWeek, date, setDate, formatDate, setDayTo } = useDate();

  return (
    <div className="flex flex-col justify-center space-y-4">
      <div className="flex items-center space-x-2">
        <Button
          className="bg-transparent px-1 py-1 text-accent"
          onClick={() => setDayTo(-7)}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <span>Week {formatDate(date, "WW")}</span>
        <Button className="bg-transparent px-1 py-1 text-accent">
          <ChevronRightIcon className="h-5 w-5" onClick={() => setDayTo(7)} />
        </Button>
      </div>
      <div className="flex space-x-4">
        {getCurrentWeek().map(dateOfWeek => (
          <DayButton
            date={dateOfWeek}
            active={date === dateOfWeek}
            key={dateOfWeek}
            onClick={setDate}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekBar;
