import { useQuery } from "@apollo/client";
import { GlobeIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import toast from "react-hot-toast";
import ChallengeData from "../../components/ChallengeData";
import GitHubLogo from "../../components/Icons/GitHub";
import TwitterLogo from "../../components/Icons/Twitter";
import UserDataComponent from "../../components/UserData";
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
        <UserDataComponent userData={userData} />

        <ChallengeData
          variant="grid"
          challengeData={challengesData}
          handleChallengeClick={() => console.log("e")}
          readonly
        />
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
