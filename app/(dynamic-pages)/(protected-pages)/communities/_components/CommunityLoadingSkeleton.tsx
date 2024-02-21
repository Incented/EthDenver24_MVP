import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'



function CommunityLoadingSkeleton() {
 return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {
   Array.from({ length: 6 }).map((_, i) => (
    <CommunitySkeleton key={i} />
   ))
  }
 </div>
}


const CommunitySkeleton = () => {
 return <Card className="p-4">
  <div className="flex items-center justify-between mb-4">
   <div className="flex items-center space-x-2">
    <Skeleton className="w-10 h-10 rounded-full" />
    <div className="space-y-2">
     <Skeleton className="w-10 h-2" />
     <Skeleton className="w-16 h-2" />
    </div>
   </div>
   <Skeleton className="w-[38px] h-[38px] rounded-full" />
  </div>
  <Skeleton className="w-[70%] h-2 mb-6" />

  <div className="grid w-1/2 grid-cols-2 gap-2 mb-4">
   <Skeleton className="w-10 h-2" />
   <Skeleton className="w-16 h-2" />
   <Skeleton className="w-16 h-2" />
   <Skeleton className="w-16 h-2" />
  </div>


  <Skeleton className="w-full h-8" />

 </Card>
}

export default CommunityLoadingSkeleton