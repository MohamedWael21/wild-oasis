import { useMutation } from "@tanstack/react-query";
import { updateCurrentUserPassword } from "../../services/auth.service";
import { toast } from "react-toastify";

const useUpdatePassword = () => {
  const { isLoading: isUpdating, mutate: updatePassword } = useMutation({
    mutationFn: updateCurrentUserPassword,
    onSuccess: () => {
      toast.success("Password has been updated");
    },
    onError: () => {
      toast.error("Failed update password");
    },
  });

  return { isUpdating, updatePassword };
};
export default useUpdatePassword;
