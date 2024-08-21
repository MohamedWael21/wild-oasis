import { useMutation } from "@tanstack/react-query";
import { login as loginService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (credential: LoginCredential) => loginService(credential),
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Email or password are incorrect");
    },
  });

  return { login, isLoading };
}
