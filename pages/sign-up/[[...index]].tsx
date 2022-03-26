import { NextPage } from "next";
import { SignUp } from "@clerk/nextjs";
import AuthLayout from "../../layouts/AuthLayout";

const SignUpPage: NextPage = () => {
  return (
    <AuthLayout>
      <SignUp routing="path" path="/sign-up" />
    </AuthLayout>
  );
};

export default SignUpPage;
