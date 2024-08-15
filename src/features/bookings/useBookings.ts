import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/booking.service";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../utils/constants";

const useBookings = () => {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

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

  const page = Number(searchParams.get("page") || 1);

  const bookingsOptions: QueryOptions<"bookings"> = { filter, sortBy, page };

  const { data, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings(bookingsOptions),
  });

  const pageCount = Math.ceil((data?.count || 0) / ITEMS_PER_PAGE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ ...bookingsOptions, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ ...bookingsOptions, page: page - 1 }),
    });
  }

  return { bookings: data?.bookings, isLoading, count: data?.count };
};

export default useBookings;
