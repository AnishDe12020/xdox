import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { GET_USER_DATA } from "../graphql/queries";

const UserPage: NextPage = () => {
  const router = useRouter();
  const username = (router.query.username as string)
    .replace("@", "")
    .toLowerCase();

  let {
    data: userData,
    error: userDataError,
    loading: userDataLoading,
    previousData: userPreviousData,
  } = useQuery(GET_USER_DATA, {
    variables: {
      username,
    },
  });

  if (userDataLoading) {
    userData = userPreviousData;
  }

  if (userDataError) {
    console.error(userDataError);
    toast.error("Something went wrong!");
  }

  console.log(userData);

  return <h1>User Profile</h1>;
};

export default UserPage;
