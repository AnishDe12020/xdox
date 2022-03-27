import { useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { GET_PROGRESSES } from "../graphql/queries";
import { ProgressDaysBarData } from "../types/Progress";
import DayButton from "./DayButton";

interface IProgressDaysBarProps {
  challengeId: string;
}

const ProgressDaysBar = ({
  challengeId,
}: IProgressDaysBarProps): JSX.Element => {
  const router = useRouter();
  const user = useUser();

  let {
    data: progressesData,
    error: progressesError,
    previousData,
    loading,
  } = useQuery<ProgressDaysBarData>(GET_PROGRESSES, {
    variables: {
      challenge_id: challengeId,
      user_id: user.id,
    },
  });

  if (progressesError) {
    toast.error("Something went wrong!");
  }

  if (loading) {
    progressesData = previousData;
  }

  return (
    <div className="flex items-center justify-center space-x-1 overflow-x-auto md:justify-start md:space-x-2 lg:space-x-4">
      {progressesData?.progress ? (
        progressesData?.progress.map((progress, index) => (
          <DayButton
            key={index}
            date={progress.date}
            forDay={progress.forDay}
            onClick={() =>
              router.push(`/dashboard/${challengeId}/${progress.forDay}`)
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
          <div className="h-12 w-32 animate-pulse rounded-lg bg-secondary" />
        </>
      )}
      {progressesData?.progress && (
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
