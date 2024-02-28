"use client";

import { Button } from "@/components/ui/button";
import { addBookmark, removeBookmark } from "@/data/user/organizations";
import { useToastMutation } from "@/hooks/useToastMutation";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookmarkComponent({
  id,
  organizationId,
  isBookmarked,
}: {
  id: string;
  organizationId: string;
  isBookmarked?: boolean;
}) {
  const [bookmarked, setBookmarked] = useState<boolean | undefined>(
    isBookmarked
  );
  const router = useRouter();
  const { mutate, isLoading } = useToastMutation(
    async ({ id, organizationId }: { id: string; organizationId: string }) => {
      return await addBookmark({
        id,
        organizationId,
      });
    },
    {
      loadingMessage: "Creating bookmark...",
      errorMessage: "Failed to create bookmark",
      successMessage: "Added bookmark!",
      onSuccess: () => {
        setBookmarked(true);
      },
    }
  );

  const removeBookmarkMutation = useToastMutation(
    async ({ id, organizationId }: { id: string; organizationId: string }) => {
      return await removeBookmark({
        id,
        organizationId,
      });
    },
    {
      loadingMessage: "Removing bookmark...",
      errorMessage: "Failed to remove bookmark",
      successMessage: "Bookmark removed!",
      onSuccess: () => {
        router.refresh();
        setBookmarked(false);
      },
    }
  );

  return (
    <Button
      variant="outline"
      className={cn(
        "flex items-center px-2 justify-center ml-auto border rounded-full",
        bookmarked ? "bg-primary" : ""
      )}
      onClick={() => {
        if (bookmarked) {
          removeBookmarkMutation.mutate({ id, organizationId });
        } else {
          mutate({ id, organizationId });
        }
      }}
      disabled={isLoading || removeBookmarkMutation.isLoading}
    >
      <Bookmark
        size={20}
        className={cn("", bookmarked ? "text-white" : "text-primary")}
      />
    </Button>
  );
}
