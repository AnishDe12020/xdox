import { NextPage } from "next";
import { SignUp } from "@clerk/nextjs";

const SignUpPage: NextPage = () => {
  return (
    <div className="flex justify-center items-center mt-64 flex-col">
      <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Sign Up</h1>
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
};

export default SignUpPage;
