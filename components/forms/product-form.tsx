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
import { useState, useEffect } from 'react'
import { useUploadThing } from '@/lib/uploadthing'
import { Textarea } from '../ui/textarea'
import FileUploader from '../file-uploader'
import { Switch } from '../ui/switch'
import { createProduct } from '@/lib/actions/product.actions'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { IProduct } from '@/lib/database/models/product.model'
import { updateProduct } from '../../lib/actions/product.actions'

const formSchema = z.object({
  name: z.string().min(3, 'The product name should be atleast 3 characters'),
  description: z
    .string()
    .min(3, 'The product description should be atleast 3 characters')
    .max(100, 'The product description should not be longer than 100 characters.'),
  thumbnailUrl: z.string().url('Invalid url'),
  price: z.string().min(1, 'The product needs to have a price'),
  visible: z.boolean(),
})

type ProductFormProps = {
  type: 'Create' | 'Update'
  product?: IProduct
}

const ProductForm = ({ type, product }: ProductFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing('imageUploader')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (type === 'Update' && product === undefined) {
      toast({
        title: 'This product does not exist.',
      })
      router.push('/')
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === 'Create'
        ? {
            name: '',
            description: '',
            thumbnailUrl: '',
            price: '',
            visible: false,
          }
        : product !== undefined
          ? {
              name: product.name,
              description: product.description,
              thumbnailUrl: product.thumbnail,
              price: `${product.price}`,
              visible: product.visible,
            }
          : {
              name: '',
              description: '',
              thumbnailUrl: '',
              price: '',
              visible: false,
            },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    let uploadedImageUrl = values.thumbnailUrl
    if (files.length > 0) {
      const uploadedImages = await startUpload(files)
      if (!uploadedImages) return
      uploadedImageUrl = uploadedImages[0].url
    }

    const { description, name, price, visible } = values

    if (type === 'Create') {
      const createdProduct = await createProduct({
        description,
        name,
        price: Number(price),
        visible,
        thumbnail: uploadedImageUrl,
      })

      if (createdProduct.error) {
        toast({
          title: 'An error occured!',
          description: createdProduct.error,
        })
        setIsLoading(false)
      } else {
        toast({
          title: 'Your product was created successfully',
        })
        router.push('/admin')
      }
    } else if (product !== undefined) {
      const updatedProduct = await updateProduct(product._id, {
        description,
        name,
        price: Number(price),
        visible,
        thumbnail: uploadedImageUrl,
      })

      if (updatedProduct.error) {
        toast({
          title: 'An error occured!',
          description: updatedProduct.error as string,
        })
        setIsLoading(false)
      } else {
        toast({
          title: 'The product was updated successfully',
        })
        router.push('/admin')
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Best product!" {...field} />
                </FormControl>
                <FormDescription>This is the public product Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormDescription>This is the price of the product</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="This is the best product." {...field} />
                </FormControl>
                <FormDescription>This is the public product description.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem className={'w-full'}>
                <FormControl className={'h-72'}>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="visible"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex items-center gap-3">
                  <FormLabel>Visible:</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </div>
                <FormDescription>
                  Do you want the product to be visible on the store?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {type === 'Create' ? (
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
