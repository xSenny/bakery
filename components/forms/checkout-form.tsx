'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Cart } from '@/types'
import { createOrder } from '@/lib/actions/order.actions'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name!'),
  address: z.string().min(5, 'Enter your address!'),
  phoneNumber: z.string().min(3, 'Enter your phone number!'),
})

const CheckoutForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      address: '',
      phoneNumber: '',
    },
  })

  const { toast } = useToast()
  const router = useRouter()

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { address, phoneNumber, fullName } = values

    //@ts-ignore
    const cart: Cart = JSON.parse(window.localStorage.getItem('cart'))
    let description = ''
    cart.cartItems.forEach((item, i) => {
      description += `${i + 1}. ${item.name} - ${item.amount}x\n`
    })
    const createdOrder = await createOrder({
      address,
      phoneNumber,
      fullName,
      description,
      price: cart.total,
      status: 'Pending',
      createdAt: new Date(),
    })
    if (!createdOrder.error) {
      toast({
        title: 'Order created successfully',
      })
      router.push('/')
      window.localStorage.removeItem('cart')
    } else {
      toast({
        title: 'An error occured',
        description: createdOrder.error as string,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 lg:p-10">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Robert Smith" className="bg-" {...field} />
              </FormControl>
              <FormDescription>This is your full Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="132, My Street, Kingston, New York 12401."
                  className="bg-"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Write here where you would like us to deliver the food
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="(555) 555-1234" className="bg-" {...field} />
              </FormControl>
              <FormDescription>How can we contact you?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center w-full">
          <Button type="submit">Checkout</Button>
        </div>
      </form>
    </Form>
  )
}

export default CheckoutForm
