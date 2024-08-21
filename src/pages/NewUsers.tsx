import SignupForm from "../features/auth/SignupForm";
import Heading from "../ui/Heading";

const NewUsers = () => {
  return (
    <>
      <Heading as="h1">Create new user</Heading>
      <SignupForm />
    </>
  );
};
export default NewUsers;
