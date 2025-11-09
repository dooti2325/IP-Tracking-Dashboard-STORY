'use client'

import { useWalletStore } from '@/store/walletStore'
import { Wallet, LogOut } from 'lucide-react'

export default function WalletConnect() {
  const { isConnected, address, connectWallet, disconnectWallet } = useWalletStore()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-green-400">{formatAddress(address!)}</span>
          </div>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-400 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-lg"
        >
          <Wallet className="w-5 h-5" />
          Connect Wallet
        </button>
      )}
    </div>
  )
}

