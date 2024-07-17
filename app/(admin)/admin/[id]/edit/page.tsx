import ProductForm from '@/components/forms/product-form'
import { getProduct } from '@/lib/actions/product.actions'
import React from 'react'

type EditPageParams = {
  params: {
    id: string
  }
}

const EditPage = async ({ params }: EditPageParams) => {
  const { product } = await getProduct(params.id)

  return (
    <div className="p-8">
      <ProductForm type="Update" product={product} />
    </div>
  )
}

export default EditPage
