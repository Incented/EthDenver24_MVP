import GoBack from "@/components/ui/GoBack";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import CommunityInfo from "./CommunityInfo";
import CommunityMembers from "./CommunityMembers";
import CommunityDetailTopCard from "./CommunityDetailTopCard";
import {
  ArrowBigUp,
  Calendar,
  Carrot,
  ChevronRight,
  Info,
  Timer,
  Trophy,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CommunityDetailsTab from "./CommunityDetailsTab";
import { Search } from "@/components/Search";

interface pageProps {}

const CommunityDetailsPage: FC<pageProps> = ({}) => {
  return (
    <main className="mx-8 mb-10">
      <div className="mt-4 mb-6">
        <GoBack />
      </div>
      <div className="flex items-center mb-6">
        <h1 className="text-3xl ">Community Details</h1>
        <div className="ml-auto ">
          <Button className="w-32">Join</Button>
        </div>
      </div>

      <div className="flex gap-3">
        <section className="">
          <div className="mb-6">
            <CommunityInfo />
          </div>
          <div className="">
            <CommunityMembers />
          </div>
        </section>
        <section className="flex-1">
          <div className="grid gap-3 mb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <CommunityDetailTopCard
              value={10}
              Icon={Trophy}
              test="Proposal reward"
              info="Proposal rewards"
            />
            <CommunityDetailTopCard
              value={5}
              Icon={ArrowBigUp}
              test="Prioritization Reward"
              info="Proposal rewards"
            />
            <CommunityDetailTopCard
              value={5}
              Icon={Calendar}
              test="Validation Reward"
              info="Proposal rewards"
            />
            <CommunityDetailTopCard
              value={5}
              Icon={Carrot}
              test="Claim Stake Amount"
              info="Proposal rewards"
            />
          </div>
          <div className="flex gap-4 mb-8">
            <div
              className=" h-[340px] w-60  bg-cover bg-center text-2xl bg-primary shadow-sm rounded-md"
              style={{ backgroundImage: "url(/images/carrot-pot.png)" }}
            >
              <div className="w-full h-full p-8 backdrop-brightness-75">
                <p className="whitespace-nowrap">Carrot Pot</p>
                <p>2.340</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs whitespace-nowrap">
                    80 from Community Fee
                  </p>
                  <Info size={14} />
                </div>
              </div>
            </div>
            <Card className="grid grid-cols-2 gap-4 p-6">
              <div className="">
                <h1 className="mb-10 text-2xl">Periods</h1>
                <Timer size={60} className="mb-2" />
                <p className="text-xs ">
                  Duration for users to prioritize, contribute and validate the
                  task
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Card className="p-4 border border-primary text-primary">
                  <p className="text-[20px]">10 days</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs whitespace-nowrap">
                      Prioritization Period
                    </p>
                    <Info size={14} />
                  </div>
                </Card>
                <Card className="p-4 border border-primary text-primary">
                  <p className="text-[20px]">10 days</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs whitespace-nowrap">
                      Prioritization Period
                    </p>
                    <Info size={14} />
                  </div>
                </Card>
                <Card className="p-4 border border-primary text-primary">
                  <p className="text-[20px]">10 days</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs whitespace-nowrap">
                      Prioritization Period
                    </p>
                    <Info size={14} />
                  </div>
                </Card>
              </div>
            </Card>

            <div className="flex flex-col w-1/4 gap-4">
              <Card className="p-6 ">
                <h1 className="text-[16px] mb-2">Prioritization Quorum</h1>
                <Separator className="mb-4" />
                <div className="flex items-center justify-center text-2xl">
                  <ChevronRight />
                  <h1>75%</h1>
                </div>
                <p className="mb-2 text-center">positive priority</p>
              </Card>
              <Card className="p-4 ">
                <h1 className="text-[16px] mb-2">Prioritization Quorum</h1>
                <Separator className="mb-4" />
                <div className="flex items-center justify-center text-2xl">
                  <ChevronRight />
                  <h1>75%</h1>
                </div>
                <p className="mb-2 text-center">positive priority</p>
              </Card>
            </div>
          </div>
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <h1 className="text-[20px] font-semibold">Task</h1>
              <div className="flex gap-4 ml-auto">
                <Search placeholder="Search Tasks..." />
                <Button variant="outline">Filter</Button>
              </div>
            </div>
            <div className="">
              <CommunityDetailsTab />
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default CommunityDetailsPage;
