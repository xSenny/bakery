'use client'
import Link from 'next/link'
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

const AdminNavbar = () => {
  const path = usePathname()

  return (
    <div className="hidden border-r bg-foreground/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <div className="h-6 w-6" />
            <span className="">Bakery</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              href="/admin"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${path === '/admin' && 'bg-muted text-primary'}`}
              prefetch={false}
            >
              <div className="h-4 w-4" />
              Products
            </Link>
            <Link
              href="/admin/orders"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${path === '/admin/orders' && 'bg-muted text-primary'}`}
              prefetch={false}
            >
              <div className="h-4 w-4" />
              Orders
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar
