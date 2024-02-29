'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { publishGrantAction } from "@/data/user/grant-projects";
import { useToastMutation } from "@/hooks/useToastMutation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SubmitDraftGrantDialog({ id }: { id: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { mutate: publishGrant, isLoading: isPublishingGrant } =
        useToastMutation(
            async (id: string) => {
                publishGrantAction(id);
            },
            {
                loadingMessage: "Publishing grant pplication..",
                successMessage: "New grant application created!",
                errorMessage: "Failed to create grant application",
                onSuccess: () => {
                    router.refresh();
                    setIsOpen(false);
                },
            }
        );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-32">
                    Submit Proposal
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Are you sure you want to submit this proposal?
                </DialogHeader>
                <div className="flex gap-2">
                    <Button className="w-full" variant="outline" onClick={() => {
                        setIsOpen(false);
                    }}>
                        Cancel
                    </Button>
                    <Button className="w-full" disabled={isPublishingGrant} onClick={() => { publishGrant(id) }}>
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}