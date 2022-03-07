import Button from "./Button";
import { useClerk, useUser, withUser } from "@clerk/nextjs";

const SignOut = (): JSX.Element => {
  const { signOut } = useClerk();

  const user = useUser();
  console.log(user);
  return (
    <>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </>
  );
};

export default withUser(SignOut);
