import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createUpdateCabin } from "../../services/cabin.service";

const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { createCabin, isCreating };
};
export default useCreateCabin;
