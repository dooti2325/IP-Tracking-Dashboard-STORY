'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { LicenseType, IPType } from '@/types'

interface SearchFilterProps {
  onSearchChange: (search: string) => void
  onFilterChange: (filters: FilterOptions) => void
}

export interface FilterOptions {
  licenseTypes: LicenseType[]
  ipTypes: IPType[]
  tags: string[]
}

const LICENSE_OPTIONS: LicenseType[] = ['CC0', 'CC-BY', 'CC-BY-SA', 'Commercial', 'Remix-Allowed', 'Attribution-Only']
const IP_TYPE_OPTIONS: IPType[] = ['Original', 'Remix', 'Derivative']
const TAG_OPTIONS = ['AI', 'Music', 'Code', 'Art', 'Writing', 'Video', 'Design', 'Data', 'Model']

export default function SearchFilter({ onSearchChange, onFilterChange }: SearchFilterProps) {
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    licenseTypes: [],
    ipTypes: [],
    tags: [],
  })

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange(value)
  }

  const toggleFilter = <K extends keyof FilterOptions>(
    category: K,
    value: FilterOptions[K][number]
  ) => {
    const newFilters = { ...filters }
    const array = newFilters[category] as any[]
    
    if (array.includes(value)) {
      newFilters[category] = array.filter((v) => v !== value) as any
    } else {
      newFilters[category] = [...array, value] as any
    }
    
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      licenseTypes: [],
      ipTypes: [],
      tags: [],
    }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const activeFilterCount = filters.licenseTypes.length + filters.ipTypes.length + filters.tags.length

  return (
    <div className="mb-6 space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by title, description, or creator..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            showFilters || activeFilterCount > 0
              ? 'bg-primary-600 text-white'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
          }`}
        >
          <Filter className="w-5 h-5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-white text-primary-600 px-2 py-0.5 rounded-full text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-semibold">Filter Options</h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">IP Type</h4>
            <div className="flex flex-wrap gap-2">
              {IP_TYPE_OPTIONS.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleFilter('ipTypes', type)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.ipTypes.includes(type)
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">License Type</h4>
            <div className="flex flex-wrap gap-2">
              {LICENSE_OPTIONS.map((license) => (
                <button
                  key={license}
                  onClick={() => toggleFilter('licenseTypes', license)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.licenseTypes.includes(license)
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {license}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleFilter('tags', tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.tags.includes(tag)
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
