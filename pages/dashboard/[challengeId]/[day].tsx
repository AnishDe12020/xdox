import {
  ApolloCache,
  OperationVariables,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { Content } from "@tiptap/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/Button";
import ChallengeHeader from "../../../components/ChallengeHeader";
import Challenges from "../../../components/Challenges";
import Editor from "../../../components/Editor";
import WeekBar from "../../../components/WeekBar";
import { ADD_PROGRESS, UPDATE_PROGRESS } from "../../../graphql/mutations";
import { GET_PROGRESS, GET_PROGRESSES } from "../../../graphql/queries";
import useDate from "../../../hooks/useDate";
import DashboardLayout from "../../../layouts/DashboardLayout";
import type {
  AddProgressInput,
  Progress,
  ProgressData,
  UpdateProgressInput,
} from "../../../types/Progress";
import Switch from "../../../components/Switch";
import ProgressDaysBar from "../../../components/PorgressDaysBar";

const ChallengeDashboardPage: NextPage = () => {
  const router = useRouter();

  const challengeId = router.query.challengeId as string;
  const day = router.query.day as unknown as number;

  console.log(challengeId);

  const user = useUser();

  const { date } = useDate();

  const [toUpdate, setToUpdate] = useState<boolean>(false);
  const [content, setContent] = useState<Content>();
  const [isSkipDay, setIsSkipDay] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  let {
    data: progressData,
    error,
    loading,
    previousData,
  } = useQuery<ProgressData>(GET_PROGRESS, {
    variables: { challenge_id: challengeId, user_id: user.id, forDay: day },
  });

  if (loading) {
    progressData = previousData;
  }

  if (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }

  const { data: progressesData, error: progressesError } = useQuery(
    GET_PROGRESSES,
    {
      variables: {
        challenge_id: challengeId,
        user_id: user.id,
      },
    }
  );

  useEffect(() => {
    if (!progressData) {
      return;
    }
    setToUpdate(progressData?.progress?.length > 0);
    setContent(progressData?.progress?.[0]?.content);
    setIsSkipDay(progressData?.progress?.[0]?.isSkipDay);
  }, [progressData]);

  const addProgressUpdateCache = (
    cache: ApolloCache<any>,
    { data }: OperationVariables
  ) => {
    const newProgress = data.insert_progress_one;

    cache.writeQuery({
      query: GET_PROGRESS,
      variables: { challenge_id: challengeId, user_id: user.id, date: date },
      data: { progress: [newProgress] },
    });
  };

  const updateProgressUpdateCache = (
    cache: ApolloCache<any>,
    { data }: OperationVariables
  ) => {
    const newProgress = data.update_progress_by_pk;

    cache.writeQuery({
      query: GET_PROGRESS,
      variables: { challenge_id: challengeId, user_id: user.id, date: date },
      data: { progress: [newProgress] },
    });
  };

  const [addProgress, { error: addProgressError }] = useMutation<
    { addProgress: Progress },
    { progress: AddProgressInput }
  >(ADD_PROGRESS, { update: addProgressUpdateCache });

  const [updateProgress, { error: updateProgressError }] = useMutation<
    { addProgress: Progress },
    { progress: UpdateProgressInput; id: string }
  >(UPDATE_PROGRESS, { update: updateProgressUpdateCache });

  console.log(progressData);

  const handleAddProgressSubmit = async () => {
    if (!content) {
      toast.error("Please add some content");
      return;
    }
    setIsSubmitting(true);

    if (toUpdate) {
      await updateProgress({
        variables: {
          progress: {
            content: content,
            isSkipDay: isSkipDay ?? false,
          },
          id: progressData?.progress[0]?.id as string,
        },
      });

      if (updateProgressError) {
        console.error(updateProgressError);
        throw new Error(updateProgressError.message);
      } else {
        toast.success("Progress updated!");
      }
    } else {
      await addProgress({
        variables: {
          progress: {
            content: content as Content,
            isSkipDay: isSkipDay ?? false,
            challenge_id: challengeId as string,
            date: date,
            forDay: !isSkipDay ? day : undefined,
          },
        },
      });

      console.log("ee");

      if (addProgressError) {
        console.log(addProgressError);
        throw new Error(addProgressError.message);
      } else {
        console.log("eee");
        toast.success("Progress added!");
      }
    }
    setIsSubmitting(false);
  };

  console.log("g", progressData?.progress[0]?.isSkipDay ?? false);

  return (
    <DashboardLayout>
      <Challenges
        variant="list"
        className="hidden md:flex"
        activeChallengeId={challengeId}
      />
      <div className="flex w-full flex-col md:mx-12 lg:mx-16">
        <ChallengeHeader id={challengeId as string} />
        {progressesData?.progress && (
          <ProgressDaysBar progresses={progressesData.progress} />
        )}
        {progressData?.progress ? (
          <div className="mt-16 flex flex-col space-y-4">
            <Editor content={content} onChange={setContent} />
            <label
              htmlFor="isSkipDay"
              className="relative w-fit pr-4 text-sm font-semibold"
            >
              Skipping this day?
            </label>
            <Switch
              checked={isSkipDay}
              onChange={() => setIsSkipDay(!isSkipDay)}
              id="isSkipDay"
            />
            <Button
              type="submit"
              className="w-fit"
              loading={isSubmitting}
              onClick={handleAddProgressSubmit}
            >
              {toUpdate ? "Update Progress" : "Add Progress"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-8">
            <div className="mt-16 h-32 w-full animate-pulse rounded-lg bg-secondary" />
            <div className="h-8 w-12 animate-pulse rounded-full bg-secondary" />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ChallengeDashboardPage;
