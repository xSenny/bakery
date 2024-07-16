'use server'
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Order, { IOrder } from "../database/models/order.model";

export const createOrder = async (order: IOrder) => {
  try {
    await connectToDatabase();

    const createdOrder = await Order.create(order)

    revalidatePath('/admin/orders')
    return JSON.parse(JSON.stringify({createdOrder}))
  } catch (e) {
    return {
      error: e
    }
  }
}

export const getAllOrders = async () => {
  try {
    await connectToDatabase();

    const orders: IOrder[] = await Order.find().sort({createdAt: 'desc'})

    return JSON.parse(JSON.stringify({orders}))
  } catch (e) {
    return {
      error: e
    }
  }
}

export const changeStatus = async (id: string, status: string) => {
  try {
    await connectToDatabase();
    
    const orderToEdit = await Order.findById(id);

    if (!orderToEdit) {
      return JSON.parse(JSON.stringify({
        error: 'This order does not exist'
      }))
    }

    const finalOrder = await Order.findByIdAndUpdate(id, {status});
    console.log(finalOrder)
    revalidatePath('/admin/orders')
    return JSON.parse(JSON.stringify({finalOrder}))
  } catch (e) {
    return {
      error: e
    }
  }
}