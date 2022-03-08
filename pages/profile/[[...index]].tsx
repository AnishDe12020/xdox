import { UserProfile } from "@clerk/nextjs";
import { NextPage } from "next";

const ProfilePage: NextPage = () => {
  return (
    <>
      <UserProfile path="/profile" routing="path" />
      <style global jsx>
        {`
          .cl-active {
            background-color: #333333 !important;
            color: #fff !important;
          }

          .cl-navbar-link {
            border-left-color: #333333 !important;
          }

          .cl-navbar-link:hover {
            transition: opacity 0.2s;
            opacity: 0.6;
          }

          .cl-list-item:hover {
            background-color: #000000 !important;
            color: #fff !important;
          }
        `}
      </style>
    </>
  );
};

export default ProfilePage;
