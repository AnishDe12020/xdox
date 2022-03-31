import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "./Icons";
import GitHubLogo from "./Icons/GitHub";
import UserPopover from "./UserPopover";

const Header = (): JSX.Element => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 md:px-16 lg:px-24">
      <div className="flex flex-row items-center space-x-4">
        <Link href="/" passHref>
          <a
            className="transition duration-200 hover:opacity-60"
            aria-label="Home"
          >
            <Logo
              className="h-8 w-8 md:h-12 md:w-12 lg:ml-4 lg:h-16 lg:w-16"
              aria-label="Home"
            />
          </a>
        </Link>
        <Link href="/dashboard" passHref>
          <a className="md:text-md text-sm transition duration-200 hover:opacity-60">
            Dashboard
          </a>
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <a
          className="mr-2 p-2 transition duration-200 hover:opacity-60 md:mr-2"
          href="https://github.com/AnishDe12020/xdox"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogo className="h-4 w-4 md:h-6 md:w-6" />
        </a>
        <SignedIn>
          <UserPopover />
        </SignedIn>
        <SignedOut>
          <div className="flex flex-row items-center space-x-2 md:space-x-4">
            <Link href="/sign-in" passHref>
              <a className="md:text-md px-2 py-2 text-sm transition duration-200 hover:opacity-60 md:px-4">
                Sign In
              </a>
            </Link>
            <Link href="/sign-up" passHref>
              <a className="md:text-md h-fit rounded-lg bg-blue-600 px-2 py-2 text-sm transition duration-200 hover:opacity-60 md:px-4">
                Sign Up
              </a>
            </Link>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;
