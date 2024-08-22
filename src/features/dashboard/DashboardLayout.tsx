import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useStaysBookings from "./useStaysBookings";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoading, recentBookings, numDays } = useRecentBookings();

  const { isLoading: isStaysBookingsLoading, confirmStays } =
    useStaysBookings();

  const { cabins, isLoading: isCabinsLoading } = useCabins();

  if (isLoading || isStaysBookingsLoading || isCabinsLoading)
    return <Spinner />;

  if (!confirmStays || !recentBookings || !cabins) return;

  const cabinsCount = cabins.length;

  return (
    <StyledDashboardLayout>
      <Stats
        confirmStays={confirmStays as Booking[]}
        bookings={recentBookings}
        numDays={numDays}
        cabinsCount={cabinsCount}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmStays as Booking[]} />
      <SalesChart bookings={recentBookings as Booking[]} numDays={numDays} />
    </StyledDashboardLayout>
  );
};
export default DashboardLayout;
