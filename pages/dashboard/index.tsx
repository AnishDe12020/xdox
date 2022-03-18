import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { GET_CHALLENGES } from "../../graphql/queries";
import CreateChallenge from "../../components/CreateChallenge";
import DashboardLayout from "../../layouts/DashboardLayout";
import Tag from "../../components/Tag";
import type { ChallengeData } from "../../types/Challenges";

const DashboardPage: NextPage = () => {
  const { data, error, loading } = useQuery<ChallengeData>(GET_CHALLENGES);

  console.log(data);

  return (
    <DashboardLayout>
      <div className="flex w-1/4 flex-col items-start justify-end space-y-8">
        <CreateChallenge />
        {loading ? (
          <>
            <div className="flex h-32 w-48 flex-col space-y-2 rounded-lg bg-secondary p-4">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-500" />
              <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-500" />
            </div>
            <div className="flex h-32 w-48 flex-col space-y-2 rounded-lg bg-secondary p-4">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-500" />
              <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-500" />
            </div>
            <div className="flex h-32 w-48 flex-col space-y-2 rounded-lg bg-secondary p-4">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-500" />
              <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-500" />
            </div>
            <div className="flex h-32 w-48 flex-col space-y-2 rounded-lg bg-secondary p-4">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-500" />
              <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-500" />
            </div>
            <div className="flex h-32 w-48 flex-col space-y-2 rounded-lg bg-secondary p-4">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-500" />
              <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-500" />
            </div>
          </>
        ) : (
          data?.challenges?.map(challenge => (
            <div
              key={challenge.id}
              className="flex h-32 w-48 flex-col space-y-2 rounded-lg bg-secondary p-4"
            >
              <p className="text-lg font-semibold">
                <span className="mr-1 bg-gradient-to-br from-pink-400 to-blue-400 bg-clip-text text-transparent">
                  {challenge.days}
                </span>
                DaysOf<span>{challenge.topic}</span>
              </p>
              {challenge.isPublic ? <Tag>Public</Tag> : <Tag>Private</Tag>}
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
