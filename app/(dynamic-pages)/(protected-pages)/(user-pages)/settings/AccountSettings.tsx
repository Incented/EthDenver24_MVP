"use client";

import {
  updateUserPrivateInfo,
  updateUserProfileNameAndAvatar,
  uploadPublicUserAvatar,
} from "@/data/user/user";
import { useToastMutation } from "@/hooks/useToastMutation";
import UpdateUserForm from "./_components/UpdateUserForm";
import { Table } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AccountSettings({
  userPrivateInfo,
  userProfile,
}: {
  userPrivateInfo: Table<"user_private_info">;
  userProfile: Table<"user_profiles">;
}) {
  const router = useRouter();
  const { mutate, isLoading } = useToastMutation(
    async ({
      firstName,
      lastName,
      userName,
      avatarUrl,
    }: {
      firstName: string | undefined;
      lastName: string | undefined;
      userName: string | undefined;
      avatarUrl?: string;
    }) => {
      await updateUserProfileNameAndAvatar({
        fullName: `${firstName} ${lastName}`,
        avatarUrl,
      });
      return await updateUserPrivateInfo({
        firstName,
        lastName,
        userName,
      });
    },
    {
      loadingMessage: "Updating profile info...",
      errorMessage: "Failed to update profile info",
      successMessage: "Profile updated!",
    }
  );

  const [isNewAvatarImageLoading, setIsNewAvatarImageLoading] =
    useState<boolean>(false);

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    userProfile.avatar_url ?? undefined
  );

  const { mutate: upload, isLoading: isUploading } = useToastMutation(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      console.log(
        "before upload Public User Avatar",
        file.name,
        file,
        formData
      );
      return await uploadPublicUserAvatar(formData, file.name, {
        upsert: true,
      });
    },
    {
      loadingMessage: "Uploading avatar...",
      errorMessage: "Failed to upload avatar",
      successMessage: "Avatar uploaded!",
      onSuccess: (newAvatarURL) => {
        router.refresh();
        setAvatarUrl(newAvatarURL);
        setIsNewAvatarImageLoading(true);
      },
      onError: (error) => {
        console.log(String(error));
      },
    }
  );
  return (
    <UpdateUserForm
      userPrivateInfo={userPrivateInfo}
      onFileUpload={(file: File) => {
        console.log("onFileUpload file", file);
        upload(file);
      }}
      profileAvatarUrl={avatarUrl ?? undefined}
      isNewAvatarImageLoading={isNewAvatarImageLoading}
      setIsNewAvatarImageLoading={setIsNewAvatarImageLoading}
      isUploading={isUploading}
      isLoading={isLoading ?? isUploading}
      onSubmit={(
        firstName: string | undefined,
        lastName: string | undefined,
        userName: string | undefined
      ) => {
        mutate({
          firstName,
          lastName,
          userName,
          avatarUrl,
        });
      }}
    />
  );
}
