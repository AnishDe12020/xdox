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
import Button from "./Button";

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

    const newChallenge = data.insert_challenges_one;

    cache.writeQuery({
      query: GET_CHALLENGES,
      data: { challenges: [newChallenge, ...existingChallenges.challenges] },
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
      await createChallenge({
        variables: {
          challenge: {
            days: data.days,
            topic: data.topic,
            isPublic: data.isPublic,
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
      trigger={<Button className="w-full">Create Challenge</Button>}
      onDone={onSubmit}
      isSubmitting={isSubmitting}
      doneText="Submit"
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
