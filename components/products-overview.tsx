import Link from 'next/link'
import React from 'react'
import ProductCard from './product-card'
import { getAllProducts } from '@/lib/actions/product.actions'
import { Product } from '@/lib/database/models/product.model'

const ProductsOverview = async () => {

  const {products} = await getAllProducts({visible: true, limit: 3})

  return (
    <div className='min-h-screen flex flex-col justify-center items-center lg:gap-12 gap-4 bg-foreground p-10'>
      <h1 className='text-primary text-[30px] lg:text-[50px] font-bold'>OUR BEST PRODUCTS</h1>
      <div className="self-end text-accent">
        <Link className='lg:font-semibold text-[18px] lg:text-[20px] text-accent' href="/shop">See all</Link>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {products.map((p: Product) => (
          <ProductCard key={p._id} product={p}/>
        ))}
      </div>
    </div>
  )
}

export default ProductsOverview
