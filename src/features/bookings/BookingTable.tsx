import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import BookingRow from "./BookingRow";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";

function BookingTable() {
  const { isLoading, bookings } = useBookings();

  if (isLoading || !bookings) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body>
          {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking as Booking} />
          ))}
        </Table.Body>
      </Table>
    </Menus>
  );
}

export default BookingTable;
