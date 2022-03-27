import { Progress } from "../types/Progress";
import DayButton from "./DayButton";

interface IProgressDaysBarProps {
  progresses: Progress[];
}

const ProgressDaysBar = ({
  progresses,
}: IProgressDaysBarProps): JSX.Element => {
  console.log("progresses", progresses);
  progresses = progresses.filter(progress => progress.isSkipDay === false);
  return (
    <div className="flex items-center justify-center space-x-1 overflow-x-auto md:justify-start md:space-x-2 lg:space-x-4">
      {progresses.map((progress, index) => (
        <DayButton
          key={index}
          date={progress.date}
          forDay={progress.forDay}
          onClick={() => console.log(progress.forDay)}
        />
      ))}
    </div>
  );
};

export default ProgressDaysBar;
