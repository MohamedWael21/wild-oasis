import UpdatePasswordForm from "../features/auth/UpdatePasswordForm";
import UpdateUserDataForm from "../features/auth/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row type="vertical">
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row type="vertical">
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
