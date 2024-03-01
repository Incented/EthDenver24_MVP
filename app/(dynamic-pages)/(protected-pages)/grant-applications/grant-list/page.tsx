import { Search } from "@/components/Search";
import Pagination from "@/components/ui/Pagination";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Filter } from "lucide-react";
import Link from "next/link";
import GrantApplication from "./_components/GrantApplication";




export default function GrantListPage() {
 return (
  <main className="mx-4 mb-10">
   <Typography.H2>Arbitrum Foundation Grant Program</Typography.H2>
   <Typography.P className="text-primary">Active</Typography.P>
   <Separator />

   <Typography.P className="text-sm text-muted-foreground">Managed by: The Arbitrum Foundation</Typography.P>
   <div className="mt-4 space-y-2 sm:grid sm:grid-cols-2 sm:gap-4">
    <div className="space-y-4">
     <Card className="flex justify-between p-4 shadow-none">
      <Typography.P className="text-lg font-medium">Grant Pool</Typography.P>
      <Typography.P className="text-lg font-semibold text-primary">1,000,000.00 ARB</Typography.P>
     </Card>
     <Card className="flex justify-between p-4 shadow-none">
      <Typography.P className="text-lg font-medium">Prioritization Reward Pool</Typography.P>
      <Typography.P className="text-lg font-semibold text-primary">1,000.00 ARB</Typography.P>
     </Card>
     <Card className="flex justify-between p-4 shadow-none">
      <Typography.P className="text-lg font-medium">Slash Percentage</Typography.P>
      <Typography.P className="text-lg font-semibold text-primary">5 %</Typography.P>
     </Card>
    </div>
    <Card className="flex-1 px-6 space-y-4 border-none shadow-none bg-muted">
     <div
      className="max-w-full mb-3 text-base prose prose-lg text-muted-foreground prose-slate dark:prose-invert prose-headings:font-display font-default focus:outline-none lg:grid lg:grid-cols-2 lg:gap-4"
     >

      <div className="">
       <p>
        The Arbitrum Foundation Grant Program supports builders with milestones-based funding for growth. All grants issued through this program will serve to improve the adoption of Arbitrum chains, create stronger technical structures, and build sustainable communities in the Arbitrum ecosystem.
       </p>
       <p>
        <strong>Who are we looking for:</strong> <br />
        Currently accepting applications for Decentralized Applications(“dApps”)
       </p>
      </div>

      <div className="">
       <p>
        <strong>Applications are now open
        </strong> <br />
        Applications are being approved on a rolling basis.To maximize the impact of our grant program, we will be tracking milestone progress for all approved applicants.
       </p>
       <Link href="/">
        <Button className="w-full px-4 py-2 mt-4 text-white bg-orange-500 rounded hover:bg-orange-600">
         Apply
        </Button>
       </Link>

      </div>
     </div>
    </Card>
   </div>
   <div className="items-center mt-8 mb-4 md:flex">
    <h1 className="text-xl font-medium ">Grant Applications</h1>
    <div className="flex items-center gap-3 mt-4 ml-auto md:mt-0">
     <Search placeholder="Search Application" />
     <Button>
      <Filter size={20} className="mr-1" />
      Filter
     </Button>
    </div>
   </div>
   <div className="">

    <ul className="space-y-3">
     <GrantApplication />
     <GrantApplication />
    </ul>
    <div className="hidden py-6 pt-4 md:flex">
     <Pagination
      title="Applications"
      totalPages={10}
      count={3}
     />
    </div>
   </div>
  </main>
 )
}