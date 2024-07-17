export type CreateProductParams = {
  name: string
  description: string
  thumbnail: string
  price: number
  visible?: boolean
}

export type CartItem = {
  _id: string
  name: string
  thumbnail: string
  price: number
  amount: number
}

export type Cart = {
  cartItems: CartItem[]
  total: number
}
