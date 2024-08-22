import Button from "../../ui/Button";
import useCheckOut from "./useCheckOut";

interface CheckoutButtonProps {
  bookingId: number;
}

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut({ bookingId })}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
