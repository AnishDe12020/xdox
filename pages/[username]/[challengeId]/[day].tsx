import { useQuery } from "@apollo/client";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import toast from "react-hot-toast";
import UserDataComponent from "../../../components/UserData";
import ChallengeData from "../../../components/ChallengeData";
import {
  GET_CHALLENGES,
  GET_PROGRESS,
  GET_USER_DATA,
} from "../../../graphql/queries";
import { UnauthenticatedApolloProviderWrapper } from "../../../lib/apolloClientUnauthenticated";
import { UserData } from "../../../types/User";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Content } from "@tiptap/react";
import { ProgressData } from "../../../types/Progress";
import Editor from "../../../components/Editor";
import ProgressDaysBar from "../../../components/PorgressDaysBar";
import ChallengeHeader from "../../../components/ChallengeHeader";

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

  const router = useRouter();

  const challengeId = router.query.challengeId as string;
  const day = router.query.day as unknown as number;

  console.log(challengeId);

  const [content, setContent] = useState<Content>();

  let {
    data: progressData,
    error,
    loading,
    previousData,
  } = useQuery<ProgressData>(GET_PROGRESS, {
    variables: { challenge_id: challengeId, user_id: userData.id, forDay: day },
  });

  if (loading) {
    progressData = previousData;
  }

  if (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }

  useEffect(() => {
    if (!progressData) {
      return;
    }
    setContent(progressData?.progress?.[0]?.content);
  }, [progressData]);

  console.log(challengesData);

  return (
    <UnauthenticatedApolloProviderWrapper>
      <div className="mx-8 flex flex-col items-center space-y-4 md:mx-16 lg:mx-32">
        <UserDataComponent userData={userData} />
      </div>
      <div className="mx-8 mt-32 flex flex-row md:mx-16 lg:mx-32">
        <ChallengeData
          variant="list"
          challengeData={challengesData}
          handleChallengeClick={() => console.log("e")}
          readonly
          className="hidden md:flex"
        />
        <div className="flex w-full flex-col md:mx-12">
          <ChallengeHeader id={challengeId as string} />
          <ProgressDaysBar challengeId={challengeId} />
          {progressData?.progress ? (
            <Editor className="mt-16" content={content} onChange={setContent} />
          ) : (
            <div className="flex flex-col space-y-8">
              <div className="mt-16 h-32 w-full animate-pulse rounded-lg bg-secondary" />
              <div className="h-8 w-12 animate-pulse rounded-full bg-secondary" />
            </div>
          )}
        </div>
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
