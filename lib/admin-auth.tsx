'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AdminContext = () => {
  const router = useRouter()
  const encryptedKey =
    typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null

  useEffect(() => {
    const authenticate = () => {
      const accessKey = encryptedKey && atob(encryptedKey)
      const auth = accessKey && accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()
      if (!auth) {
        router.push('/')
      }
    }
    authenticate()
  }, [encryptedKey])

  return <></>
}

export default AdminContext
