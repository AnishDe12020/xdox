import { useQuery } from "@apollo/client";
import { GlobeIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import GitHubLogo from "../components/Icons/GitHub";
import TwitterLogo from "../components/Icons/Twitter";
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
    <div className="mx-8 flex flex-col items-center space-y-4 md:mx-16 lg:mx-32">
      {userData?.users ? (
        <>
          <img
            src={userData.users[0].profile_image_url}
            className="h-32 w-32 rounded-full"
            alt={userData.users[0].username}
          />
          <p className="text-xl font-semibold md:text-2xl lg:text-3xl">
            {userData.users[0].first_name} {userData.users[0].last_name}
          </p>
          <p className="text-md md:text-lg lg:text-xl">
            @{userData.users[0].username}
          </p>
          <p>{userData.users[0].bio}</p>
          <div className="mt-4 flex flex-row space-x-4">
            <a
              href={`https://twitter.com/${userData.users[0].twitter_username}`}
              className="transition duration-200 hover:opacity-60"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterLogo className="h-8 w-8" />
            </a>
            <a
              href={`https://github.com/${userData.users[0].github_username}`}
              className="transition duration-200 hover:opacity-60"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogo className="h-8 w-8" />
            </a>
            <a
              href={userData.users[0].website_url}
              className="transition duration-200 hover:opacity-60"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlobeIcon className="h-8 w-8" />
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="h-32 w-32 animate-pulse rounded-full bg-secondary" />
          <div className="h-8 w-48 animate-pulse rounded-lg bg-secondary" />
          <div className="h-6 w-32 animate-pulse rounded-lg bg-secondary" />
          <div className="h-4 w-64 animate-pulse rounded-lg bg-secondary" />
          <div className="mt-4 flex flex-row space-x-4">
            <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
            <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
            <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
