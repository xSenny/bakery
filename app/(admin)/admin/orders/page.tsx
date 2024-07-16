import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllOrders } from "@/lib/actions/order.actions";
import { ProductsDataTable } from "@/components/products-table/data-table";
import { columns } from "@/components/orders-table/columns";
const OrdersPage = async () => {

  const {orders} = await getAllOrders()

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-foreground'>
      <Card className='max-w-[93vw]'>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage your customer's orders</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsDataTable columns={columns} data={orders!} />
        </CardContent>
      </Card>
    </div>
  )
}

export default OrdersPage;