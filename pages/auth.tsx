import classNames from "classnames";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import Divider from "../components/Divider";

const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Input must be a valid e-mail")
    .required("E-mail is required"),
});

const AuthPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(EmailSchema) });

  console.log(errors);

  const onEmailSubmit = handleSubmit((data) => console.log(data));

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
        className="flex flex-col space-y-4 justify-center items-center"
      >
        <input
          {...register("email")}
          placeholder="john.doe@example.com"
          className="px-4 py-2 rounded-lg bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 border-2 border-gray-700 hover:border-opacity-60 transition duration-200"
        />
        {errors.email && (
          <p className="rounded-lg bg-red-500 px-3 py-2 text-xs italic">
            {errors.email.message}
          </p>
        )}
        <Button type="submit" className="bg-secondary text-white">
          Login with Email
        </Button>
      </form>
    </div>
  );
};

export default AuthPage;
