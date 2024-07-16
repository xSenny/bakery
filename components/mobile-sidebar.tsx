'use client'
import React from 'react'
import {Menu} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Cart from '@/components/cart'


const MobileSidebar = () => {

  const path = usePathname()

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="lg:hidden"/>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${path === '/' && 'bg-muted text-primary'}`}
                prefetch={false}
              >
                <div className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/shop"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${path === '/shop' && 'bg-muted text-primary'}`}
                prefetch={false}
              >
                <div className="h-4 w-4" />
                Shop
              </Link>
              <Link
                href="?admin=true"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${path === '/admin' && 'bg-muted text-primary'}`}
                prefetch={false}
              >
                <div className="h-4 w-4" />
                Admin
              </Link>
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary false">
                <div className="h-4 w-4"/>
                <Cart /> 
              </div>
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>

  )
}

export default MobileSidebar
