import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToastMutation } from "@/hooks/useToastMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createOnboardingOrganization } from "@/data/user/organizations";
import { useRouter } from "next/navigation";
import { z } from "zod";

export const createFirstCommunitySchema = z.object({
    communityName: z.string().min(1, "Community name is required"),
});

type CreateFirstCommunityData = z.infer<typeof createFirstCommunitySchema>;

export const CreateFirstCommunityDialog = ({ onSuccess }: { onSuccess: () => void }) => {
    const { register, handleSubmit } = useForm<CreateFirstCommunityData>({
        resolver: zodResolver(createFirstCommunitySchema),
    });
    const router = useRouter();

    const { mutate, isLoading } = useToastMutation(
        async (data: { communityName: string }) => {
            // Call your API to create the community here
            return createOnboardingOrganization({ name: data.communityName })
        },
        {
            loadingMessage: "Creating community...",
            successMessage: "Community created successfully!",
            errorMessage: (errorMessage) => {
                return "Failed to create community " + String(errorMessage);
            },
            onSuccess: (community) => {
                router.push(`/communities/${community.id}`)
                onSuccess();
            }
        }
    );


    return (
        <Dialog open>
            <DialogContent>
                <DialogTitle>Create Your First Community</DialogTitle>
                <form onSubmit={handleSubmit(data => {
                    return mutate(data)
                })} className="space-y-4">
                    <Input
                        {...register("communityName")}
                        type="text"
                        placeholder="Community Name"
                        className="w-full"
                    />
                    <DialogFooter>
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};