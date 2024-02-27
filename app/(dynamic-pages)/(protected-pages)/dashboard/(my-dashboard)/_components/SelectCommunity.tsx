"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import urlJoin from "url-join";

interface SelectCommunityProps {
  communities: {
    title: string;
    id: string;
    community_image: string | null;
  }[]
}

const SelectCommunity: FC<SelectCommunityProps> = ({ communities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAllCommunitiesChecked, setIsAllCommunitiesChecked] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  let communityParams = searchParams?.getAll('community') ?? [];

  const handleCommunityClick = (communityName: string) => {
    const communityNameLowerCase = communityName
      .toLowerCase()
      .replace(/\s+/g, '-');

    // Create a new URLSearchParams object based on current search params
    const newSearchParams = new URLSearchParams(searchParams?.toString());

    // Get the current community array from the search params
    const currentCommunities = newSearchParams.getAll('community');

    if (currentCommunities.includes(communityNameLowerCase)) {
      // Remove the community if it's already there (toggle off)
      newSearchParams.delete('community'); // Delete all community entries
      const filteredCommmunities = currentCommunities.filter(
        (name) => name !== communityNameLowerCase,
      );
      filteredCommmunities.forEach((cat) =>
        newSearchParams.append('community', cat),
      ); // Re-add the remaining categories
    } else {
      // Add the community if it's not there (toggle on)
      newSearchParams.append('community', communityNameLowerCase);
    }

    const newUrl = urlJoin(pathname ?? '/', `?${newSearchParams.toString()}`);
    router.push(newUrl);
  };

  const handleClearAll = () => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    newSearchParams.delete('community');
    const newUrl = urlJoin(pathname ?? '/', `?${newSearchParams.toString()}`);
    router.push(newUrl);
  }

  console.log('searchParams', searchParams);

  return (
    <div className="flex w-[176px] items-center px-2 py-1 rounded-md overflow-hidden bg-secondary dark:bg-accent min-w-fit max-h-fit h-10">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild className="w-full cursor-pointer">
          <div className="flex items-center justify-between w-full">
            {communityParams.length > 0 ? (
              <div className="cursor-pointer flex items-center gap-2" onClick={() => setIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <Label htmlFor="all" className="text-sm">Filters applied</Label>
              </div>
            ) : (
              <div className="flex justify-start items-center ">
                <p className="text-sm text-muted-foreground ml-2 ">All Communities</p>
              </div>
            )}
            <ChevronDown size={18} className="ml-auto" />
          </div>
        </PopoverTrigger >
        <PopoverContent
          sideOffset={30}
          align="start"
          className="w-[240px] px-4 flex flex-col justify-start gap-6 "
        >
          <ScrollArea className="h-72">
            <div className="flex flex-col gap-2  p-1">
              <div className="flex items-center gap-2">
                <Checkbox id="all" checked={
                  communityParams.length === 0
                } onCheckedChange={() => {
                  setIsAllCommunitiesChecked(true);
                  handleClearAll();
                }} />
                <Label htmlFor="all" className="text-sm">All Communities</Label>
              </div>
              {communities.map((community) => (
                <div key={community.id} className="flex items-center gap-2" onClick={() => handleCommunityClick(community.title)}>
                  <Checkbox
                    id={`community-${community.id}`}
                    checked={communityParams.includes(community.title.toLowerCase().replace(/\s+/g, '-'))}
                    onCheckedChange={(checked) => {
                      setIsAllCommunitiesChecked(!checked);
                      handleCommunityClick(community.title)
                    }}
                  />
                  <Avatar className="ml-1 h-[28px] w-[28px]">
                    <AvatarImage src={community.community_image || ""} alt={community.title} />
                    <AvatarFallback className=" flex items-center justify-center uppercase text-secondary-foreground h-[28px] w-[28px] text-xs bg-muted">{community.title.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Label htmlFor={`community-${community.id}`} className=" cursor-pointer text-sm line-clamp-1">{community.title}</Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover >
    </div >
  );
};

export default SelectCommunity;
