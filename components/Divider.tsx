import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";

interface IDividierProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Divider = ({ children, ...otherProps }: IDividierProps): JSX.Element => {
  return (
    <div
      className={classNames(
        "align-center my-4 flex w-96 items-center whitespace-nowrap",
        "before:relative before:top-1/2 before:inline-block before:w-1/2 before:border-b-2 before:border-secondary",
        "after:relative after:top-1/2 after:inline-block after:w-1/2 after:border-b-2 after:border-secondary"
      )}
      {...otherProps}
    >
      {children && <span className="mx-4">{children}</span>}
    </div>
  );
};

export default Divider;
