import { useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import FormGroup from "../../components/FormGroup";
import Modal from "../../components/Modal";
import { CREATE_CHALLENGE } from "../../graphql/mutations";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { GET_CHALLENGES } from "../../graphql/queries";

type CreateChallengeData = {
  numberOfDays: number;
  topic: string;
  isPublic: boolean;
};

const CreateChallengeSchema = yup.object({
  numberOfDays: yup.number().required(),
  topic: yup.string().required(),
  isPublic: yup.boolean().required(),
});

const DashboardPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateChallengeData>({
    defaultValues: {
      numberOfDays: undefined,
      topic: "",
      isPublic: true,
    },
    resolver: yupResolver(CreateChallengeSchema),
  });

  const updateCache = (cache, { data }) => {
    const existingChallenges = cache.readQuery({ query: GET_CHALLENGES });

    console.log(existingChallenges);

    console.log(data);

    const newChallenge = data.insert_challenges_one;

    cache.writeQuery({
      query: GET_CHALLENGES,
      data: { challenges: [newChallenge, ...existingChallenges.challenges] },
    });
  };

  const [
    mutateFunction,
    { data: apolloResponseData, loading, error: apolloResponseError },
  ] = useMutation(CREATE_CHALLENGE, {
    update: updateCache,
  });

  const onSubmit = handleSubmit(
    async data => {
      console.log(data);
      await mutateFunction({
        variables: {
          challenge: {
            days: data.numberOfDays,
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
    <div className="flex flex-col">
      <div className="flex w-1/4 flex-col items-end justify-end bg-secondary">
        <Modal
          title="Test Modal"
          closable
          trigger="Trigger Modal"
          onDone={onSubmit}
          isSubmitting={isSubmitting}
          doneText="Submit"
        >
          <form onSubmit={onSubmit} className="flex flex-col space-y-8">
            <FormGroup
              register={register}
              errors={errors}
              name="numberOfDays"
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
              {watch("numberOfDays") || "100"}DaysOf{watch("topic") || "Code"}
            </p>
            <FormGroup
              register={register}
              errors={errors}
              name="isPublic"
              label="Public?"
              isSwitch
              checked
            />
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardPage;
