import { Search } from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import { FC } from "react";
import CommunityCard from "./_components/CommunityCard";
import Pagination from "@/components/ui/Pagination";

interface pageProps {}

const CommunityPage: FC<pageProps> = ({}) => {
  return (
    <main className="mx-4 mb-10">
      <div className="items-center mt-8 md:flex">
        <h1 className="text-3xl ">Community</h1>
        <div className="flex items-center gap-3 mt-4 ml-auto md:mt-0">
          <Search placeholder="Search Community" />
          <Button variant="outline">
            <Filter size={20} />
          </Button>
          <Button size="sm">
            <Plus size={16} />
            <p className="hidden md:flex">Add Community</p>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 mt-4 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>
      <div className="hidden md:flex">
        <Pagination currentPage={1} title="Communities" totalPages={10} />
      </div>
      <div className="flex justify-center md:hidden">
        <Button variant="link">Show more</Button>
      </div>
    </main>
  );
};

export default CommunityPage;
