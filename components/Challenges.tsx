import { useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { GET_CHALLENGES } from "../graphql/queries";
import { ChallengesData } from "../types/Challenges";
import ChallengeData from "./ChallengeData";

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
  const user = useUser();

  if (!variant) {
    variant = "list";
  }

  let { data, error, previousData, loading } = useQuery<ChallengesData>(
    GET_CHALLENGES,
    { variables: { userId: user.id } }
  );

  if (loading) {
    data = previousData;
  }

  if (error) {
    toast.error("Error loading challenges");
  }

  const handleChallengeClick = (challengeId: string) => {
    router.push(`/dashboard/${challengeId}/1`);
  };

  return (
    <ChallengeData
      className={className}
      variant={variant}
      activeChallengeId={activeChallengeId}
      handleChallengeClick={handleChallengeClick}
      challengeData={data}
    />
  );
};

export default Challenges;
