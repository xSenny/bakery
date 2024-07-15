'use server'

import { CreateProductParams } from "@/types"
import { connectToDatabase } from "../database"
import Product, {IProduct} from "../database/models/product.model";
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

export const deleteProduct = async (id: string) => {
  try {
    await connectToDatabase();

    const productToDelete = await Product.findById(id);
    if (!productToDelete) {
      return {
        error: 'This product does not exist at the moment!'
      }
    }

    await Product.findByIdAndDelete(id);
    revalidatePath('/admin')
    return {
      success: true
    }
  } catch (e) {
    return {
      error: e
    }
  }
}

export const getProduct = async (id: string) => {
  try {
    await connectToDatabase();

    const product = await Product.findById(id)
    if (!product) {
      return {
        error: 'This product does not exist at the moment!'
      }
    }

    return {product};

  } catch (e) {
    return {
      error: e
    }
  }
}

export const updateProduct = async (id: string, product: CreateProductParams) => {
  try {
    await connectToDatabase();

    const productToUpdate = await Product.findById(id);
    if (!productToUpdate) {
      return {
        error: 'This product does not exist anymore.'
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, product);
    revalidatePath('/admin')
    return {
      updatedProduct
    }
  } catch (e) {
    return {
      error: e
    }
  }
}