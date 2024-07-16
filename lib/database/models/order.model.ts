import { model, models, Schema } from "mongoose";

export type IOrder = {
  _id?: string,
  fullName: string,
  address: string,
  phoneNumber: string,
  description: string,
  status: 'Pending' | 'Preparing' | 'Shipped' | 'Delivered' | 'Canceled' | 'Returned',
  price: number;
  createdAt: Date
}

const OrderSchema = new Schema({
  fullName: {type: String, required: true},
  address: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true, default: 'Pending'},
  price: {type: Number, required: true},
  createdAt: {type: Date, required: true}
})

const Order = models.Order || model('Order', OrderSchema)

export default Order;