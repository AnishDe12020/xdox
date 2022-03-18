import { NextPage } from "next";
import Challenges from "../../components/Challenges";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Challenges />
      <div className="flex w-full flex-col">
        <div className="flex space-x-4">
          <div className="inline-flex flex-col">
            <span className="opacity-60">Monday</span>
            <span className="inline-flex h-12 w-12 cursor-pointer items-center justify-center self-center rounded-full text-center hover:bg-blue-500">
              29
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
