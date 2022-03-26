import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import UserPopover from "./UserPopover";

const Header = (): JSX.Element => {
  return (
    <nav className="flex justify-end px-8 py-6 md:px-16 lg:px-24">
      <SignedIn>
        <UserPopover />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in" passHref>
          <a className="px-4 py-2 transition duration-200 hover:opacity-60">
            Sign In
          </a>
        </Link>
        <Link href="/sign-up" passHref>
          <a className="rounded-lg bg-blue-600 px-4 py-2 transition duration-200 hover:opacity-60">
            Sign Up
          </a>
        </Link>
      </SignedOut>
    </nav>
  );
};

export default Header;
