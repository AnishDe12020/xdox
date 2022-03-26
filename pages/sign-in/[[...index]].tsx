import { NextPage } from "next";
import { SignIn } from "@clerk/nextjs";
import AuthLayout from "../../layouts/AuthLayout";

const SignInPage: NextPage = () => {
  return (
    <AuthLayout>
      <SignIn routing="path" path="/sign-in" />
    </AuthLayout>
  );
};

export default SignInPage;
