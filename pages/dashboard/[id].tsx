import { Content } from "@tiptap/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ChallengeHeader from "../../components/ChallengeHeader";
import Challenges from "../../components/Challenges";
import Editor from "../../components/Editor";
import WeekBar from "../../components/WeekBar";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage: NextPage = () => {
  const [content, setContent] = useState<Content>();
  const router = useRouter();

  return (
    <DashboardLayout>
      <Challenges variant="list" className="hidden md:flex" />
      <div className="flex w-full flex-col md:mx-12 lg:mx-16">
        <ChallengeHeader id={router.query.id as string} />
        <WeekBar />
        <Editor content={content} onChange={setContent} className="mt-16" />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
