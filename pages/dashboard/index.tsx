import { NextPage } from "next";
import Challenges from "../../components/Challenges";
import WeekBar from "../../components/WeekBar";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Challenges />
      <div className="flex w-full flex-col">
        <WeekBar />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
