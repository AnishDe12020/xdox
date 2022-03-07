import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { NextPage } from "next";

const SSOCallbackPage: NextPage = () => {
  return <AuthenticateWithRedirectCallback />;
};

export default SSOCallbackPage;
