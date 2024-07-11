import Header from '@/components/header'
import ProductCard from '@/components/product-card'
import React from 'react'


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
    },
    {
      _id: '04',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    },
    {
      _id: '05',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    },
    {
      _id: '06',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    },
    {
      _id: '07',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    },
    {
      _id: '08',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    },
    {
      _id: '09',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    },
    {
      _id: '10',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    },
    {
      _id: '11',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    },
    {
      _id: '12',
      thumbnail: '/assets/images/product.png',
      name: '3-tier red velvet cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      price: 45.90
    }
  ]
}

const ShopPage = () => {

  const data = getMockupProducts()

  return (
    <main className='min-h-screen bg-background flex gap-4 flex-col pb-10'>
      <div className='justify-center flex'>
        <Header />
      </div>
      <h1 className='text-center text-[30px] md:text-[40px] lg:text-[50px] font-semibold text-accent'>Shop our products</h1>
      <div className='w-full h-full flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {data.map(p => (
            <ProductCard product={p}/>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ShopPage
