import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { Fragment, ReactNode, useEffect, useState } from "react";
import Button from "./Button";

interface IModalProps {
  title?: string;
  children: ReactNode;
  closable?: boolean;
  trigger: string | ReactNode;
}

const Modal = ({ title, children, closable, trigger }: IModalProps) => {
  // useEffect(() => {
  //   window.dispatchEvent(new Event("resize"));
  // }, []);

  const [isOpen, toggleOpen] = useState<boolean>(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={toggleOpen}>
      <DialogPrimitive.Trigger asChild>
        {typeof trigger === "string" ? <Button>{trigger}</Button> : trigger}
      </DialogPrimitive.Trigger>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out durtation-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in durtation-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-primary/40"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out durtation-1000"
          enterFrom="opacity-0 scale-90"
          enterTo="opacity-100 scale-100"
          leave="ease-in durtation-1000"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-80"
        >
          <DialogPrimitive.Content
            forceMount
            className={classNames(
              "fixed z-50 w-[90vw] max-w-md rounded-lg p-4 md:w-full",
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "bg-primary focus:outline-none focus-visible:ring-8 focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
            )}
          >
            <DialogPrimitive.Title className="text-lg font-semibold text-accent">
              {title}
            </DialogPrimitive.Title>
            {children}
            {closable && (
              <DialogPrimitive.Close
                className={classNames(
                  "absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
                )}
              >
                <Cross1Icon className="h-4 w-4 text-gray-500 hover:opacity-60" />
              </DialogPrimitive.Close>
            )}
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Root>
  );
};

export default Modal;
