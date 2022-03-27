import { Progress } from "../types/Progress";

interface IProgressDaysBarProps {
  progresses: Progress[];
}

const ProgressDaysBar = ({
  progresses,
}: IProgressDaysBarProps): JSX.Element => {
console.log("progresses", progresses);
  return (
    <div className="flex items-center justify-center space-x-1 overflow-x-auto md:justify-start md:space-x-2 lg:space-x-4">
      {progresses.map((progress, index) => (
        <div key={index}>{progress.forDay}</div>
      ))}
    </div>
  );
};

export default ProgressDaysBar;
