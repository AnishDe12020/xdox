import { ApolloCache, OperationVariables, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import FormGroup from "./FormGroup";
import Modal from "./Modal";
import { CREATE_CHALLENGE } from "../graphql/mutations";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { GET_CHALLENGES } from "../graphql/queries";
import type { Challenge, CreateChallengeInput } from "../types/Challenges";
import { DateTime } from "luxon";

const CreateChallengeSchema = yup.object({
  days: yup.number().required(),
  topic: yup.string().required(),
  isPublic: yup.boolean().required(),
});

const CreateChallenge = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateChallengeInput>({
    defaultValues: {
      days: undefined,
      topic: "",
      isPublic: true,
    },
    resolver: yupResolver(CreateChallengeSchema),
  });

  const updateCache = (
    cache: ApolloCache<any>,
    { data }: OperationVariables
  ) => {
    const existingChallenges: any = cache.readQuery({ query: GET_CHALLENGES });
    console.log("exisitng challenges", existingChallenges);

    const newChallenge = data.insert_challenges_one;
    console.log("new challenge", newChallenge);

    cache.writeQuery({
      query: GET_CHALLENGES,
      data: {
        challenges:
          existingChallenges && existingChallenges.challenges
            ? [...existingChallenges.challenges, newChallenge]
            : [newChallenge],
      },
    });
  };

  const [
    createChallenge,
    { data: apolloResponseData, error: apolloResponseError },
  ] = useMutation<
    { createChallenge: Challenge },
    { challenge: CreateChallengeInput }
  >(CREATE_CHALLENGE, {
    update: updateCache,
  });

  const onSubmit = handleSubmit(
    async data => {
      console.log(data);
      console.log(DateTime.fromJSDate(new Date(data.start_date)).toISODate());
      await createChallenge({
        variables: {
          challenge: {
            days: data.days,
            topic: data.topic,
            isPublic: data.isPublic,
            start_date:
              DateTime.fromJSDate(new Date(data.start_date)).toISODate() ||
              DateTime.now().toISODate(),
          },
        },
      });
      if (apolloResponseError) {
        console.log(apolloResponseError);
        throw new Error(apolloResponseError.message);
      } else if (apolloResponseData) {
        toast.success("Challenge created!");
      }
    },
    () => {
      console.error(apolloResponseError);
      toast.error("Something went wrong!");
    }
  );
  return (
    <Modal
      title="Create Challenge"
      closable
      trigger="Create Challenge"
      onDone={onSubmit}
      isSubmitting={isSubmitting}
      doneText="Submit"
      errors={errors}
    >
      <form onSubmit={onSubmit} className="flex flex-col space-y-8">
        <FormGroup
          register={register}
          errors={errors}
          name="days"
          label="Number of Days"
          placeholder="100"
          type="number"
          required
        />
        <FormGroup
          register={register}
          errors={errors}
          name="topic"
          required
          label="Topic"
          placeholder="Code"
        />

        <FormGroup
          register={register}
          errors={errors}
          name="start_date"
          label="Start Date"
          control={control}
          isDatePicker
        />

        <p className="text-lg md:text-xl">
          Preview:{"  "}
          {watch("days") || "100"}DaysOf{watch("topic") || "Code"}
        </p>
        <FormGroup
          register={register}
          errors={errors}
          name="isPublic"
          label="Public?"
          isSwitch
          checked
          control={control}
        />
      </form>
    </Modal>
  );
};

export default CreateChallenge;
