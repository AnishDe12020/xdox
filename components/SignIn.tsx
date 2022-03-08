import Button from "./Button";
import Divider from "./Divider";
import FormGroup from "./FormGroup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignIn, withClerk } from "@clerk/nextjs";

const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Input must be a valid e-mail")
    .required("E-mail is required"),
});

const SignIn = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(EmailSchema) });

  const onEmailSubmit = handleSubmit(data => console.log(data));

  const { authenticateWithRedirect } = useSignIn();

  const signInWithGoogle = () => {
    authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth",
    });
  };
  return (
    <>
      <Button
        className="mt-16 bg-secondary text-white"
        onClick={signInWithGoogle}
      >
        Login with Google
      </Button>
      <Divider>or continue with</Divider>
      <form
        onSubmit={onEmailSubmit}
        className="flex flex-col items-center justify-center space-y-4"
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
    </>
  );
};

export default withClerk(SignIn);
