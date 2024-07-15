'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import {ShoppingCart} from 'lucide-react'
import { useEffect, useState } from "react"
import {Cart as CartType, CartItem as CartItemType} from '@/types'
import {Trash2} from 'lucide-react'
import { useToast } from "./ui/use-toast"
import {Button} from '@/components/ui/button'
import { useRouter } from "next/navigation"

const CartItem = ({item, deleteItem, addItems}: {item: CartItemType, deleteItem: (id: string) => void, addItems: (amount: number, id: string) => void}) => {

  return (
    <div className="min-h-[100px] flex items-center flex-col justify-between">
      <div className="flex justify-between w-full items-center">
        <h1 className="font-medium text-[20px] w-[60%]">{item.name}</h1>
        <Trash2 onClick={() => deleteItem(item._id)} className="cursor-pointer"/>
      </div>
      <div className="flex justify-between w-full items-center">
        <h1 className="font-medium text-[20px] w-[60%]">{item.price}$</h1>
        <div className="w-[140px] h-[52px] border-2 border-black rounded-full flex justify-evenly items-center">
          <button onClick={() => addItems(-1, item._id)}>-</button>
          <p>{item.amount}</p>
          <button onClick={() => addItems(1, item._id)}>+</button>
        </div>
      </div>
    </div>
  )
}

const Cart = () => {

  const [cart, setCart] = useState<CartType>({
    cartItems: [],
    total: 0
  })

  const [open, setOpen] = useState(false)
  const router = useRouter()
  const {toast} = useToast()

  const getData = (e: boolean) => {
    //@ts-ignore
    const localCart: CartType = JSON.parse(localStorage.getItem('cart'));
    if (localCart) setCart(localCart)
    setOpen(e)
  }

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log('Set')
  }

  const deleteItem = (id: string) => {
    const updatedCart = cart.cartItems.filter(item => item._id !== id)
    setCart(cart => ({...cart, cartItems: updatedCart}))
    toast({
      title: 'Deleted the product!',
      variant: 'destructive'
    })
    saveCart()
  }

  const addAmount = (amount: number, id: string) => {

    const foundItemIndex = cart.cartItems.findIndex(item => item._id === id);

    if (cart.cartItems[foundItemIndex].amount + amount <= 0) {
      deleteItem(id);
      saveCart()
      return;
    }

    if (foundItemIndex !== -1) {
      const updatedCart = [...cart.cartItems]
      updatedCart[foundItemIndex].amount+=amount,
      setCart(cart => ({...cart, cartItems: updatedCart}))
      toast({
        title: 'Changed the amount of products!'
      })
      saveCart()
    }
  }

  return (
    <>
      <Sheet onOpenChange={getData} open={open}>
        <SheetTrigger><ShoppingCart /></SheetTrigger>
        <SheetContent className="p-10">
          <SheetHeader>
            <SheetTitle className="text-accent">
              Your cart
            </SheetTitle>
          </SheetHeader>
          <div className=" h-full flex flex-col">
            <main className="flex-1 overflow-auto gap-8 flex flex-col mt-4">
              {cart.cartItems.map((cartItem) => (
                <CartItem item={cartItem} key={cartItem._id} deleteItem={deleteItem} addItems={addAmount}/>
              ))}
            </main>
            <footer className="bg-background min-h-[100px] p-4 flex flex-col gap-8">
              <div className="text-accent flex justify-between w-full">
                <p>Sub Total</p>
                <p>{cart.total}$</p>
              </div>
              <div className="text-accent flex justify-between w-full gap-5">
                <Button onClick={() => setOpen(false)}>Continue Shopping</Button>
                <Button variant={'ghost'} onClick={() => router.push('/checkout')}>Checkout</Button>
              </div>
            </footer>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}



export default Cart;