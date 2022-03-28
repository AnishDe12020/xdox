import { useQuery } from "@apollo/client";
import { GlobeIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import toast from "react-hot-toast";
import ChallengeData from "../../components/ChallengeData";
import GitHubLogo from "../../components/Icons/GitHub";
import TwitterLogo from "../../components/Icons/Twitter";
import { GET_CHALLENGES, GET_USER_DATA } from "../../graphql/queries";
import { UnauthenticatedApolloProviderWrapper } from "../../lib/apolloClientUnauthenticated";
import { UserData } from "../../types/User";

const HASURA_GRAPHQL_API = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API;

interface IUserPageProps {
  userData: UserData;
}

const UserPage: NextPage<IUserPageProps> = ({ userData }: IUserPageProps) => {
  console.log(userData);

  const { data: challengesData, error: challengesError } = useQuery(
    GET_CHALLENGES,
    { variables: { userId: userData.id } }
  );

  if (challengesError) {
    toast.error("Something went wrong!");
  }

  console.log(challengesData);

  return (
    <UnauthenticatedApolloProviderWrapper>
      <div className="mx-8 flex flex-col items-center space-y-4 md:mx-16 lg:mx-32">
        {userData ? (
          <>
            <img
              src={userData.profile_image_url}
              className="h-32 w-32 rounded-full"
              alt={userData.username}
            />
            <p className="text-xl font-semibold md:text-2xl lg:text-3xl">
              {userData.first_name} {userData.last_name}
            </p>
            <p className="text-md md:text-lg lg:text-xl">
              @{userData.username}
            </p>
            <p>{userData.bio}</p>
            <div className="mt-4 flex flex-row space-x-4">
              <a
                href={`https://twitter.com/${userData.twitter_username}`}
                className="transition duration-200 hover:opacity-60"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterLogo className="h-8 w-8" />
              </a>
              <a
                href={`https://github.com/${userData.github_username}`}
                className="transition duration-200 hover:opacity-60"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubLogo className="h-8 w-8" />
              </a>
              <a
                href={userData.website_url}
                className="transition duration-200 hover:opacity-60"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon className="h-8 w-8" />
              </a>
            </div>

            <ChallengeData
              variant="grid"
              challengeData={challengesData}
              handleChallengeClick={() => console.log("e")}
              readonly
            />
          </>
        ) : (
          <>
            <div className="h-32 w-32 animate-pulse rounded-full bg-secondary" />
            <div className="h-8 w-48 animate-pulse rounded-lg bg-secondary" />
            <div className="h-6 w-32 animate-pulse rounded-lg bg-secondary" />
            <div className="h-4 w-64 animate-pulse rounded-lg bg-secondary" />
            <div className="mt-4 flex flex-row space-x-4">
              <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
              <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
              <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
            </div>
          </>
        )}
      </div>
    </UnauthenticatedApolloProviderWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const username = (context.query.username as string)
    .replace("@", "")
    .toLowerCase();

  const { data: userData } = await axios.post(
    HASURA_GRAPHQL_API as string,
    JSON.stringify({
      query: GET_USER_DATA,
      variables: { username },
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
      },
    }
  );

  return {
    props: {
      userData: userData.data.users[0],
    },
  };
};

export default UserPage;
