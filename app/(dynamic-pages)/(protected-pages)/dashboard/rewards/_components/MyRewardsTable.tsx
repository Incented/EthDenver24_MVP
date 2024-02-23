import { FC } from 'react';

import Pagination from "@/components/ui/Pagination";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
 ShadcnTable,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';


interface MyRewardsTableProps {

}

const MyRewardsTable: FC<MyRewardsTableProps> = ({ }) => {
 return <>

  <ShadcnTable className="hidden w-full border-0 sm:inline-table">
   <TableHeader className="w-full border-none">
    <TableRow>
     <TableHead className="">Task</TableHead>
     <TableHead>Community</TableHead>
     <TableHead className="text-center">Type</TableHead>
     <TableHead className="text-center whitespace-nowrap">
      Award Source
     </TableHead>
     <TableHead className="text-center">
      <div className="flex items-center gap-1">
       <p>Date</p>
       <ChevronsUpDown size={15} />
      </div>
     </TableHead>
     <TableHead className=" whitespace-nowrap text-end">
      <div className="flex items-center justify-end gap-1">
       <p>Total Carrots</p>
       <ChevronsUpDown size={15} />
      </div>
     </TableHead>
    </TableRow>
   </TableHeader>
   <TableBody>
    {Array.from({ length: 10 }).map((_, i) => (
     <TableRow
      key={i}
      className={cn("py-0", i % 2 === 0 ? "bg-secondary" : "")}
     >
      <TableCell className="py-1.5 font-medium whitespace-nowrap">
       Buy a trash container
      </TableCell>
      <TableCell className="py-1.5">
       <div className=" py-1.5 flex items-center gap-1">
        <Avatar>
         <AvatarImage
          className="w-10 h-10 rounded-full"
          src="/assets/avatar_1.jpg"
         />
        </Avatar>
        <p className="whitespace-nowrap">Buan Fund</p>
       </div>
      </TableCell>
      <TableCell className="py-1.5 text-center">
       <Badge variant="outline">Constructive</Badge>
      </TableCell>
      <TableCell className="py-1.5 text-center">
       Contribution
      </TableCell>
      <TableCell className="py-1.5">22/11/2023</TableCell>
      <TableCell className="py-1.5 text-end">
       <p className="pr-10">500</p>
      </TableCell>
     </TableRow>
    ))}
   </TableBody>


  </ShadcnTable>
  <div className="sticky bottom-0">
   <Pagination
    title="Rewards"
    totalPages={10}
    count={2}
   />
  </div>
 </>
}

export default MyRewardsTable