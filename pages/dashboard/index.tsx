import { NextPage } from "next";
import Challenges from "../../components/Challenges";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Challenges variant="grid" />
    </DashboardLayout>
  );
};

export default DashboardPage;
