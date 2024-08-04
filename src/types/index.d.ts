import { Tables, TablesInsert, TablesUpdate } from "./supabase";

declare global {
  type NonNullableProperties<T> = {
    [P in keyof T]: NonNullable<T[P]>;
  };

  type Cabin = Tables<"cabins">;
  type Guest = Tables<"guests">;
  type Booking = NonNullableProperties<
    Tables<"bookings"> & {
      cabins: Cabin;
      guests: Guest;
    }
  >;
  type CabinPayload = TablesInsert<"cabins">;
  type CreateEditCabinData = Omit<CabinPayload, "image"> & {
    image: File | string | null;
  };

  type updateSettingPayload = TablesUpdate<"settings">;
  type SettingFieldsName = keyof updateSettingPayload;

  type TableKeys<T> = keyof Tables<T>;

  type QueryOption<T> = {
    field: TableKeys<T>;
    value: string;
  } | null;
  type QueryOptions<T> = {
    filter: QueryOption<T> | null;
    sortBy: QueryOption<T> | null;
  };
}
