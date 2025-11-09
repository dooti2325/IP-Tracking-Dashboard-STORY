'use client'

import { useEffect } from 'react'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  }

  const styles = {
    success: 'bg-green-500/90 text-white border-green-600',
    error: 'bg-red-500/90 text-white border-red-600',
    info: 'bg-blue-500/90 text-white border-blue-600',
    warning: 'bg-yellow-500/90 text-white border-yellow-600',
  }

  return (
    <div
      className={`${styles[type]} border rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 min-w-[300px] max-w-[500px] animate-slide-in`}
    >
      {icons[type]}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
