import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_CHALLENGE } from "../graphql/queries";
import { ChallengeData } from "../types/Challenges";
import Tag from "./Tag";

interface IChallengeHeaderProps {
  id: string;
}

const ChallengeHeader = ({ id }: IChallengeHeaderProps): JSX.Element => {
  let { data, loading, error, previousData } = useQuery<ChallengeData>(
    GET_CHALLENGE,
    { variables: { id: id } }
  );

  if (loading) {
    data = previousData;
  }

  if (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }

  return !data ? (
    <div className="mx-4 mb-16 flex space-x-2 items-center justify-center">
      <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-500" />
      <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-500" />
    </div>
  ) : (
    <div className="mx-4 mb-16 flex items-center justify-center space-x-2">
      <p className="items-center text-xl font-semibold md:text-2xl lg:text-3xl">
        <span className="mr-1 bg-gradient-to-br from-pink-400 to-blue-400 bg-clip-text text-transparent">
          {data.challenges_by_pk.days}
        </span>
        DaysOf<span>{data.challenges_by_pk.topic}</span>
      </p>
      {data.challenges_by_pk.isPublic ? <Tag>Public</Tag> : <Tag>Private</Tag>}
    </div>
  );
};

export default ChallengeHeader;
