import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { NextPage } from "next";
import Button from "../../components/Button";
import Challenges from "../../components/Challenges";
import DayButton from "../../components/DayButton";
import useDate from "../../hooks/useDate";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage: NextPage = () => {
  const { getCurrentWeek, date, setDate, formatDate, setDayTo } = useDate();

  console.log(getCurrentWeek());

  return (
    <DashboardLayout>
      <Challenges />
      <div className="flex w-full flex-col">
        <div className="ml-2 flex items-center space-x-2">
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
    </DashboardLayout>
  );
};

export default DashboardPage;
