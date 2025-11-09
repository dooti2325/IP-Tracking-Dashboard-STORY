'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWalletStore } from '@/store/walletStore'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  const router = useRouter()
  const { isConnected } = useWalletStore()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Dashboard />
    </main>
  )
}

