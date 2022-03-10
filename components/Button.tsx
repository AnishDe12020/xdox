import classNames from "classnames";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, loading, ...otherProps }: ButtonProps,
    ref
  ): JSX.Element => {
    return (
      <button
        className={classNames(
          "flex items-center justify-center rounded-lg bg-white px-3 py-2 text-black transition duration-200 hover:opacity-60",
          className
        )}
        {...otherProps}
        ref={ref}
      >
        {loading ? (
          <Spinner className="my-0.5" />
        ) : (
          <div className="relative inset-0 z-10 inline-flex">{children}</div>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
