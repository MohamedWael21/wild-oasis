import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

interface StatsProps {
  bookings: {
    created_at: string;
    totalPrice: number | null;
    extraPrice: number | null;
  }[];
  confirmStays: Booking[];
  numDays: number;
  cabinsCount: number;
}

const Stats = ({
  bookings,
  confirmStays,
  numDays,
  cabinsCount,
}: StatsProps) => {
  const numBooking = bookings.length;

  const sales = bookings.reduce(
    (acc, booking) => acc + (booking.totalPrice as number),
    0
  );

  const checkIns = confirmStays.length;

  const occupation =
    confirmStays.reduce(
      (acc, booking) => acc + (booking.numNights as number),
      0
    ) /
    (numDays * cabinsCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBooking}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
};
export default Stats;
