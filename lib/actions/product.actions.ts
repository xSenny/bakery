'use server'

import { CreateProductParams } from "@/types"
import { connectToDatabase } from "../database"
import Product from "../database/models/product.model";

export const createProduct = async (product: CreateProductParams) => {
  try {
    await connectToDatabase();

    const createdProduct = await Product.create(product);

    return JSON.parse(JSON.stringify({createdProduct}))
  } catch (e) {
    return {
      error: e
    }
  }
}

export const getAllProducts = async ({visible = false, limit = 10}) => {
  try {
    await connectToDatabase();

    if (visible) {
      const products = await Product.find({visible: true}).limit(limit)

      return JSON.parse(JSON.stringify({products}))
    }

    const products = await Product.find().limit(limit);
    return JSON.parse(JSON.stringify({products}))
  } catch (e) {
    return {
      error: e
    }
  }
}