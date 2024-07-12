'use client'
import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'

const AdminModal = () => {

  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false)
  const [passkey, setPasskey] = useState('')
  const [error, setError] = useState('')

  const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null;

  useEffect(() => {
    const authenticate = () => {
      const accessKey = encryptedKey && atob(encryptedKey);

      if (path) {
        const auth = accessKey && accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()
        if (accessKey && auth){
          setOpen(false)
          router.push('/admin')
        } else {
          setOpen(true)
        }
      }
    }
    authenticate()
  }, [encryptedKey])

  const closeModal = () => {
    setOpen(false);
    router.push('/')
  }

  const validatePassKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const auth = passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()
    if (auth) {
      const encryptedKey = btoa(passkey);
      localStorage.setItem('accessKey', encryptedKey);

      setOpen(false);
      router.push('/admin')
    } else {
      setError('Invalid password. Please try again!')
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className='flex items-center flex-col gap-8'>
          <DialogHeader>
            <DialogTitle className="text-center text-black">Your Admin password</DialogTitle>
          </DialogHeader>
          <InputOTP maxLength={6} autoFocus className="text-black" value={passkey} onChange={setPasskey}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error}
          <Button onClick={validatePassKey}>Validate</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminModal
