'use client'

import { useEffect } from 'react'
import { useWalletStore } from '@/store/walletStore'

export function useAutoConnect() {
  const { connectWallet, isConnected } = useWalletStore()

  useEffect(() => {
    // Only auto-connect if previously connected and not currently connected
    if (typeof window !== 'undefined' && !isConnected && localStorage.getItem('wallet-connected') === 'true') {
      // Add a small delay to ensure the component is mounted
      const timer = setTimeout(() => {
        connectWallet().catch((error) => {
          console.error('Auto-connect failed:', error)
          // Remove the flag if auto-connect fails
          localStorage.removeItem('wallet-connected')
        })
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isConnected, connectWallet])
}