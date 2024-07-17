import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'
import { IProduct } from '@/lib/database/models/product.model'
import AddToCart from '@/components/add-to-cart'

type ProductCardProps = {
  product: IProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card>
      <CardContent className="p-4 max-w-[380px] relative">
        <Image
          src={product.thumbnail}
          width={360}
          height={265}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        <div className="flex flex-col gap-4 text-wrap mb-10 mt-4">
          <p className="text-[25px] font-bold">{product.name}</p>
          <p className="text-[15px] ">{product.description}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-[25px] font-medium">{product.price}$</p>
          <AddToCart product={product} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
