import { ITEMS_PER_PAGE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({
  filter,
  sortBy,
  page,
}: QueryOptions<"bookings">) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)", { count: "exact" });

  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.value === "asc" });
  }

  if (page) {
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    query = query.range(from, to);
  }

  const { data: bookings, error, count } = await query;

  if (error) {
    throw new Error("Bookings couldn't be loaded");
  }
  return { bookings, count };
}

export async function getBooking(id: number) {
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Booking couldn't be loaded");
  }

  return booking;
}

export async function updateBooking(
  id: number,
  updatedBooking: UpdateBookingData
) {
  const { error, data } = await supabase
    .from("bookings")
    .update(updatedBooking)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Booking couldn't be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    throw new Error("Booking couldn't be deleted");
  }
}

export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) throw new Error(error.message);

  return data;
}

export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullname)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) throw new Error(error.message);

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(): Promise<TodayStaysActivities> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullname, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}
