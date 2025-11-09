'use client'

export function AssetCardSkeleton() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 bg-slate-700 rounded w-48"></div>
            <div className="h-5 w-16 bg-slate-700 rounded-full"></div>
          </div>
          <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="h-3 bg-slate-700 rounded w-16 mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-20"></div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="h-9 bg-slate-700 rounded w-32"></div>
        <div className="h-9 bg-slate-700 rounded w-32"></div>
      </div>
    </div>
  )
}

export function AssetListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <AssetCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 animate-pulse">
      <div className="h-3 bg-slate-700 rounded w-20 mb-2"></div>
      <div className="h-8 bg-slate-700 rounded w-16"></div>
    </div>
  )
}
