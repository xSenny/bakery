'use client'

import { Button } from './ui/button'
import { IProduct } from '@/lib/database/models/product.model'
import { Cart, CartItem } from '@/types'
import { useToast } from './ui/use-toast'

const AddToCart = ({product}: {product: IProduct}) => {
  const {toast} = useToast();

  const handleAddToCart = () => {
    // @ts-ignore
    const cart: Cart = JSON.parse(localStorage.getItem('cart')) || {
      cartItems: [],
      total: 0
    }

    const foundItem: CartItem | undefined = cart.cartItems.find(item => item._id === product._id);

    if (typeof foundItem !== 'undefined') {
      foundItem.amount++;
    } else {
      cart.cartItems.push({...product, amount: 1});
    }
    cart.total += product.price;

    toast({
      title: `${product.name} added in your cart!`,
    })

    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(cart.cartItems)
  }

  return <Button className="bg-primary" onClick={handleAddToCart}>Add to cart</Button>
}

export default AddToCart;