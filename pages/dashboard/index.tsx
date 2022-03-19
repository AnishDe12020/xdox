import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { NextPage } from "next";
import Challenges from "../../components/Challenges";
import DayButton from "../../components/DayButton";
import useDate from "../../hooks/useDate";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage: NextPage = () => {
  const { getCurrentWeek, date, setDate, formatDate } = useDate();

  console.log(getCurrentWeek());

  return (
    <DashboardLayout>
      <Challenges />
      <div className="flex w-full flex-col">
        <div className="ml-2 flex items-center space-x-2">
          <ChevronLeftIcon className="h-5 w-5" />
          <span>Week {formatDate(date, "WW")}</span>
          <ChevronRightIcon className="h-5 w-5" />
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
    </DashboardLayout>
  );
};

export default DashboardPage;
