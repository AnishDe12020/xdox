import { useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GET_PROGRESSES } from "../graphql/queries";
import {
  ProgressDaysBarData,
  ProgressDaysBarProgress,
} from "../types/Progress";
import DayButton from "./DayButton";

interface IProgressDaysBarProps {
  challengeId: string;
  username?: string;
  readOnly?: boolean;
  userId: string;
}

const ProgressDaysBar = ({
  challengeId,
  username,
  readOnly,
  userId,
}: IProgressDaysBarProps): JSX.Element => {
  const router = useRouter();
  const [progresses, setProgresses] = useState<
    ProgressDaysBarProgress[] | undefined
  >([]);

  let {
    data: progressesData,
    error: progressesError,
    previousData,
    loading,
  } = useQuery<ProgressDaysBarData>(GET_PROGRESSES, {
    variables: {
      challenge_id: challengeId,
      user_id: userId,
    },
  });

  useEffect(() => {
    const progresses = progressesData?.progress.slice().sort((a, b) => {
      return a.forDay - b.forDay;
    });
    setProgresses(progresses);
  }, [progressesData]);

  if (progressesError) {
    toast.error("Something went wrong!");
  }

  if (loading) {
    progressesData = previousData;
  }

  return (
    <div className="flex items-center justify-center space-x-1 overflow-x-auto md:justify-start md:space-x-2 lg:space-x-4">
      {progresses ? (
        progresses.map((progress, index) => (
          <DayButton
            key={index}
            date={progress.date}
            forDay={progress.forDay}
            onClick={() =>
              router.push(
                `/${username ?? "dashboard"}/${challengeId}/${progress.forDay}`,
                undefined,
                { shallow: true }
              )
            }
            active={(router.query.day as unknown as number) == progress.forDay}
          />
        ))
      ) : (
        <>
          <div className="h-10 w-10 animate-pulse rounded-full bg-secondary" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-secondary" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-secondary" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-secondary" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-secondary" />
        </>
      )}
      {!readOnly && progressesData?.progress && (
        <DayButton
          forDay={progressesData.progress.length + 1}
          date={DateTime.now().toISODate()}
          onClick={() =>
            router.push(
              `/dashboard/${challengeId}/${progressesData!.progress.length + 1}`
            )
          }
          active={
            (router.query.day as unknown as number) ==
            progressesData.progress.length + 1
          }
        />
      )}
    </div>
  );
};

export default ProgressDaysBar;
