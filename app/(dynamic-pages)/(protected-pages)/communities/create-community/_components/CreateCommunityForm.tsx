"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrganization } from "@/data/user/organizations";
import { useToastMutation } from "@/hooks/useToastMutation";
import { User } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCommunityForm() {
  const router = useRouter();
  const [communityTitle, setCommunityTitle] = useState("");
  const [proposalAbsoluteReward, setProposalAbsoluteReward] = useState(0);
  const { mutate, isLoading } = useToastMutation(
    async ({
      communityTitle,
      proposalAbsoluteReward,
    }: {
      communityTitle: string;
      proposalAbsoluteReward: number;
    }) => {
      return await createOrganization({
        name: communityTitle,
        proposalAbsoluteReward,
      });
    },
    {
      loadingMessage: "Creating community...",
      errorMessage: "Failed to create community",
      successMessage: "Community created!",
      onSuccess: (community) => {
        const communityId = community.id;
        router.push(`/communities/${communityId}`);
      },
    }
  );

  const onConfirm = ({
    communityTitle,
    proposalAbsoluteReward,
  }: {
    communityTitle: string;
    proposalAbsoluteReward: number;
  }) => {
    mutate({ communityTitle, proposalAbsoluteReward });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm({
      communityTitle,
      proposalAbsoluteReward: proposalAbsoluteReward,
    });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        data-testid="create-community-form"
        className="w-full"
      >
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="mb-4">
            <Label htmlFor="name">Community Name</Label>
            <Input
              value={communityTitle}
              onChange={(event) => setCommunityTitle(event.target.value)}
              required
              id="name"
              name="name"
              type="text"
              placeholder="Community Name"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="proposal_absolute_reward">
              Proposal Absolute Reward
            </Label>
            <Input
              type="number"
              value={proposalAbsoluteReward}
              onChange={(event) =>
                setProposalAbsoluteReward(Number(event.target.value))
              }
              id="proposal_absolute_reward"
              name="proposal_absolute_reward"
              placeholder="Enter absolute reward for proposal"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="proposal_relative_reward">
              Proposal Relative Reward
            </Label>
            <Input
              type="number"
              id="proposal_relative_reward"
              name="proposal_relative_reward"
              placeholder="Enter relative reward for proposal"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="prioritization_reward_percentage">
              Prioritization Reward Percentage
            </Label>
            <Input
              type="number"
              id="prioritization_reward_percentage"
              name="prioritization_reward_percentage"
              placeholder="Enter prioritization reward percentage"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="prioritization_period_start">
              Prioritization Period Start
            </Label>
            <Input
              type="datetime-local"
              id="prioritization_period_start"
              name="prioritization_period_start"
              placeholder="Select prioritization period start"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="prioritization_period_duration">
              Prioritization Period Duration
            </Label>
            <Input
              type="text"
              id="prioritization_period_duration"
              name="prioritization_period_duration"
              placeholder="Enter prioritization period duration"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="prioritization_quorum_percentage">
              Prioritization Quorum Percentage
            </Label>
            <Input
              type="number"
              id="prioritization_quorum_percentage"
              name="prioritization_quorum_percentage"
              placeholder="Enter prioritization quorum percentage"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="contribution_period_duration">
              Contribution Period Duration
            </Label>
            <Input
              type="text"
              id="contribution_period_duration"
              name="contribution_period_duration"
              placeholder="Enter contribution period duration"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="validation_quorum_percentage">
              Validation Quorum Percentage
            </Label>
            <Input
              type="number"
              id="validation_quorum_percentage"
              name="validation_quorum_percentage"
              placeholder="Enter validation quorum percentage"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="claim_lock_period_duration">
              Claim Lock Period Duration
            </Label>
            <Input
              type="text"
              id="claim_lock_period_duration"
              name="claim_lock_period_duration"
              placeholder="Enter claim lock period duration"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="task_expiration_time">Task Expiration Time</Label>
            <Input
              type="datetime-local"
              id="task_expiration_time"
              name="task_expiration_time"
              placeholder="Select task expiration time"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="carrot_pot_initial_amount">
              Carrot Pot Initial Amount
            </Label>
            <Input
              type="number"
              id="carrot_pot_initial_amount"
              name="carrot_pot_initial_amount"
              placeholder="Enter carrot pot initial amount"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="community_fee_percentage">
              Community Fee Percentage
            </Label>
            <Input
              type="number"
              id="community_fee_percentage"
              name="community_fee_percentage"
              placeholder="Enter community fee percentage"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="validation_reward_percentage">
              Validation Reward Percentage
            </Label>
            <Input
              type="number"
              id="validation_reward_percentage"
              name="validation_reward_percentage"
              placeholder="Enter validation reward percentage"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="validation_period_duration">
              Validation Period Duration
            </Label>
            <Input
              type="text"
              id="validation_period_duration"
              name="validation_period_duration"
              placeholder="Enter validation period duration"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="addresses_with_veto">Addresses with Veto</Label>
            <Input
              type="text"
              id="addresses_with_veto"
              name="addresses_with_veto"
              placeholder="Enter addresses with veto rights"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="claim_stake_amount_percentage">
              Claim Stake Amount Percentage
            </Label>
            <Input
              type="number"
              id="claim_stake_amount_percentage"
              name="claim_stake_amount_percentage"
              placeholder="Enter claim stake amount percentage"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button
          variant="default"
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          Create Community
        </Button>
      </form>
    </div>
  );
}
