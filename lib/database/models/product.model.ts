import { model, models, Schema } from "mongoose";

export type Product = {
  _id: string,
  name: string,
  description: string,
  thumbnail: string,
  price: number,
  visible: boolean,
}

const ProductSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  thumbnail: {type: String, required: true},
  price: {type: Number, required: true},
  visible: {type: Boolean, required: true, default: false}
})

const Product = models.Product || model('Product', ProductSchema)

export default Product;