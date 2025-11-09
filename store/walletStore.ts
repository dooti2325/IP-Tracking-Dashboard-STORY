import { create } from 'zustand'
import { ethers } from 'ethers'
import { useToastStore } from './toastStore'

interface WalletState {
  isConnected: boolean
  address: string | null
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  provider: null,
  signer: null,
  connectWallet: async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      useToastStore.getState().addToast('Please install MetaMask to connect your wallet', 'error')
      return
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      // Save connection state to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('wallet-connected', 'true')
      }

      set({
        isConnected: true,
        address,
        provider,
        signer,
      })
      useToastStore.getState().addToast('Wallet connected successfully!', 'success')
    } catch (error) {
      console.error('Error connecting wallet:', error)
      useToastStore.getState().addToast('Failed to connect wallet. Please try again.', 'error')
    }
  },
  disconnectWallet: () => {
    // Remove connection state from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wallet-connected')
    }

    set({
      isConnected: false,
      address: null,
      provider: null,
      signer: null,
    })
    useToastStore.getState().addToast('Wallet disconnected', 'info')
  },
}))

