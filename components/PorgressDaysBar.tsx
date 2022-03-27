import { useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { GET_PROGRESSES } from "../graphql/queries";
import Button from "./Button";
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
  } = useQuery(GET_PROGRESSES, {
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
              router.push(
                `/dashboard/${challengeId}/${progress.forDay}`,
                undefined,
                {
                  shallow: true,
                }
              )
            }
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
        <Button
          className="bg-blue-600 text-accent"
          onClick={() => {
            console.log(
              "ee",
              progressesData.progress[progressesData.progress.length - 1]
                .forDay + 1
            );
            router.push(
              `/dashboard/${challengeId}/${progressesData.progress.length + 1}`
            );
          }}
        >
          Add for today
        </Button>
      )}
    </div>
  );
};

export default ProgressDaysBar;
