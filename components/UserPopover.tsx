import { useUser, useClerk } from "@clerk/nextjs";
import { Transition } from "@headlessui/react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Link from "next/link";
import { Fragment, useState } from "react";
import Button from "./Button";

const UserPopover = (): JSX.Element => {
  const user = useUser();
  const { signOut } = useClerk();
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <PopoverPrimitive.Root onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button className="bg-transparent">
          <img
            src={user.profileImageUrl}
            className="h-8 w-8 rounded-full"
            alt={user.username as string}
          />
        </Button>
      </PopoverPrimitive.Trigger>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-80 scale-80 -translate-y-4"
          enterTo="opacity-100 scale-100 -translate-y-0"
          leave="ease-in duration-100"
          leaveFrom="opacity-100 scale-100 -translate-y-0"
          leaveTo="opacity-80 scale-80 -translate-y-4"
        >
          <PopoverPrimitive.Content
            className="my-8 flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-gray-700 bg-primary p-4 shadow-md shadow-secondary"
            forceMount
          >
            <img
              src={user.profileImageUrl}
              className="h-16 w-16 rounded-full"
              alt={user.username as string}
            />

            <div className="text-center text-lg font-bold text-accent">
              {user.username}
            </div>
            <Link href="/proifle" passHref>
              <a className="rounded-lg bg-secondary px-4 py-2 transition duration-200 hover:opacity-60">
                Edit Profile
              </a>
            </Link>
            <Button
              className="w-full bg-red-600 text-accent"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </PopoverPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </PopoverPrimitive.Root>
  );
};

export default UserPopover;
