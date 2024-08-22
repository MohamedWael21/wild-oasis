import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/booking.service";

const useRecentBookings = () => {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.has("last")
    ? Number(searchParams.get("last"))
    : 7;

  const date = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: recentBookings } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(date),
  });

  return { isLoading, recentBookings, numDays };
};
export default useRecentBookings;
