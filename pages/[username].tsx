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

  return (
    <div className="mx-8 flex flex-col md:mx-16 lg:mx-32">
      {userData?.users ? (
        <div className="flex flex-row space-x-4">
          <img
            src={userData.users[0].profile_image_url}
            className="h-32 w-32 rounded-full"
            alt={userData.users[0].username}
          />
          <div className="flex flex-col space-y-2">
            <p className="text-xl font-semibold md:text-2xl lg:text-3xl">
              {userData.users[0].first_name} {userData.users[0].last_name}
            </p>
            <p className="text-md md:text-lg lg:text-xl">
              @{userData.users[0].username}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-row space-x-4">
          <div className="h-32 w-32 animate-pulse rounded-full bg-secondary" />
          <div className="flex flex-col space-y-2">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-secondary" />
            <div className="h-6 w-32 animate-pulse rounded-lg bg-secondary" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
