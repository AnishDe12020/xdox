import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { GET_CHALLENGES } from "../../graphql/queries";
import CreateChallenge from "../../components/CreateChallenge";

const DashboardPage: NextPage = () => {
  const { data } = useQuery(GET_CHALLENGES);

  return (
    <div className="flex flex-col">
      <div className="flex w-1/4 flex-col items-end justify-end bg-secondary">
        <CreateChallenge />
      </div>
    </div>
  );
};

export default DashboardPage;
