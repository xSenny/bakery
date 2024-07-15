"use client"

import { Product } from "@/lib/database/models/product.model"
import { ColumnDef } from "@tanstack/react-table"
import Image from 'next/image'
import { MoreHorizontal } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteProduct } from "@/lib/actions/product.actions"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({row}) => {
      const url = `${row.getValue('thumbnail')}`;
      return <Image src={url!} width={100} height={40} alt="thumbnail"/>
    }
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "visible",
    header: "Visible",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      const {toast} = useToast()
 
      const handleDeleteProduct = async (id: string) => {
        const deleteAction = await deleteProduct(id);

        if (deleteAction.error) {
          toast({
            title: "An error occured!",
            description: deleteAction.error,
          })
        } else {
          toast({
            title: "Product deleted successfully",
          })
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleDeleteProduct(product._id)}
            >Delete this product</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
