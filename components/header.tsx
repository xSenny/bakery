import { headerLinks } from '@/constants'
import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AdminModal from './admin-modal'

const Header = () => {
  return (
    <div className={`hidden sm:flex w-full lg:w-[80%] rounded-b-[30px] h-[70px] lg:h-[99px] bg-foreground justify-between items-center px-8 text-black`}>
      <h1 className="text-accent text-[35px] font-regular">Bakery</h1>
      <div className='flex gap-8'>
        {headerLinks.map((link, index) => (
          <Link href={link.route} key={index}>{link.label}</Link>
        ))}
      </div>
      <div className="flex gap-8">
        <Link href="?admin=true">Admin</Link>
        <div className="flex gap-6">
          <Heart />
          <ShoppingCart />
        </div>
      </div>
    </div>
  )
}

export default Header
