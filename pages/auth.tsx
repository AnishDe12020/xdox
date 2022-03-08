import { NextPage } from "next";
import { SignedIn, SignedOut, SignUp } from "@clerk/nextjs";
import SignOut from "../components/SignOut";

const AuthPage: NextPage = () => {
  // const user = useUser();

  // console.log(user);

  return (
    <div className="flex justify-center items-center mt-64 flex-col">
      <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
        Authentication
      </h1>
      <SignedOut>
        <SignUp />
      </SignedOut>
      <SignedIn>
        <SignOut />
      </SignedIn>
    </div>
  );
};

export default AuthPage;
