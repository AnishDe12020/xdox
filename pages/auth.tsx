import classNames from "classnames";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import Divider from "../components/Divider";

const EmailSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const AuthPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(EmailSchema) });

  const onEmailSubmit = handleSubmit((data) => console.log(data));
  console.log(watch("email")); // watch input value by passing the name of it
  console.log(errors);

  return (
    <div className="flex justify-center items-center mt-64 flex-col">
      <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
        Authentication
      </h1>

      <Button className="bg-secondary text-white mt-16">
        Login with Google
      </Button>
      <Divider>or continue with</Divider>
      <form
        onSubmit={onEmailSubmit}
        className="flex flex-col space-y-8 justify-center items-center"
      >
        <input {...register("email")} placeholder="john.doe@example.com" />
        <Button type="submit" className="bg-secondary text-white8">
          Login with Email
        </Button>
      </form>
    </div>
  );
};

export default AuthPage;
