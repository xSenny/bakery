import { ProductsDataTable } from '@/components/products-table/data-table'
import React from 'react'
import { getAllProducts } from '@/lib/actions/product.actions'
import { columns } from '@/components/products-table/columns'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import {Button} from '@/components/ui/button'

const AdminPage = async () => {

  const {products} = await getAllProducts({visible: false})

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-foreground'>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your bakery products</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsDataTable columns={columns} data={products}/>
        </CardContent>
        <CardFooter className="justify-center">
          <Button size="sm" variant="ghost" className="gap-1">
            Add Product
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AdminPage
