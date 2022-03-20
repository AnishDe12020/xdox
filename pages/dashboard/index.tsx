import dynamic from "next/dynamic";
import { NextPage } from "next";
import { useState } from "react";
import Challenges from "../../components/Challenges";
import WeekBar from "../../components/WeekBar";
import DashboardLayout from "../../layouts/DashboardLayout";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const DashboardPage: NextPage = () => {
  const [mdValue, setMdValue] = useState<string>();

  return (
    <DashboardLayout>
      <Challenges />
      <div className="flex w-full flex-col">
        <WeekBar />
        <div className="border-2 border-secondary">
          <MDEditor value={mdValue} onChange={setMdValue} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
