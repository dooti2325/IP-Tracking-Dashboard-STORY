'use client'

import { useAutoConnect } from '@/hooks/useAutoConnect'
import ToastContainer from '@/components/ToastContainer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useAutoConnect()
  
  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}
