import { ReactNode } from "react";

interface IAuthLayoutProps {
  title: ReactNode;
  children: ReactNode;
}

const AuthLayout = ({ title, children }: IAuthLayoutProps): JSX.Element => {
  return (
    <div className="flex justify-center items-center mt-64 flex-col">
      <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
