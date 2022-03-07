import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

const Button = ({
  children,
  className,
  loading,
  ...otherProps
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={classNames(
        "px-3 py-2 bg-white transition duration-200 hover:opacity-60 rounded-lg text-black",
        className
      )}
      {...otherProps}
    >
      {loading ? (
        <Spinner className="text-gray-900" />
      ) : (
        <div className="relative inset-0 inline-flex z-10">{children}</div>
      )}
    </button>
  );
};

export default Button;
