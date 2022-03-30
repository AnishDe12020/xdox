import { NextPage } from "next";
import { SignUp } from "@clerk/nextjs";
import AuthLayout from "../../layouts/AuthLayout";
import { NextSeo } from "next-seo";

const SignUpPage: NextPage = () => {
  return (
    <AuthLayout>
      <NextSeo title="XdoX | Sign Up" />
      <SignUp routing="path" path="/sign-up" />
    </AuthLayout>
  );
};

export default SignUpPage;
