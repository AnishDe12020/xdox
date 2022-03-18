import { NextPage } from "next";
import Challenges from "../../components/Challenges";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Challenges />
    </DashboardLayout>
  );
};

export default DashboardPage;
