import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinService } from "../../services/cabin.service";
import { toast } from "react-toastify";

const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id: number) => deleteCabinService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin has been deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteCabin };
};

export default useDeleteCabin;
