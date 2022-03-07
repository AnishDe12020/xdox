import classNames from "classnames";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import Divider from "../components/Divider";
import FormGroup from "../components/FormGroup";

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
        <FormGroup
          register={register}
          errors={errors}
          name="email"
          placeholder="johndoe@example.com"
        />
        <Button type="submit" className="bg-secondary text-white">
          Login with Email
        </Button>
      </form>
    </div>
  );
};

export default AuthPage;
