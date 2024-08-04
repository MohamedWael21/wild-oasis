import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createUpdateCabin } from "../../services/cabin.service";

const useUpdateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({
      updateCabin,
      id,
    }: {
      updateCabin: CreateEditCabinData;
      id: number;
    }) => createUpdateCabin(updateCabin, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully ");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { updateCabin, isEditing };
};
export default useUpdateCabin;
