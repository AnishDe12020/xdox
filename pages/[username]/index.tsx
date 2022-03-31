import { useQuery } from "@apollo/client";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ChallengeData from "../../components/ChallengeData";
import UserDataComponent from "../../components/UserData";
import { GET_CHALLENGES, GET_USER_DATA } from "../../graphql/queries";
import { UnauthenticatedApolloProviderWrapper } from "../../lib/apolloClientUnauthenticated";
import { UserData } from "../../types/User";

const HASURA_GRAPHQL_API = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API;

interface IUserPageProps {
  userData: UserData;
}

const UserPage: NextPage<IUserPageProps> = ({ userData }: IUserPageProps) => {
  const router = useRouter();

  let {
    data: challengesData,
    error: challengesError,
    loading: challegesLoading,
    previousData: challengesPreviousData,
  } = useQuery(GET_CHALLENGES, { variables: { userId: userData.id } });

  if (challegesLoading) {
    challengesData = challengesPreviousData;
  }

  if (challengesError) {
    toast.error("Something went wrong!");
  }

  const handleChallengeClick = (challengeId: string) => {
    router.push(`/${router.query.username}/${challengeId}/1`, undefined, {
      shallow: true,
    });
  };

  return (
    <UnauthenticatedApolloProviderWrapper>
      <NextSeo title={`XdoX | ${userData.username || "User Page"}`} />

      <div className="mx-8 mb-16 flex flex-col items-center space-y-4 md:mx-16 lg:mx-32">
        <UserDataComponent userData={userData} />

        <ChallengeData
          variant="grid"
          challengeData={challengesData}
          handleChallengeClick={handleChallengeClick}
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

  if (!userData || userData?.data?.users?.length <= 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  return {
    props: {
      userData: userData.data.users[0],
    },
  };
};

export default UserPage;
