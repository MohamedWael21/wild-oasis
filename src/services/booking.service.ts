import supabase from "./supabase";

export async function getBookings({
  filter,
  sortBy,
}: QueryOptions<"bookings">) {
  let query = supabase.from("bookings").select("*, cabins(*), guests(*)");

  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.value === "asc" });
  }

  const { data: bookings, error } = await query;

  if (error) {
    throw new Error("Bookings couldn't be loaded");
  }
  return bookings;
}
