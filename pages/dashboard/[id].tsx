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
import EditorFormComponent from "../../components/Editor/EditorFormComponent";
import FormGroup from "../../components/FormGroup";
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

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isSkipDay: data?.progress[0]?.isSkipDay,
      content: data?.progress[0]?.content,
    },
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
        <form
          onSubmit={handleAddProgressSubmit}
          className="flex flex-col space-y-4"
        >
          <EditorFormComponent
            control={control}
            defaultContent={data?.progress[0]?.content}
          />
          <FormGroup
            register={register}
            errors={errors}
            name="isSkipDay"
            isSwitch
            control={control}
            label="Skip Day?"
          />
          <Button type="submit" className="w-fit">
            Add Progress
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
