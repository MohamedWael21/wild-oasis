import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/booking.service";

const useBooking = () => {
  const { bookingId } = useParams();

  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,
  });

  return { booking, error, isLoading };
};

export default useBooking;
