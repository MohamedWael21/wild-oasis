import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

type FormValues = Omit<CabinPayload, "image"> & {
  image: FileList | string | null;
};

interface CreateCabinFormProps {
  cabinToEdit?: CabinPayload;
  onCloseModal?: () => void;
}

function CreateCabinForm({
  cabinToEdit = {},
  onCloseModal,
}: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditForm = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormValues>({
      defaultValues: isEditForm ? editValues : { discount: 0 },
    });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, updateCabin } = useUpdateCabin();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.image) {
      const image =
        typeof data.image === "string" ? data.image : data?.image[0];
      const cabinData = { ...data, image: image };
      if (isEditForm) {
        updateCabin(
          { updateCabin: cabinData, id: editId! },
          {
            onSuccess: () => {
              onCloseModal?.();
            },
          }
        );
      } else {
        createCabin(cabinData, {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        });
      }
    }
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name *" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>
      <FormRow label="Maximum capacity *" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>

      <FormRow label="Regular price *" error={errors.regularPrice?.message}>
        <Input
          type="text"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular price Can't be less than 1",
            },
            validate: (value) => {
              return !isNaN(value!) || "Invalid Price";
            },
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>

      <FormRow label="Discount *" error={errors.discount?.message}>
        <Input
          type="text"
          id="discount"
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              const regularPrice = getValues().regularPrice!;
              const discount = value!;
              if (isNaN(discount) || isNaN(regularPrice)) {
                return "Invalid Discount";
              }
              return (
                discount < regularPrice ||
                "Discount should be less than regular price"
              );
            },
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>

      <FormRow label="Description *" error={errors.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>

      <FormRow label="Cabin photo *" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: {
              value: !isEditForm,
              message: "This field is required",
            },
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {isEditForm ? "Edit" : "Add"} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
