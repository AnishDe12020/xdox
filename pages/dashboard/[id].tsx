import { useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { Content } from "@tiptap/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../components/Button";
import ChallengeHeader from "../../components/ChallengeHeader";
import Challenges from "../../components/Challenges";
import Editor from "../../components/Editor";
import WeekBar from "../../components/WeekBar";
import { GET_PROGRESS } from "../../graphql/queries";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ProgressData } from "../../types/Progress";

const DashboardPage: NextPage = () => {
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
    data = previousData;
  }

  if (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }

  const { control, handleSubmit } = useForm();

  const {
    field: { onChange, value, ref },
  } = useController({
    name: "content",
    control,
    rules: { required: true },
    defaultValue: data?.progress[0]?.content,
  });

  console.log(data);

  const handleAddProgressSubmit = handleSubmit(async data => {
    console.log(data);
  });

  return (
    <DashboardLayout>
      <Challenges variant="list" className="hidden md:flex" />
      <div className="flex w-full flex-col md:mx-12 lg:mx-16">
        <ChallengeHeader id={challengeId as string} />
        <WeekBar />
        <form onSubmit={handleAddProgressSubmit}>
          <Editor
            content={value}
            onChange={onChange}
            className="mt-16"
            ref={ref}
          />
          <Button type="submit" className="mt-4">
            Add Progress
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
