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
import { PrimaryUserDetailsSchema } from "./_components/userDetailsSchema";

export function AccountSettings({
  userPrivateInfo,
  userProfile,
}: {
  userPrivateInfo: Table<"user_private_info">;
  userProfile: Table<"user_profiles">;
}) {
  const router = useRouter();
  const { mutate, isLoading: isUpdatingUserProfileNameAndAvatar } =
    useToastMutation(
      async (primaryUserDetails: PrimaryUserDetailsSchema) => {
        const { firstName, lastName, avatarUrl } = primaryUserDetails;
        return await updateUserProfileNameAndAvatar({
          fullName: `${firstName} ${lastName}`,
          firstName,
          lastName,
          avatarUrl,
        });
      },
      {
        loadingMessage: "Updating profile info...",
        errorMessage: "Failed to update profile info",
        successMessage: "Profile updated!",
        onSuccess: () => {
          router.refresh();
        },
      }
    );

  const { mutate: updateUserName, isLoading } = useToastMutation(
    async (userName: string) => {
      return await updateUserPrivateInfo({
        userName: userName,
      });
    },
    {
      loadingMessage: "Updating user name...",
      errorMessage: "Failed to update user name",
      successMessage: "User name updated!",
      onSuccess: () => {
        router.refresh();
      },
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

  console.log("AccountSettings", userPrivateInfo, userProfile);
  return (
    <UpdateUserForm
      userPrivateInfo={userPrivateInfo}
      userProfile={userProfile}
      onUserNameUpload={(userName: string) => {
        updateUserName(userName);
      }}
      onFileUpload={(file: File) => {
        console.log("onFileUpload file", file);
        upload(file);
      }}
      profileAvatarUrl={avatarUrl ?? undefined}
      isNewAvatarImageLoading={isNewAvatarImageLoading}
      setIsNewAvatarImageLoading={setIsNewAvatarImageLoading}
      isUploading={isUploading}
      isLoading={isLoading ?? isUploading ?? isUpdatingUserProfileNameAndAvatar}
      onSubmit={(firstName: string, lastName: string) => {
        mutate({
          firstName,
          lastName,
          avatarUrl,
        });
      }}
    />
  );
}
