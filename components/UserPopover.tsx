import { useUser } from "@clerk/nextjs";
import { Transition } from "@headlessui/react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Fragment, useState } from "react";
import Button from "./Button";

const UserPopover = (): JSX.Element => {
  const user = useUser();
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
            className="my-8 flex flex-col items-center justify-center rounded-lg bg-secondary p-4 shadow-lg"
            forceMount
          >
            <img
              src={user.profileImageUrl}
              className="h-16 w-16 rounded-full"
              alt={user.username as string}
            />
            <div className="text-center text-accent">{user.username}</div>
          </PopoverPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </PopoverPrimitive.Root>
  );
};

export default UserPopover;
