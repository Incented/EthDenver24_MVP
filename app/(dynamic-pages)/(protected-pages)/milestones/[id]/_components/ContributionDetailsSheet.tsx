"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Table } from "@/types";
import { AttachmentClient } from "../../../grants/[id]/submit-application/components/AttachmentClient";
import ContributionDiscussion from "./ContributionDiscussion";
import { FileWithUrl } from "./ContributionTypes";

interface MilestoneContributionSheetProps {
  contribution: Table<"grant_project_milestones_contributions">;
  contributorProfile: Table<"user_profiles">;
  otherContributionsData: Array<{
    index: number,
    contributionId: string,
    description: string,
    avatarUrl: string | null,
    fullName: string | null,
    createdAt: string,
  }>;
}

const MilestoneContributionSheet: FC<MilestoneContributionSheetProps> = ({ contribution, contributorProfile, otherContributionsData }) => {

  const [files, setFiles] = useState<File[]>([]);


  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };


  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <Button variant="outline" size="sm" className="text-foreground">
          View Details
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-scroll flex flex-col gap-4 w-full max-w-lg">
        <SheetHeader>
          <SheetTitle className="mb-4 text-start">
            Contribution Details
          </SheetTitle>
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={contributorProfile.avatar_url || ""}
                alt={contributorProfile.full_name || ""}
                className="object-cover rounded-full"
              />
              <AvatarFallback>{contributorProfile.full_name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <p className="text-xs">{contributorProfile.full_name}</p>
          </div>
        </SheetHeader>
        <div className="space-y-2">
          <h1 className="text-sm">Solution</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            {contribution.description}
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="mt-4 mb-2 text-sm">Photos</h1>

          <Carousel
            opts={{
              align: "center",
            }}
            className="w-full"
          >
            <CarouselContent className="w-full">
              {(contribution.files as FileWithUrl[])?.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file.url)).map((file, index) => (
                <CarouselItem key={index} className="basis-1/3">
                  <div className="w-[100px] h-[100px]">
                    <Image
                      width={200}
                      height={200}
                      src={file?.url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full rounded-md"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground truncate">{file.name}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-end gap-3 mt-8">
              <CarouselPrevious className="" />
              <CarouselNext className="" />
            </div>
          </Carousel>
        </div>
        <div className="mt-4">
          <AttachmentClient
            attachments={contribution.files as FileWithUrl[]}
          />
        </div>

        {/* <Card className="p-3 my-4">
          <p className="mb-2 text-sm">Submit your validation</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="carrotAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount of carrots</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stakeFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-background">.</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Stake for" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your description here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attchament"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Attachment
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Describe your solution here"
                        type="file"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="" size="sm" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </Card> */}
        <div className="space-y-3">
          <h1 className="mt-4 mb-2 text-sm">Other contributions</h1>
          {otherContributionsData.map((contribution) => (
            <ContributionDiscussion
              key={contribution.contributionId}
              contributionIndex={contribution.index}
              details={contribution.description}
              contributionCarrots={20} // Assuming a static value for now, adjust as necessary
              contributorId={contribution.contributionId}
              contributorImage={contribution.avatarUrl || '/assets/default_avatar.jpg'} // Fallback to a default image if none is provided
              contributorName={contribution.fullName || 'Anonymous'} // Fallback to 'Anonymous' if no name is provided
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MilestoneContributionSheet;
