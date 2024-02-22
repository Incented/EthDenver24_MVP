import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'



function TaskLoadingSkeleton() {
 return (
  <div className="">
   <Card className='flex w-full gap-4 p-3 mb-4'>
    <Skeleton className="h-6 w-14 " />
    <Skeleton className="h-6 w-14" />
    <Skeleton className="h-6 w-14" />
    <Skeleton className="h-6 w-14" />
    <Skeleton className="hidden h-6 w-14 sm:block" />
   </Card>
   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {
     Array.from({ length: 6 }).map((_, i) => (
      <TaskSkeleton key={i} />
     ))
    }
   </div>
  </div>
 )
}


const TaskSkeleton = () => {
 return <Card className="relative">
  <Skeleton className="w-20 h-[30px] absolute right-0 top-0" />
  <div className="p-4">
   <div className="flex items-center mb-4 space-x-1">
    <Skeleton className="w-8 h-2" />
    <Skeleton className="w-4 h-4 rounded-full" />
   </div>
   <Skeleton className="w-[70%] h-2 mb-2" />
   <Skeleton className="w-[70%] h-2 mb-2" />
   <Skeleton className="w-[20%] h-2 mb-6" />

   <div className="flex gap-10">
    <div className="space-y-3">
     <div className="flex items-center gap-3">
      <Skeleton className="w-6 h-6" />
      <Skeleton className="w-16 h-2" />
     </div>
     <div className="flex items-center gap-3">
      <Skeleton className="w-6 h-6" />
      <Skeleton className="w-16 h-2" />
     </div>
     <div className="flex items-center gap-3 ">
      <Skeleton className="w-6 h-6" />
      <Skeleton className="w-16 h-2" />
     </div>
    </div>
    <div className="space-y-6">
     <div className="flex items-center gap-2">
      <Skeleton className="w-6 h-3" />
      <Skeleton className="w-16 h-2" />
     </div>
     <div className="flex items-center gap-2">
      <Skeleton className="w-6 h-3" />
      <Skeleton className="w-16 h-2" />
     </div>
     <div className="flex items-center gap-2">
      <Skeleton className="w-6 h-3" />
      <Skeleton className="w-16 h-2" />
     </div>
    </div>
   </div>
  </div>

 </Card>
}

export default TaskLoadingSkeleton