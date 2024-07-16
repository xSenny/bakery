"use client"

import { IOrder } from "@/lib/database/models/order.model"
import { ColumnDef } from "@tanstack/react-table"
import { getTimePassedSince } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { changeStatus } from '@/lib/actions/order.actions'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"


export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const passed = getTimePassedSince(new Date(row.getValue("createdAt"))) 
      return <div className="font-medium">{passed}</div>
    },
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "description",
    header: "Content",
    cell: ({ row }) => {
      const description: string = row.getValue('description');

      const list = description.split('\n').map(line => line.trim())
      return (
        <Dialog>
          <DialogTrigger>See</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>The order content:</DialogTitle>
              <DialogDescription>
                {list.map(l => (
                  <p key={l}>{l}</p>
                ))}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue('status');

      switch (status) {
        case 'Pending': return <Badge className="bg-[#7CB342] text-foreground">{status}</Badge>
        case 'Preparing': return <Badge className="bg-[#FFA000] text-foreground">{status}</Badge>
        case 'Shipped': return <Badge className="bg-[#42A5F5] text-foreground">{status}</Badge>
        case 'Delivered': return <Badge className="bg-[#E53935] text-foreground">{status}</Badge>
        case 'Canceled': return <Badge className="bg-[#E0E0E0] text-foreground">{status}</Badge>
        case 'Returned': return <Badge className="bg-[#7E57C2] text-foreground">{status}</Badge>
      }
    }
  },
  {
    id: "actions",
    header: "Change status",
    cell: ({ row }) => {
      const status = row.getValue('status') as 'Pending' | 'Preparing' | 'Shipped' | 'Delivered' | 'Canceled' | 'Returned';
      const id = row.original._id
      const handleOnChange = async (e: string) => {
        await changeStatus(id!, e)
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={status} onValueChange={(e) => {handleOnChange(e)}}>
              {['Pending', 'Preparing', 'Shipped', 'Delivered', 'Canceled', 'Returned'].map((e: string) => (
                <DropdownMenuRadioItem value={e} key={e}>{e}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
  
]
