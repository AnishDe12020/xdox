import { NextPage } from "next";
import { SignIn } from "@clerk/nextjs";

const SignInPage: NextPage = () => {
  return (
    <div className="flex justify-center items-center mt-64 flex-col">
      <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Sign In</h1>
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
};

export default SignInPage;
