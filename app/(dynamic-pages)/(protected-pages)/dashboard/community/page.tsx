import { Search } from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import { FC } from "react";
import CommunityCard from "./_components/CommunityCard";
import Pagination from "@/components/ui/Pagination";

interface pageProps {}

const CommunityPage: FC<pageProps> = ({}) => {
  return (
    <main className="mx-4">
      <div className="flex items-center mt-8">
        <h1 className="text-3xl ">Community</h1>
        <div className="flex items-center gap-3 ml-auto">
          <Search placeholder="Search Community" />
          <Button variant="outline">
            <Filter size={20} />
          </Button>
          <Button>
            <Plus size={16} />
            Add Community
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 mb-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>
      <Pagination currentPage={1} title="Communities" totalPages={10} />
    </main>
  );
};

export default CommunityPage;
