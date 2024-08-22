import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/booking.service";

const useStaysBookings = () => {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.has("last")
    ? Number(searchParams.get("last"))
    : 7;

  const date = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: staysBookings } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(date),
  });

  const confirmStays = staysBookings?.filter(
    (booking) =>
      booking.status === "checked-in" || booking.status === "checked-out"
  );

  return { isLoading, staysBookings, confirmStays };
};
export default useStaysBookings;
