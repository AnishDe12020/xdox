import { ReactNode } from "react";

interface IDashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayoutProps): JSX.Element => {
  return <div className="mx-8 mb-16 flex md:mx-16 lg:mx-32">{children}</div>;
};

export default DashboardLayout;
