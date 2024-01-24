import { Anchor } from "@/components/Anchor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Wallet } from "lucide-react";
import React, { FC } from "react";

interface JoinCommunityModalProps {
  triggerText: string;
  community: string;
  userId?: string;
}

const JoinCommunityModal: FC<JoinCommunityModalProps> = ({
  triggerText,
  community,
  userId,
}) => {
  return (
    <>
      {!userId ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">{triggerText}</Button>
          </DialogTrigger>
          <DialogContent className="p-6">
            <DialogHeader>
              <DialogTitle className="mb-4 text-lg text-center">
                Join Community
              </DialogTitle>
              <DialogDescription className="text-center text-[14px]">
                Admin approval is required. Once you get approved you will
                receive a notification.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <CommunityInfoModal community={community} triggerText="" />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Button className="w-full">Open</Button>
      )}
    </>
  );
};
const CommunityInfoModal: FC<JoinCommunityModalProps> = ({ community }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Join {community}</Button>
        </DialogTrigger>
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle className="mb-4 text-lg">Join Community</DialogTitle>
          </DialogHeader>
          <DialogDescription className="">
            Need to hold a{" "}
            <Anchor className="underline dark:text-white" href="#">
              Bored Ape NFT
            </Anchor>
          </DialogDescription>

          <div className="flex items-center justify-between p-2 mb-4 border border-gray-600 rounded-md">
            <p>Connect Wallet</p>
            <Button>
              <Wallet size={18} className="mr-3" />
              Connect
            </Button>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox />
            <p className="text-sm text-gray-400">
              By connecting your wallet, you agree to our{" "}
              <Anchor className="text-gray-700 dark:text-white" href="#">
                Terms of service
              </Anchor>{" "}
              and our{" "}
              <Anchor className="text-gray-700 dark:text-white" href="#">
                Privacy Policy.
              </Anchor>
            </p>
          </div>

          <DialogFooter>
            <Button className="w-full">Join {community}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JoinCommunityModal;
