import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSetting as updateSettingService } from "../../services/setting.service";

const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: (updatedSettings: updateSettingPayload) =>
      updateSettingService(updatedSettings),
    onSuccess: () => {
      toast.success("Settings edited successfully ");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { updateSettings, isUpdating };
};
export default useUpdateSettings;
