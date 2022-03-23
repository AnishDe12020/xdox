import { useQuery } from "@apollo/client";
import { Content } from "@tiptap/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import Challenges from "../../components/Challenges";
import Editor from "../../components/Editor";
import Tag from "../../components/Tag";
import WeekBar from "../../components/WeekBar";
import { GET_CHALLENGE } from "../../graphql/queries";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ChallengeData } from "../../types/Challenges";

const DashboardPage: NextPage = () => {
  const [content, setContent] = useState<Content>();
  const router = useRouter();

  let { data, loading, error, previousData } = useQuery<ChallengeData>(
    GET_CHALLENGE,
    { variables: { id: router.query.id } }
  );

  if (loading) {
    data = previousData;
  }

  if (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }

  console.log(data);

  return (
    <DashboardLayout>
    <Challenges variant="list" className="hidden md:flex" activeId={router.query.id as string} />
      <div className="flex w-full flex-col md:mx-12 lg:mx-16">
        {!data ? (
          <div className="mx-4 mb-16 flex space-x-2">
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
            {data.challenges_by_pk.isPublic ? (
              <Tag>Public</Tag>
            ) : (
              <Tag>Private</Tag>
            )}
          </div>
        )}
        <WeekBar />
        <Editor content={content} onChange={setContent} className="mt-16" />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
