import { Anchor } from '@/components/Anchor'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'

interface GrantApplicationProps {
 imageUrl?: string
 grantTitle?: string
 grantDescription?: string
 grantStatus?: string
 grantType?: string
 grantCommunity?: string
}

const GrantApplication: FC<GrantApplicationProps> = ({ imageUrl, grantTitle, grantDescription, grantStatus, grantType, grantCommunity }) => {
 return (
  <>
   <Card className="relative justify-between hidden w-full rounded-lg sm:flex">

    <div
     className={cn(
      "absolute top-0 right-0 px-4 py-2 text-xs font-medium text-white rounded-tr-md rounded-bl-md bg-primary",
     )}
    >
     <p className="text-xs font-medium leading-6">New Proposal</p>
    </div>
    <div className="relative w-1/2 h-full ">
     <Image
      src="/images/task2.jpeg"
      alt="logo"
      className="object-cover object-center w-full h-40 rounded-tl-md rounded-bl-md"
      width={300}
      height={300}
     />
    </div>
    <div className="relative w-full h-full px-6 py-6 text-foreground">
     <div className="flex items-center gap-2 text-sm">
      <p className="text-xs font-medium leading-6">Arbitrum Foundation Grant Program</p>
      <TooltipProvider>
       <Tooltip>
        <TooltipTrigger asChild className="z-20 cursor-pointer">
         <Info size={18} />
        </TooltipTrigger>
        <TooltipContent className="z-50">
         <div className="">
          <p className="mb-2 text-sm">Community Details</p>
          <p className="mb-1 text-xs">
           Prioritization Reward Percentage 10%
          </p>
          <p className="text-xs">
           Validation Reward Percentage 10%
          </p>
         </div>
        </TooltipContent>
       </Tooltip>
      </TooltipProvider>
     </div>
     <div className="mt-2">
      <div className="mt-2">
       <Anchor
        href={`/dashboard/tasks/${1}`}
        className="text-base font-semibold leading-7 text-foreground dark:text-white"
       >
        Swap Monster
       </Anchor>
       <Badge variant="secondary" className='ml-2'>Defi</Badge>
      </div>
      <div className="mt-2 ">
       <p className="w-1/2 text-sm truncate text-muted-foreground">
        A protocol for trading and automated liquidity provision on Arbitrum.
       </p>
      </div>
     </div>
    </div>

    <Button className="absolute top-1/2 right-4">View Application</Button>



   </Card>

   {/* Mobile screen */}

   <Card className="w-full min-w-full rounded-lg sm:hidden">
    <div className="relative w-full h-full ">
     <Image
      src="/images/task2.jpeg"
      alt="logo"
      className="object-cover object-center w-full h-40 rounded-md"
      width={300}
      height={300}
     />
    </div>
    <div className="flex items-center gap-2 p-4 text-sm">
     <p className="text-xs font-medium leading-6">Arbitrum Foundation Grant Program</p>
     <TooltipProvider>
      <Tooltip>
       <TooltipTrigger asChild className="z-20 cursor-pointer">
        <Info size={18} />
       </TooltipTrigger>
       <TooltipContent className="z-50">
        <div className="">
         <p className="mb-2 text-sm">Community Details</p>
         <p className="mb-1 text-xs">
          Prioritization Reward Percentage 10%
         </p>
         <p className="text-xs">
          Validation Reward Percentage 10%
         </p>
        </div>
       </TooltipContent>
      </Tooltip>
     </TooltipProvider>
    </div>

    <div className="px-4">
     <div className="">
      <Anchor
       href={`/dashboard/tasks/${1}`}
       className="text-base font-semibold leading-7 text-foreground dark:text-white"
      >
       Swap Monster
      </Anchor>
      <Badge variant="secondary" className='ml-2'>Defi</Badge>
     </div>
     <div className="mt-2 ">
      <p className="w-full text-sm truncate text-muted-foreground">
       A protocol for trading and automated liquidity provision on Arbitrum.
      </p>
     </div>
    </div>


    <Button className="block mx-auto my-4">View Application</Button>



   </Card>
  </>
 )
}

export default GrantApplication