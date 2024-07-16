'use server'
import { connectToDatabase } from "../database";
import Order, { IOrder } from "../database/models/order.model";

export const createOrder = async (order: IOrder) => {
  try {
    await connectToDatabase();

    const createdOrder = await Order.create(order)

    return JSON.parse(JSON.stringify({createdOrder}))
  } catch (e) {
    return {
      error: e
    }
  }
}