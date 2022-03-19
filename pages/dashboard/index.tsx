import { NextPage } from "next";
import Challenges from "../../components/Challenges";
import DayButton from "../../components/DayButton";
import useDate from "../../hooks/useDate";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage: NextPage = () => {
  const { getCurrentWeek, date, setDate } = useDate();

  console.log(getCurrentWeek());

  return (
    <DashboardLayout>
      <Challenges />
      <div className="flex w-full flex-col">
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
