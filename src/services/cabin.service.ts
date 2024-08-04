import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins couldn't be laded");
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data } = await supabase
    .from("cabins")
    .select("image")
    .eq("id", id)
    .single();
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin couldn't be deleted");
  }

  if (data && data.image) {
    console.log(data.image);
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .remove([data.image]);
    console.log(storageError);
    if (storageError) {
      console.log(storageError.message);
    }
  }
}

export async function createUpdateCabin(
  cabinData: CreateEditCabinData,
  id?: number
) {
  if (!cabinData.image) return;

  const name =
    typeof cabinData.image === "string"
      ? cabinData.image
      : cabinData.image.name;

  const hasImagePath = name.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${name}`.replace(/\//g, "");

  const imagePath = hasImagePath
    ? name
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const newCabin: CabinPayload = { ...cabinData, image: imagePath };

  let query;

  if (!id) {
    query = supabase.from("cabins").insert([newCabin]);
  } else {
    query = supabase.from("cabins").update(newCabin).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin couldn't be created or updated");
  }

  if (!hasImagePath && typeof cabinData.image !== "string") {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinData.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error("Couldn't upload Image");
    }
  }

  return data;
}
