import { useUser } from "@clerk/nextjs";
import { Transition } from "@headlessui/react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";

type FormData = {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
};

const ProfilePage: NextPage = () => {
  const user = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    },
  });

  const onProfileUpdate = (data: FormData) => {
    console.log(data);
  };

  console.log(user);
  return (
    <div className="mx-8 flex flex-col items-center justify-center md:mx-16 lg:mx-32">
      <img
        src={user.profileImageUrl}
        className="h-32 w-32 rounded-full"
        alt={user.username as string}
      />

      <form
        className="mt-16 flex flex-col space-y-8 rounded-lg p-4"
        onSubmit={handleSubmit(onProfileUpdate)}
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
          <Button type="submit" className="w-full">
            Update
          </Button>
        </Transition>
      </form>
    </div>
  );
};

export default ProfilePage;
