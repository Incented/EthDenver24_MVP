import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { FC } from 'react'

type IReward = {
 communityImage: string
 communityName: string
 date: string
 awardSource: string
 totalCarrots: string
 rewardType: string
 task: string
}

interface MyRewardsTableMobileProps {
 rewards: IReward[]

}

const MyRewardsTableMobile: FC<MyRewardsTableMobileProps> = ({ rewards }) => {
 return (
  <div className="space-y-4 border-0 sm:hidden">
   {
    rewards.map((reward, i) => (
     <Card className={cn(i % 2 === 0 && "bg-secondary")} key={i} >
      <CardContent>
       <Badge className={cn("mt-4 text-xs", i % 2 === 0 ? "bg-muted" : "bg-secondary")} variant="secondary">{reward.rewardType}</Badge>
       <h4 className="mt-2 mb-5 text-sm font-semibold">{reward.task}</h4>

       <div className="flex gap-12">
        <div className="">
         <h4 className="mb-2 text-xs text-muted-foreground">Community</h4>
         <div className="flex mb-2">
          <Avatar>
           <AvatarImage
            className="w-8 h-8 rounded-full"
            src={reward.communityImage}
           />
          </Avatar>
          <p className="mt-1 text-sm whitespace-nowrap">{reward.communityName}</p>
         </div>
         <h4 className="mb-1 text-xs text-muted-foreground">Date</h4>
         <h4 className='text-xs'>{reward.date}</h4>
        </div>
        <div className="">
         <h4 className="mb-1 text-xs text-muted-foreground">Award Source</h4>
         <h4 className="mb-6 text-sm">{reward.awardSource}</h4>
         <h4 className="mb-1 text-sm text-muted-foreground">Total Carrots</h4>
         <h4 className="text-sm">{reward.totalCarrots}</h4>

        </div>
       </div>
      </CardContent>
     </Card>
    ))
   }


   <div className="flex justify-center">
    <Button variant="link">Show more</Button>
   </div>
  </div>

 )
}

export default MyRewardsTableMobile



