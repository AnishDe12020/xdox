import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import useBreakpoint from "../utils/useBreakpoint";
import Button from "./Button";

import "react-spring-bottom-sheet/dist/style.css";
import { FieldErrors } from "react-hook-form";

interface IModalProps {
  title?: string;
  children: ReactNode;
  closable?: boolean;
  trigger: string | ReactNode;
  onDone?: () => void;
  isSubmitting?: boolean;
  doneText?: string;
  errors?: FieldErrors<any>;
}

const Modal = ({
  title,
  children,
  closable,
  trigger,
  onDone,
  isSubmitting,
  doneText,
  errors,
}: IModalProps) => {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  const isDesktop = useBreakpoint("md");

  const [isOpen, setOpen] = useState(false);

  const handleDone = async () => {
    if (onDone) {
      await onDone();
      if (!errors) {
        setOpen(false);
      } else {
        setOpen(false);
      }
    }
  };

  return isDesktop ? (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setOpen}>
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
              "fixed z-40 bg-primary shadow-md shadow-black",
              "w-[95vw] max-w-md rounded-xl p-8 md:w-full",
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
            )}
          >
            <DialogPrimitive.Title className="mb-4 text-lg font-semibold text-accent">
              {title}
            </DialogPrimitive.Title>
            {children}
            <div className="mt-4 flex items-center justify-end">
              <Button
                onClick={handleDone}
                loading={isSubmitting}
                className="w-24"
              >
                {doneText || "Close"}
              </Button>
            </div>
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
  ) : (
    <>
      {typeof trigger === "string" ? (
        <Button onClick={() => setOpen(!isOpen)}>{trigger}</Button>
      ) : (
        <button onClick={() => setOpen(!isOpen)}>{trigger}</button>
      )}
      <BottomSheet
        open={isOpen}
        onDismiss={() => setOpen(false)}
        defaultSnap={({ snapPoints }) => snapPoints[0]}
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 5,
          maxHeight * 0.4,
        ]}
        header={
          <h1 className="flex items-center justify-center text-xl font-bold text-accent">
            Sticky!
          </h1>
        }
        footer={
          <Button
            onClick={handleDone}
            loading={isSubmitting}
            className="w-full"
          >
            {doneText || "Close"}
          </Button>
        }
      >
        <div className="mx-8 my-2">{children}</div>
      </BottomSheet>
    </>
  );
};

export default Modal;
