import { GlobeIcon } from "@radix-ui/react-icons";
import { UserData } from "../types/User";
import GitHubLogo from "./Icons/GitHub";
import TwitterLogo from "./Icons/Twitter";

interface IUserDataProps {
  userData: UserData;
}

const UserDataComponent = ({ userData }: IUserDataProps): JSX.Element => {
  return userData ? (
    <>
      <img
        src={userData.profile_image_url}
        className="h-32 w-32 rounded-full"
        alt={userData.username}
      />
      {userData.first_name && userData.last_name && (
        <p className="text-xl font-semibold md:text-2xl lg:text-3xl">
          {userData.first_name} {userData.last_name}
        </p>
      )}
      {userData.username && (
        <p className="text-md md:text-lg lg:text-xl">@{userData.username}</p>
      )}
      {userData.bio && <p>{userData.bio}</p>}
      <div className="mt-4 flex flex-row space-x-4">
        {userData.twitter_username && (
          <a
            href={`https://twitter.com/${userData.twitter_username}`}
            className="transition duration-200 hover:opacity-60"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterLogo className="h-8 w-8" />
          </a>
        )}
        {userData.github_username && (
          <a
            href={`https://github.com/${userData.github_username}`}
            className="transition duration-200 hover:opacity-60"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogo className="h-8 w-8" />
          </a>
        )}
        {userData.website_url && (
          <a
            href={userData.website_url}
            className="transition duration-200 hover:opacity-60"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlobeIcon className="h-8 w-8" />
          </a>
        )}
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
  );
};

export default UserDataComponent;
