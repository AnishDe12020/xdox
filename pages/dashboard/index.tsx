import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { GET_CHALLENGES } from "../../graphql/queries";
import CreateChallenge from "../../components/CreateChallenge";

const DashboardPage: NextPage = () => {
  const { data, error } = useQuery(GET_CHALLENGES);

  console.log(data);

  return (
    <div className="flex flex-col">
      <div className="flex w-1/4 flex-col items-start justify-end space-y-8">
        <CreateChallenge />
        {data?.challenges?.map(challenge => (
          <div
            key={challenge.id}
            className="flex flex-col rounded-lg bg-secondary p-4"
          >
            {challenge.days}DaysOf{challenge.topic}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
