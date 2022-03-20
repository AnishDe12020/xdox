import { NextPage } from "next";
import { useState } from "react";
import Challenges from "../../components/Challenges";
import WeekBar from "../../components/WeekBar";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage: NextPage = () => {
  const [mdValue, setMdValue] = useState<string>();

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
