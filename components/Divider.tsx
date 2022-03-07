import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";

interface IDividierProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Divider = ({ children, ...otherProps }: IDividierProps): JSX.Element => {
  return (
    <div
      className={classNames(
        "align-center flex w-96 items-center whitespace-nowrap my-4",
        "before:border-secondary before:border-b-2 before:top-1/2 before:relative before:w-1/2 before:inline-block",
        "after:border-secondary after:border-b-2 after:top-1/2 after:relative after:w-1/2 after:inline-block"
      )}
      {...otherProps}
    >
      {children && <span className="mx-4">{children}</span>}
    </div>
  );
};

export default Divider;
