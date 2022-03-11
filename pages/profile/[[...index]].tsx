import { useUser } from "@clerk/nextjs";
import { Transition } from "@headlessui/react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import toast from "react-hot-toast";

type FormData = {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  twitterUsername?: string | null;
  githubUsername?: string | null;
  bio?: string | null;
  websiteUrl?: string | null;
};

const ProfileSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    twitterUsername: yup.string(),
    githubUsername: yup.string(),
    bio: yup.string(),
    websiteUrl: yup.string(),
  })
  .required();

const ProfilePage: NextPage = () => {
  const user = useUser();

  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, dirtyFields },
  } = useForm<FormData>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      twitterUsername: user.unsafeMetadata.twitter_username as string | null,
      githubUsername: user.unsafeMetadata.github_username as string | null,
      bio: user.unsafeMetadata.bio as string | null,
      websiteUrl: user.unsafeMetadata.website_url as string | null,
    },
    resolver: yupResolver(ProfileSchema),
  });

  const onProfileUpdate = handleSubmit(
    async (data: FormData) => {
      console.log(data);
      await user.update({
        firstName: dirtyFields.firstName
          ? (data.firstName as string | undefined)
          : undefined,
        lastName: dirtyFields.lastName
          ? (data.lastName as string | undefined)
          : undefined,
        username: dirtyFields.username
          ? (data.username as string | undefined)
          : undefined,
        unsafeMetadata: {
          twitterUsername: data.twitterUsername,
          githubUsername: data.githubUsername,
          bio: data.bio,
          websiteUrl: data.websiteUrl,
        },
      });

      toast.success("Profile updated successfully");
    },
    () => {
      toast.error("Something went wrong!");
    }
  );

  return (
    <div className="mx-8 flex flex-col items-center justify-center md:mx-16 lg:mx-32">
      <img
        src={user.profileImageUrl}
        className="h-32 w-32 rounded-full"
        alt={user.username as string}
      />

      <form
        className="mt-16 flex flex-col space-y-8 rounded-lg p-4"
        onSubmit={onProfileUpdate}
      >
        <div className="flex space-x-4">
          <FormGroup
            register={register}
            errors={errors}
            name="firstName"
            placeholder="First Name"
            label="First Name"
          />

          <FormGroup
            register={register}
            errors={errors}
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
          />
        </div>

        <FormGroup
          register={register}
          errors={errors}
          name="username"
          placeholder="Username"
          label="Username"
        />

        <FormGroup
          register={register}
          errors={errors}
          name="bio"
          placeholder="Bio"
          label="Bio"
          textarea
        />

        <div className="flex space-x-4">
          <FormGroup
            register={register}
            errors={errors}
            name="twitterUsername"
            placeholder="Twitter Username"
            label="Twitter Username"
          />

          <FormGroup
            register={register}
            errors={errors}
            name="githubUsername"
            placeholder="Github Username"
            label="Github Username"
          />
        </div>
        <FormGroup
          register={register}
          errors={errors}
          name="websiteUrl"
          placeholder="Website URL"
          label="Website URL"
        />

        <Transition
          show={isDirty}
          enter="transition duration-200"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
          className="w-full"
        >
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Update
          </Button>
        </Transition>
      </form>
    </div>
  );
};

export default ProfilePage;
