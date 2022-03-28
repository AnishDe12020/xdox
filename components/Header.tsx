import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "./Icons";
import UserPopover from "./UserPopover";

const Header = (): JSX.Element => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 md:px-16 lg:px-24">
      <div className="flex flex-row items-center space-x-4">
        <Link href="/" passHref>
          <a className="transition duration-200 hover:opacity-60">
            <Logo className="h-8 w-8 md:h-12 md:w-12 lg:ml-4 lg:h-16 lg:w-16" />
          </a>
        </Link>
        <Link href="/dashboard" passHref>
          <a className="md:text-md text-sm transition duration-200 hover:opacity-60">
            Dashboard
          </a>
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <SignedIn>
          <UserPopover />
        </SignedIn>
        <SignedOut>
          <div className="flex flex-row items-center space-x-4">
            <Link href="/sign-in" passHref>
              <a className="md:text-md px-4 py-2 text-sm transition duration-200 hover:opacity-60">
                Sign In
              </a>
            </Link>
            <Link href="/sign-up" passHref>
              <a className="md:text-md h-fit rounded-lg bg-blue-600 px-4 py-2 text-sm transition duration-200 hover:opacity-60">
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
