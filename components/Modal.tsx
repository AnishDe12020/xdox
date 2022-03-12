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
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-gray-800/40"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            className={classNames(
              "fixed z-40 bg-primary shadow-xl shadow-primary",
              "w-[95vw] max-w-md rounded-xl p-8 md:w-full",
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
            )}
          >
            <DialogPrimitive.Title className="mb-4 text-lg font-semibold text-accent">
              {title}
            </DialogPrimitive.Title>
            {children}
            {closable && (
              <DialogPrimitive.Close
                className={classNames(
                  "absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
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
