import { ReactNode } from "react";

interface ITagProps {
  icon?: ReactNode;
  children: ReactNode;
}

const Tag = ({ icon, children }: ITagProps): JSX.Element => {
  return (
    <span className="inline-flex w-fit items-center rounded-md bg-accent bg-opacity-20 px-3 py-1 text-xs font-bold uppercase text-accent">
      {icon}
      {children}
    </span>
  );
};

export default Tag;
