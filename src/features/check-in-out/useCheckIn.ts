import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/booking.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useCheckIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: CheckInData) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: () => {
      toast.error("There was an error while check in");
    },
  });

  return { checkIn, isCheckingIn };
};

export default useCheckIn;
