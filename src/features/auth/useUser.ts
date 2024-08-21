import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/auth.service";

export const useUser = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  let isAuthenticated = false;

  if (user) {
    isAuthenticated = user.role === "authenticated";
  }

  return { user, isLoading, isAuthenticated, error };
};
