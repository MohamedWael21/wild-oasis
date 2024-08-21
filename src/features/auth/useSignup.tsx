import { useMutation } from "@tanstack/react-query";
import { signup as signupService } from "../../services/auth.service";
import { toast } from "react-toastify";

const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (credential: SignupCredential) => signupService(credential),
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
    onError: () => {
      toast.error("Can't signup user. Please try again");
    },
  });

  return { isLoading, signup };
};
export default useSignup;
