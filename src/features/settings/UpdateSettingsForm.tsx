import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();

  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestsPerBooking,
    minBookingLength,
  } = settings || {};

  const { isUpdating, updateSettings } = useUpdateSettings();

  const handleSettingChange = (
    e: React.FocusEvent<HTMLInputElement>,
    field: SettingFieldsName
  ) => {
    const value = e.target.value;
    if (!value) return;
    updateSettings({ [field]: value });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength || 0}
          onBlur={(e) => handleSettingChange(e, "minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength || 0}
          onBlur={(e) => handleSettingChange(e, "maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking || 0}
          onBlur={(e) => handleSettingChange(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice || 0}
          onBlur={(e) => handleSettingChange(e, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
