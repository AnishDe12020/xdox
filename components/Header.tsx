import { UserButton } from "@clerk/nextjs";

const Header = (): JSX.Element => {
  return (
    <nav className="mx-8 flex justify-end md:mx-16 lg:mx-24">
      <UserButton />
      <style global jsx>
        {`
          .cl-accounts-manager-button:hover {
            background-color: #111827 !important;
          }

          .cl-component {
            box-shadow: 0px 12px 48px 4px rgba(12, 6, 28, 0.8) !important;
          }
        `}
      </style>
    </nav>
  );
};

export default Header;
