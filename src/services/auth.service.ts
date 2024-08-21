import supabase, { supabaseUrl } from "./supabase";

export async function login(credential: LoginCredential) {
  const { error, data } = await supabase.auth.signInWithPassword(credential);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const session = await supabase.auth.getSession();

  if (!session) return null;

  const { data: user, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function signup({ email, fullName, password }: SignupCredential) {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUserPassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUserData({ avatar, fullName }: UserData) {
  const { data, error } = await supabase.auth.updateUser({
    data: { fullName },
  });

  if (error) throw new Error(error.message);

  if (!avatar) return;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError, data: storageData } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: UpdatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/${storageData.fullPath}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return UpdatedUser;
}
