import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_CHALLENGES } from "../graphql/queries";
import { ChallengeData } from "../types/Challenges";
import CreateChallenge from "./CreateChallenge";
import Tag from "./Tag";

const Challenges = (): JSX.Element => {
  const { data, error, loading } = useQuery<ChallengeData>(GET_CHALLENGES);

  if (error) {
    toast.error("Error loading challenges");
  }
  return (
    <div className="flex w-80 flex-col items-start justify-end space-y-8">
      <CreateChallenge />
      <div className="flex w-full flex-col items-start justify-end space-y-8">
        {loading ? (
          <>
            <div className="flex h-32 w-full flex-col space-y-2 rounded-lg bg-secondary p-4">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-500" />
              <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-500" />
            </div>
            <div className="flex h-32 w-full flex-col space-y-2 rounded-lg bg-secondary p-4">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-500" />
              <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-500" />
            </div>
            <div className="flex h-32 w-full flex-col space-y-2 rounded-lg bg-secondary p-4">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-500" />
              <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-500" />
            </div>
            <div className="flex h-32 w-full flex-col space-y-2 rounded-lg bg-secondary p-4">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-500" />
              <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-500" />
            </div>
            <div className="flex h-32 w-full flex-col space-y-2 rounded-lg bg-secondary p-4">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-500" />
              <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-500" />
            </div>
          </>
        ) : data && data.challenges.length > 0 ? (
          data.challenges.map(challenge => (
            <div
              key={challenge.id}
              className="flex h-32 w-full flex-col space-y-2 rounded-lg bg-secondary p-4"
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
        ) : (
          <p className="text-semibold text-center text-lg">No Challenges yet</p>
        )}
      </div>
    </div>
  );
};

export default Challenges;
