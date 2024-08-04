import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/booking.service";
import { useSearchParams } from "react-router-dom";

const useBookings = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const filter: QueryOption<"bookings"> =
    filterValue && filterValue !== "all"
      ? { field: "status", value: filterValue }
      : null;

  const sortQuery = searchParams.get("sort-by");

  let sortBy: QueryOption<"bookings"> = null;

  if (sortQuery) {
    const field = sortQuery.split("-")[0] as TableKeys<"bookings">;
    const value = sortQuery.split("-")[1];
    sortBy = { field, value };
  }

  const bookingsOptions: QueryOptions<"bookings"> = { filter, sortBy };

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings(bookingsOptions),
  });

  return { bookings, isLoading };
};

export default useBookings;
