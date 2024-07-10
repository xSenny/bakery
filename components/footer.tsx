import React from 'react'
import { Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-foreground py-10 w-full border-t-red-200 border-t-2">
      <div className='w-full lg:w-[50%] pl-10 lg:pl-20 flex flex-col gap-8'>
        <h2 className="text-primary text-[35px]">Bakery</h2>
        <p className="text-black text-[18px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className="flex gap-4 text-primary">
            <Link href="https://instagram.com">
              <Instagram />
            </Link>
            <Link href="https://facebook.com">
              <Facebook />
            </Link>
          </div>
      </div>
    </div>
  )
}

export default Footer
