import { NextPage } from "next";
import { SignIn } from "@clerk/nextjs";
import AuthLayout from "../../layouts/AuthLayout";
import { NextSeo } from "next-seo";

const SignInPage: NextPage = () => {
  return (
    <AuthLayout>
      <NextSeo title="XdoX | Sign In" />
      <SignIn routing="path" path="/sign-in" />
    </AuthLayout>
  );
};

export default SignInPage;
