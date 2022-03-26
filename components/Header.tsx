import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import UserPopover from "./UserPopover";

const Header = (): JSX.Element => {
  return (
    <nav className="mx-8 flex justify-end md:mx-16 lg:mx-24">
      <SignedIn>
        <UserPopover />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-up" passHref>
          <a className="rounded-lg bg-blue-600 px-4 py-2 transition duration-200 hover:opacity-60">
            Sign Up
          </a>
        </Link>
        <Link href="/sign-in" passHref>
          <a className="px-4 py-2 transition duration-200 hover:opacity-60">
            Sign In
          </a>
        </Link>
      </SignedOut>
    </nav>
  );
};

export default Header;
