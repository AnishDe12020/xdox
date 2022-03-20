import { Content } from "@tiptap/react";
import { NextPage } from "next";
import { useState } from "react";
import Challenges from "../../components/Challenges";
import Editor from "../../components/Editor";
import WeekBar from "../../components/WeekBar";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage: NextPage = () => {
  const [content, setContent] = useState<Content>();

  return (
    <DashboardLayout>
      <Challenges />
      <div className="flex w-full flex-col">
        <WeekBar />
        <Editor content={content} onChange={setContent} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
