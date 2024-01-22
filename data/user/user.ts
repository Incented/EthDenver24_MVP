"use server";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { SupabaseFileUploadOptions, Table } from "@/types";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import urlJoin from "url-join";

export async function getIsAppAdmin(authUser: User): Promise<boolean> {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: isUserAppAdmin, error } = await supabaseClient
    .rpc("check_if_user_is_app_admin", {
      user_id: authUser.id,
    })
    .single();
  if (error) {
    throw error;
  }

  return isUserAppAdmin;
}

export const getUserProfile = async (
  userId: string
): Promise<Table<"user_profiles">> => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserPrivateInfo = async (
  userId: string
): Promise<Table<"user_private_info">> => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("user_private_info")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserFullName = async (userId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("full_name")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data.full_name;
};

export const getUserAvatarUrl = async (userId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data.avatar_url;
};

export const getUserPendingInvitationsByEmail = async (userEmail: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("organization_join_invitations")
    .select(
      "*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*), organization:organizations(*)"
    )
    .ilike("invitee_user_email", `%${userEmail}%`)
    .eq("status", "active");

  if (error) {
    throw error;
  }

  return data || [];
};

export const getUserPendingInvitationsById = async (userId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("organization_join_invitations")
    .select(
      "*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*), organization:organizations(*)"
    )
    .eq("invitee_user_id", userId)
    .eq("status", "active");

  if (error) {
    throw error;
  }

  return data || [];
};

export const uploadPublicUserAvatar = async (
  formData: FormData,
  fileName: string,
  fileOptions?: SupabaseFileUploadOptions | undefined
): Promise<string> => {
  "use server";
  const file = formData.get("file");
  console.log("in upload Public User avatarfile", file);
  if (!file) {
    throw new Error("File is empty");
  }
  const slugifiedFilename = slugify(fileName, {
    lower: true,
    strict: true,
    replacement: "-",
  });
  console.log("slugifiedFilename", slugifiedFilename);
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();
  const userId = user.id;
  const userImagesPath = `${userId}/images/${slugifiedFilename}`;
  console.log("userImagesPath", userImagesPath);

  const { data, error } = await supabaseClient.storage
    .from("public-user-assets")
    .upload(userImagesPath, file, fileOptions);
  console.log("public-user-assets data", data);

  if (error) {
    throw new Error(error.message);
  }

  const { path } = data;
  console.log("path", path);

  const filePath = path.split(",")[0];

  if (!filePath) {
    throw new Error("File path is empty");
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Supabase URL is empty");
  }

  const supabaseFileUrl = urlJoin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "/storage/v1/object/public/public-user-assets",
    filePath
  );

  return supabaseFileUrl;
};

export const updateUserProfileNameAndAvatar = async ({
  fullName,
  avatarUrl,
}: {
  fullName?: string;
  avatarUrl?: string;
}) => {
  "use server";
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();
  console.log("updated avatar url", avatarUrl);
  const { data, error } = await supabaseClient
    .from("user_profiles")
    .update({
      full_name: fullName,
      avatar_url: avatarUrl,
    })
    .eq("id", user.id)
    .single();

  if (error) {
    throw error;
  }

  revalidatePath("/");

  return data;
};

export const updateUserPrivateInfo = async ({
  firstName,
  lastName,
  userName,
}: {
  firstName?: string;
  lastName?: string;
  userName?: string;
}) => {
  "use server";
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();
  const { data, error } = await supabaseClient
    .from("user_private_info")
    .update({
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
    })
    .eq("id", user.id)
    .single();

  if (error) {
    throw error;
  }

  revalidatePath("/");

  return data;
};
