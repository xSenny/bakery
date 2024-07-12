'use server'

import { CreateProductParams } from "@/types"
import { connectToDatabase } from "../database"
import Product from "../database/models/product.model";
import { revalidatePath } from 'next/cache'


export const createProduct = async (product: CreateProductParams) => {
  try {
    await connectToDatabase();

    if (product.price <= 0) {
      return {
        error: 'The price needs to be a positive number!'
      }
    }

    const createdProduct = await Product.create(product);

    revalidatePath('/admin')

    return JSON.parse(JSON.stringify({createdProduct}))
  } catch (e) {
    return {
      error: e
    }
  }
}

export const getAllProducts = async ({visible = false, limit}: {visible: boolean, limit?: number}) => {
  try {
    await connectToDatabase();
    let products;
    if (visible) {
      if (limit)
        products = await Product.find({visible: true}).limit(limit)
      else products = await Product.find({visible: true})
      return JSON.parse(JSON.stringify({products}))
    }

    if (limit)
      products = await Product.find().limit(limit);
    else products = await Product.find()
    return JSON.parse(JSON.stringify({products}))
  } catch (e) {
    return {
      error: e
    }
  }
}