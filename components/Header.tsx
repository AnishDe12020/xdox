import { UserButton } from "@clerk/nextjs";

const Header = (): JSX.Element => {
  return (
    <nav className="mx-8 flex justify-end md:mx-16 lg:mx-24">
      <UserButton />
      <style global jsx>
        {`
          .cl-accounts-manager-button:hover {
            background-color: #000000 !important;
            color: #ffffff !important;
          }
        `}
      </style>
    </nav>
  );
};

export default Header;
