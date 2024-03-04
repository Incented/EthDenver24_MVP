"use client";

import { Button } from "@/components/ui/button";
import { useToastMutation } from "@/hooks/useToastMutation";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookmarkComponent({
    id,
    parentId,
    isBookmarked,
    addBookmark,
    removeBookmark,
    className,
}: {
    id: string;
    parentId: string;
    isBookmarked: boolean;
    addBookmark: (args: { id: string; organizationId: string }) => Promise<any>;
    removeBookmark: (args: { id: string; organizationId: string }) => Promise<any>;
    className?: string;
}) {
    const [bookmarked, setBookmarked] = useState<boolean | undefined>(
        isBookmarked
    );
    const router = useRouter();
    const { mutate, isLoading } = useToastMutation(
        async ({ id, parentId }: { id: string; parentId: string }) => {
            return await addBookmark({
                id,
                organizationId: parentId,
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
        async ({ id, parentId }: { id: string; parentId: string }) => {
            return await removeBookmark({
                id,
                organizationId: parentId,
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
            variant="ghost"
            className={cn(
                "flex items-center px-2 justify-center ml-auto rounded-full group",
                bookmarked ? "bg-primary" : "hover:bg-primary bg-primary-foreground",
                className
            )}
            onClick={() => {
                if (bookmarked) {
                    removeBookmarkMutation.mutate({ id, parentId });
                } else {
                    mutate({ id, parentId });
                }
            }}
            disabled={isLoading || removeBookmarkMutation.isLoading}
        >
            <Bookmark
                size={20}
                className={cn("", bookmarked ? "text-primary-foreground group-hover:text-primary" : "text-primary group-hover:text-primary-foreground")}
            />
        </Button>
    );
}
