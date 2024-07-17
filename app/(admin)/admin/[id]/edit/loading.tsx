import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

const LoadingPage = () => {
  return (
    <div className="p-8">
      <div className="space-y-8 w-full h-full">
        <div className="flex flex-col gap-5 md:flex-row">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-48" />
        </div>
        <div className="flex flex-col gap-5 md:flex-row justify-between">
          <Skeleton className="w-20 h-12" />
          <Button>Update</Button>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
