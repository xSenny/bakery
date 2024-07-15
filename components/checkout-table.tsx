'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"
import {useState, useEffect } from 'react'
import {CartItem, CartType} from '@/types'

const CheckoutTable = () => {

  const [cart, setCart] = useState<CartType>({
    cartItems: [],
    total: 0
  })

  const getData = () => {
    //@ts-ignore
    const localCart: CartType = JSON.parse(localStorage.getItem('cart'));
    if (localCart) setCart(localCart)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Table className="max-h-screen overflow-auto">
      <TableCaption>A list of your cart.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.cartItems.map((item: CartItem, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell>{item.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>{cart.total}$</TableCell>
        </TableRow>
      </TableFooter>
    </Table>

  )

}

export default CheckoutTable;