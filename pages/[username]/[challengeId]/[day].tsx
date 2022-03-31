import { useQuery } from "@apollo/client";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import toast from "react-hot-toast";
import UserDataComponent from "../../../components/UserData";
import ChallengeData from "../../../components/ChallengeData";
import {
  GET_CHALLENGES_FOR_USER,
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
import { NextSeo } from "next-seo";

const HASURA_GRAPHQL_API = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API;

interface IUserPageProps {
  userData: UserData;
}

const UserPage: NextPage<IUserPageProps> = ({ userData }: IUserPageProps) => {
  let {
    data: challengesData,
    error: challengesError,
    loading: challegesLoading,
    previousData: challengesPreviousData,
  } = useQuery(GET_CHALLENGES_FOR_USER, { variables: { userId: userData.id } });

  if (challegesLoading) {
    challengesData = challengesPreviousData;
  }

  if (challengesError) {
    toast.error("Something went wrong!");
  }

  const router = useRouter();

  const challengeId = router.query.challengeId as string;
  const day = router.query.day as unknown as number;

  const [content, setContent] = useState<Content>();

  const { data: progressData, error } = useQuery<ProgressData>(GET_PROGRESS, {
    variables: { challenge_id: challengeId, user_id: userData.id, forDay: day },
  });

  if (error) {
    toast.error("Something went wrong!");
  }

  useEffect(() => {
    if (!progressData) {
      return;
    }
    setContent(progressData?.progress?.[0]?.content);
  }, [progressData]);

  const handleChallengeClick = (challengeId: string) => {
    router.push(`/${router.query.username}/${challengeId}/1`, undefined, {
      shallow: true,
    });
  };

  return (
    <UnauthenticatedApolloProviderWrapper>
      <NextSeo title={`XdoX | ${userData.username || "User Page"}`} />

      <div className="mx-8 flex flex-col items-center space-y-4 md:mx-16 lg:mx-32">
        <UserDataComponent userData={userData} />
      </div>
      <div className="mx-8 mt-32 flex flex-row md:mx-16 lg:mx-32">
        <ChallengeData
          variant="list"
          challengeData={challengesData}
          handleChallengeClick={handleChallengeClick}
          readonly
          className="hidden md:flex"
        />
        <div className="flex w-full flex-col md:mx-12">
          <ChallengeHeader id={challengeId as string} />
          <ProgressDaysBar
            challengeId={challengeId}
            username={router.query.username as string}
            userId={userData.id}
            readOnly
          />
          {progressData?.progress ? (
            <Editor
              className="mt-16"
              content={content}
              onChange={setContent}
              readOnly
            />
          ) : (
            <div className="flex flex-col space-y-8">
              <div className="mt-16 h-32 w-full animate-pulse rounded-lg bg-secondary" />
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
