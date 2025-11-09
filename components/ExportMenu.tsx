'use client'

import { useState } from 'react'
import { Download, FileJson, FileSpreadsheet, Network } from 'lucide-react'
import { IPAsset } from '@/types'
import { exportToJSON, exportToCSV, exportGraphData } from '@/lib/exportUtils'
import { useToastStore } from '@/store/toastStore'

interface ExportMenuProps {
  assets: IPAsset[]
  label?: string
}

export default function ExportMenu({ assets, label = 'Export' }: ExportMenuProps) {
  const [showMenu, setShowMenu] = useState(false)
  const { addToast } = useToastStore()

  const handleExport = (format: 'json' | 'csv' | 'graph') => {
    if (assets.length === 0) {
      addToast('No data to export', 'warning')
      return
    }

    try {
      switch (format) {
        case 'json':
          exportToJSON(assets)
          addToast('Exported to JSON successfully', 'success')
          break
        case 'csv':
          exportToCSV(assets)
          addToast('Exported to CSV successfully', 'success')
          break
        case 'graph':
          exportGraphData(assets)
          addToast('Exported graph data successfully', 'success')
          break
      }
      setShowMenu(false)
    } catch (error) {
      console.error('Export error:', error)
      addToast('Failed to export data', 'error')
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        {label}
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
            <button
              onClick={() => handleExport('json')}
              className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 transition-colors flex items-center gap-3"
            >
              <FileJson className="w-4 h-4" />
              <div>
                <div className="font-medium">JSON</div>
                <div className="text-xs text-gray-400">Full data export</div>
              </div>
            </button>
            <button
              onClick={() => handleExport('csv')}
              className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 transition-colors flex items-center gap-3"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <div>
                <div className="font-medium">CSV</div>
                <div className="text-xs text-gray-400">Spreadsheet format</div>
              </div>
            </button>
            <button
              onClick={() => handleExport('graph')}
              className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 transition-colors flex items-center gap-3"
            >
              <Network className="w-4 h-4" />
              <div>
                <div className="font-medium">Graph Data</div>
                <div className="text-xs text-gray-400">Nodes & links only</div>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
