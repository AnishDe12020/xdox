import { NextPage } from "next";
import Button from "../../components/Button";

const DashboardPage: NextPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-1/4 flex-col items-end justify-end bg-secondary">
        <Button className="w-fit">Hello</Button>
      </div>
    </div>
  );
};

export default DashboardPage;
