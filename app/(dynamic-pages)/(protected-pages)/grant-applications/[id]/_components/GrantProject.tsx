import { Search } from '@/components/Search'
import GoBack from '@/components/ui/GoBack'
import Pagination from "@/components/ui/Pagination"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getOrganizationAdmins, getTeamMembersInOrganization } from '@/data/user/organizations'
import { getCommunityTasks } from '@/data/user/tasks'
import { TeamMembersTableProps } from '@/types'
import { Filter } from 'lucide-react'
import moment from "moment"
import TaskTab from '../../../dashboard/(my-dashboard)/_components/TaskTab'
import GrantProjectDetailsTopCards from './  GrantProjectDetailsTopCards'
import GrantProjectAdmin from './GrantProjectAdmin'
import GrantProjectInfo from './GrantProjectInfo'
import GrantProjectPeriodsCard from './GrantProjectPeriodsCard'
import GrantProjectPotCard from './GrantProjectPotCard'
import PriorityCards from './GrantProjectPriorityCards'
import GrantProjectTotalRewards from './GrantProjectTotalRewards'
import GrantProjectTotalTasks from './GrantProjectTotalTasks'
import GrantTeamMembers from './GrantTeamMembers'





export default async function GrantProject() {

 const [communityTasks, admins, members] =
  await Promise.all([
   getCommunityTasks("d67ef0c1-0269-4584-9455-cc16a1d0ee02"),
   getOrganizationAdmins("d67ef0c1-0269-4584-9455-cc16a1d0ee02"),
   getTeamMembersInOrganization("d67ef0c1-0269-4584-9455-cc16a1d0ee02"),
  ]);

 const normalizedAdmins: TeamMembersTableProps["members"] = admins.map(
  (member, index) => {
   const userProfile = Array.isArray(member.user_profiles)
    ? member.user_profiles[0]
    : member.user_profiles;
   if (!userProfile) {
    throw new Error("User profile not found");
   }
   return {
    index: index + 1,
    id: userProfile.id,
    avatar_url: userProfile.avatar_url,
    name: userProfile.full_name ?? `User ${userProfile.id}`,
    role: member.member_role,
    created_at: moment(member.created_at).format("DD MMM YYYY"),
   };
  }
 );

 const normalizedMembers: TeamMembersTableProps["members"] = members.map(
  (member, index) => {
   const userProfile = Array.isArray(member.user_profiles)
    ? member.user_profiles[0]
    : member.user_profiles;
   if (!userProfile) {
    throw new Error("User profile not found");
   }
   return {
    index: index + 1,
    id: userProfile.id,
    avatar_url: userProfile.avatar_url,
    name: userProfile.full_name ?? `User ${userProfile.id}`,
    role: member.member_role,
    created_at: moment(member.created_at).format("DD MMM YYYY"),
   };
  }
 );


 return (
  <div className="relative mx-4 mb-10 sm:mx-8">
   <div className="mt-4">
    <GoBack />
   </div>
   <h1 className="mt-4 mb-4 text-3xl font-medium">
    Project  Details
   </h1>

   <div className="flex flex-col gap-4 md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">

    <div className="space-y-4 md:col-span-2 lg:grid lg:grid-cols-2 lg:gap-3 xl:grid-cols-3 xl:col-span-3 2xl:col-span-4">


     <GrantProjectDetailsTopCards />
     <GrantProjectPotCard />
     <GrantProjectPeriodsCard />
     <PriorityCards prioritizationQourum={75} validationQuorum={45} />

     <div className="grid gap-3 lg:grid-cols-2 lg:col-span-2 xl:col-span-3">
      <GrantProjectTotalTasks />
      <GrantProjectTotalRewards />
     </div>

     <Card className="w-full p-4 pb-4 border-none bg-muted-foreground/10 lg:col-span-2 xl:col-span-3">
      <h1 className="text-[20px] font-semibold mb-4">Tasks</h1>
      <div className="flex items-center w-full mb-4">
       <div className="flex gap-2">
        <Search placeholder="Search Tasks..." />
        <Button variant="outline">
         <Filter className="mr-2" />
         Filter
        </Button>
       </div>
      </div>
      <div>
       <TaskTab tasks={communityTasks} isGrant={true} />
       <div className="hidden pt-4 md:flex">
        <Pagination
         count={20}
         title="Tasks"
         totalPages={10}
         className="bg-transparent"
        />
       </div>
       <Button
        variant="ghost"
        className="justify-center w-full text-primary md:hidden"
        size="lg"
       >
        Show More
       </Button>
      </div>
     </Card>
    </div>


    <div className="space-y-4 md:col-span-1 md:row-start-1 2xl:col-span-1">
     <GrantProjectInfo
      grantProjectName="EthDenver"
      grantProjectDescription="Founded by a team of visionary game developers, blockchain experts, and creative storytellers, Buan Fund is dedicated to pushing the boundaries of what's possible in the gaming universe."
      // communityUrls={["https://www.ethdenver.com/"]}
      communityImage=""
      communityMembersCount={100}
     />
     <GrantProjectAdmin communityMembers={normalizedAdmins} />
     <GrantTeamMembers communityMembers={normalizedMembers} />
    </div>
   </div>
  </div>
 )


}
