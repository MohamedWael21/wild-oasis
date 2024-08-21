import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Logout Failed. Please try again.");
    },
  });

  return { isLoading, logout };
};
export default useLogout;
