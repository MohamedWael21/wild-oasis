import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUserData } from "../../services/auth.service";
import { toast } from "react-toastify";

const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUserData } = useMutation({
    mutationFn: updateCurrentUserData,
    onSuccess: () => {
      toast.success("Account has been updated");
      queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
    },
    onError: () => {
      toast.error("update failed");
    },
  });

  return { isUpdating, updateUserData };
};
export default useUpdateUserData;
