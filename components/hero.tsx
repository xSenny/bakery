import Image from 'next/image'
import React from 'react'
import Header from './header'
import { Button } from './ui/button'
import { Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="min-h-screen w-full bg-background sm:hero flex justify-between flex-col items-center">
      <Header />
      <div className="flex justify-between py-20 md:py-0 md:justify-center gap-20 md:gap-4 items-center flex-col md:flex-row">
        <div className="flex items-center flex-col gap-5">
          <h1 className="text-primary text-[30px] lg:text-[50px] font-bold w-[70%]">
            Sweet moments, freshly baked with love
          </h1>
          <p className="text-black text-[18px] lg:text-[20px] w-[70%]">
            Customized cakes, treats and every thing sweet for all your special moments.
          </p>
          <Button className="bg-primary" asChild>
            <Link href="/shop">Shop now</Link>
          </Button>
          <div className="flex gap-8 text-primary">
            <Link href="https://instagram.com">
              <Instagram />
            </Link>
            <Link href="https://facebook.com">
              <Facebook />
            </Link>
          </div>
        </div>
        <Image
          src="/assets/svgs/donuts.svg"
          width={700}
          height={700}
          alt="donuts"
          className="h-[200px] sm:h-[300px] lg:h-[400px]"
        />
      </div>
      <div></div>
    </div>
  )
}

export default Hero
