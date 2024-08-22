import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckIn from "./useCheckIn";
import useSettings from "../settings/useSettings";
import Empty from "../../ui/Empty";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckInBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();

  useEffect(() => {
    if (booking) {
      setConfirmPaid(booking.isPaid || false);
    }
  }, [booking]);

  const { checkIn, isCheckingIn } = useCheckIn();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  if (isLoading || isLoadingSettings || !settings) return <Spinner />;

  if (!booking) return <Empty resourceName="Booking" />;

  const {
    id: bookingId,
    guests,
    isPaid,
    totalPrice,
    numNights,
    numGuests,
    hasBreakfast,
  } = booking;

  const optionalBreakfastPrice =
    Number(numNights) * Number(numGuests) * Number(settings.breakfastPrice);

  function handleCheckIn() {
    if (!confirmPaid) return;

    let checkInData: CheckInData = { bookingId };

    if (addBreakfast) {
      checkInData = {
        ...checkInData,
        breakfast: {
          extraPrice: optionalBreakfastPrice,
          totalPrice: optionalBreakfastPrice + Number(totalPrice),
          hasBreakfast: true,
        },
      };
    }

    checkIn(checkInData);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking as Booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setConfirmPaid(false);
            }}
            id="add-breakfast"
            disabled={isCheckingIn}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          onChange={() => setConfirmPaid((prev) => !prev)}
          checked={confirmPaid}
          id="confirm"
          disabled={(isPaid && !addBreakfast) || isCheckingIn}
        >
          I confirm that {guests?.fullname} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice || 0)
            : `${formatCurrency(
                Number(totalPrice) + Number(optionalBreakfastPrice)
              )} (${formatCurrency(totalPrice || 0)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckIn} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckInBooking;
