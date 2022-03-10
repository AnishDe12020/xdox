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
};

const ProfileSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
  })
  .required();

const ProfilePage: NextPage = () => {
  const user = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    },
    resolver: yupResolver(ProfileSchema),
  });

  const onProfileUpdate = handleSubmit(
    async (data: FormData) => {
      console.log(data);
      await user.update({
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        username: data.username as string,
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

        <FormGroup
          register={register}
          errors={errors}
          name="username"
          placeholder="Username"
          label="Username"
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
