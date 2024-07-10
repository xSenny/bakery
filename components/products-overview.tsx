import Link from 'next/link'
import React from 'react'
import ProductCard from './product-card'

const getMockupProducts = () => {
  return [
    {
      _id: '01',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    },
    {
      _id: '02',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    },
    {
      _id: '03',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    }
  ]
}

const ProductsOverview = () => {

  const data = getMockupProducts()

  return (
    <div className='min-h-screen flex flex-col justify-center items-center lg:gap-12 gap-4 bg-foreground p-10'>
      <h1 className='text-primary text-[30px] lg:text-[50px] font-bold'>OUR BEST PRODUCTS</h1>
      <div className="self-end text-accent">
        <Link className='lg:font-semibold text-[18px] lg:text-[20px] text-accent' href="/shop">See all</Link>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {data.map(p => (
          <ProductCard key={p._id} product={p}/>
        ))}
      </div>
    </div>
  )
}

export default ProductsOverview
