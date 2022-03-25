import { useQuery } from "@apollo/client";
import classNames from "classnames";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { GET_CHALLENGES } from "../graphql/queries";
import useChallenge from "../hooks/useChallenge";
import { Challenge, ChallengesData } from "../types/Challenges";
import CreateChallenge from "./CreateChallenge";
import Tag from "./Tag";

interface IChallengesProps {
  variant?: "grid" | "list";
  className?: string;
  activeChallengeId?: string;
}

const Challenges = ({
  variant,
  className,
  activeChallengeId,
}: IChallengesProps): JSX.Element => {
  const router = useRouter();

  if (!variant) {
    variant = "list";
  }

  let { data, error, previousData, loading } =
    useQuery<ChallengesData>(GET_CHALLENGES);

  if (loading) {
    data = previousData;
  }

  if (error) {
    toast.error("Error loading challenges");
  }

  const handleChallengeClick = (challenge: Challenge) => {
    router.push(`/dashboard/${challenge.id}`);
  };

  return (
    <div
      className={classNames(
        "flex flex-col",
        variant === "list" ? "w-80 items-start" : "w-full",
        className
      )}
    >
      <CreateChallenge className={variant === "grid" ? "w-fit self-end" : ""} />
      <div
        className={classNames(
          variant === "list"
            ? "flex w-full flex-col items-start space-y-8"
            : "grid items-center justify-center gap-12",
          "mt-8"
        )}
        style={{
          gridTemplateColumns:
            variant === "grid" ? "repeat(auto-fit, minmax(300px, 1fr))" : "",
        }}
      >
        {!data ? (
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
            <button
              className={classNames(
                "flex h-32 w-full flex-col space-y-2 rounded-lg bg-secondary p-4 transition duration-200 hover:opacity-60",
                activeChallengeId === challenge.id && "border-4 border-blue-500"
              )}
              key={challenge.id}
              onClick={() => handleChallengeClick(challenge)}
            >
              <p className="text-lg font-semibold">
                <span className="mr-1 bg-gradient-to-br from-pink-400 to-blue-400 bg-clip-text text-transparent">
                  {challenge.days}
                </span>
                DaysOf<span>{challenge.topic}</span>
              </p>
              {challenge.isPublic ? <Tag>Public</Tag> : <Tag>Private</Tag>}
            </button>
          ))
        ) : (
          <p className="text-semibold text-center text-lg">No Challenges yet</p>
        )}
      </div>
    </div>
  );
};

export default Challenges;
