import { useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { Content } from "@tiptap/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import ChallengeHeader from "../../components/ChallengeHeader";
import Challenges from "../../components/Challenges";
import Editor from "../../components/Editor";
import WeekBar from "../../components/WeekBar";
import { GET_PROGRESS } from "../../graphql/queries";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ProgressData } from "../../types/Progress";

const DashboardPage: NextPage = () => {
  const [content, setContent] = useState<Content>();
  const router = useRouter();

  const challengeId = router.query.id;

  const user = useUser();

  let { data, error, loading, previousData } = useQuery<ProgressData>(
    GET_PROGRESS,
    {
      variables: { challenge_id: challengeId, user_id: user.id },
    }
  );

  if (loading) {
  data = previousData
  }

  if (error) {
  console.error(error)
  toast.error("Something went wrong!")
  }

  console.log(data)

  return (
    <DashboardLayout>
      <Challenges variant="list" className="hidden md:flex" />
      <div className="flex w-full flex-col md:mx-12 lg:mx-16">
        <ChallengeHeader id={challengeId as string} />
        <WeekBar />
        <Editor content={content} onChange={setContent} className="mt-16" />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
