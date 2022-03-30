import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Challenges from "../../components/Challenges";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage: NextPage = () => {
  return (
    <DashboardLayout>
      <NextSeo title="XdoX | Dashboard" />
      <Challenges variant="grid" />
    </DashboardLayout>
  );
};

export default DashboardPage;
