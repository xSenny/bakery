import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-foreground'>
      <Card className='max-w-[93vw]'>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your bakery products</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-96"/>
        </CardContent>
        <CardFooter className="justify-center">
          <Button size="sm" variant="ghost" className="gap-1" asChild>
            Add a product
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Loading;