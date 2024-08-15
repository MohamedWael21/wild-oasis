import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/booking.service";
import { toast } from "react-toastify";

const useCheckOut = () => {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }: CheckInData) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("There was an error while check in");
    },
  });

  return { checkOut, isCheckingOut };
};

export default useCheckOut;
