import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteBooking as deleteBookingService } from "../../services/booking.service";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id: number) => deleteBookingService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Booking has been deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteBooking };
};

export default useDeleteBooking;
