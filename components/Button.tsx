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
        "rounded-lg bg-white px-3 py-2 text-black transition duration-200 hover:opacity-60",
        className
      )}
      {...otherProps}
    >
      {loading ? (
        <Spinner className="text-gray-900" />
      ) : (
        <div className="relative inset-0 z-10 inline-flex">{children}</div>
      )}
    </button>
  );
};

export default Button;
