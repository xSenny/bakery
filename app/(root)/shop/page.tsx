import Header from '@/components/header'
import ProductCard from '@/components/product-card'
import React from 'react'
import AdminModal from '@/components/admin-modal'
import { getAllProducts } from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/database/models/product.model'

type SearchParamProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const ShopPage = async ({ searchParams }: SearchParamProps) => {
  const { products } = await getAllProducts({ visible: true })
  const isAdmin = searchParams?.admin === 'true'

  return (
    <main className="min-h-screen bg-background flex gap-4 flex-col pb-10 px-10">
      {isAdmin && <AdminModal />}
      <div className="justify-center flex">
        <Header />
      </div>
      <h1 className="text-center text-[30px] md:text-[40px] lg:text-[50px] font-semibold text-accent">
        Shop our products
      </h1>
      <div className="w-full h-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p: IProduct, i: number) => (
            <ProductCard product={p} key={i} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default ShopPage
