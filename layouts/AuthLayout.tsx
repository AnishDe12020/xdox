import { ReactNode } from "react";

interface IAuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps): JSX.Element => {
  return (
    <div className="mt-64 flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
