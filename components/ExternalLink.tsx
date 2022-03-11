import { ExternalLinkIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { ReactNode } from "react";

interface IExternalLinkProps {
  href: string;
  className: string;
  children: ReactNode;
}

const ExternalLink = ({
  href,
  children,
  className,
}: IExternalLinkProps): JSX.Element => {
  return (
    <a
      href={href}
      className={classNames(
        "flex cursor-pointer items-center justify-center space-x-2 rounded-lg bg-gray-700 px-2 py-2 transition duration-200 hover:opacity-60",
        className
      )}
      target="_blank"
      rel="noreferrer"
    >
      <span>{children}</span>
      <ExternalLinkIcon />
    </a>
  );
};
export default ExternalLink;
