'use client'

import { useMemo } from 'react'
import { IPAsset, LicenseType, IPType } from '@/types'
import { TrendingUp, Award, Layers, DollarSign, PieChart, Activity } from 'lucide-react'

interface AnalyticsProps {
  assets: IPAsset[]
}

export default function Analytics({ assets }: AnalyticsProps) {
  const stats = useMemo(() => {
    const totalAssets = assets.length
    const originals = assets.filter(a => a.ipType === 'Original').length
    const remixes = assets.filter(a => a.ipType === 'Remix').length
    const derivatives = assets.filter(a => a.ipType === 'Derivative').length
    
    const totalRevenue = assets.reduce((sum, a) => sum + a.royalties.totalEarned, 0)
    const avgRoyaltyRate = assets.length > 0 
      ? assets.reduce((sum, a) => sum + a.royalties.percentage, 0) / assets.length 
      : 0
    
    const licenseDistribution: Record<LicenseType, number> = {
      'CC0': 0,
      'CC-BY': 0,
      'CC-BY-SA': 0,
      'Commercial': 0,
      'Remix-Allowed': 0,
      'Attribution-Only': 0,
    }
    assets.forEach(asset => {
      licenseDistribution[asset.licenseType]++
    })
    
    const mostPopularLicense = Object.entries(licenseDistribution)
      .sort(([, a], [, b]) => b - a)[0]
    
    const assetsWithDerivatives = assets.filter(a => a.derivatives.length > 0).length
    const totalDerivativesCount = assets.reduce((sum, a) => sum + a.derivatives.length, 0)
    const avgDerivativesPerAsset = totalAssets > 0 ? totalDerivativesCount / totalAssets : 0
    
    const mostDerivativesAsset = assets.reduce((max, asset) => 
      asset.derivatives.length > (max?.derivatives.length || 0) ? asset : max
    , assets[0])
    
    const tagUsage: Record<string, number> = {}
    assets.forEach(asset => {
      asset.tags.forEach(tag => {
        tagUsage[tag] = (tagUsage[tag] || 0) + 1
      })
    })
    const topTags = Object.entries(tagUsage)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
    
    const recentAssets = [...assets]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5)
    
    return {
      totalAssets,
      originals,
      remixes,
      derivatives,
      totalRevenue,
      avgRoyaltyRate,
      licenseDistribution,
      mostPopularLicense,
      assetsWithDerivatives,
      avgDerivativesPerAsset,
      mostDerivativesAsset,
      topTags,
      recentAssets
    }
  }, [assets])

  if (assets.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-900/30 rounded-lg border border-slate-700">
        <Activity className="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <p className="text-gray-400">No data available for analytics</p>
        <p className="text-sm text-gray-500 mt-2">Register some IP assets to see insights</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-blue-400 font-medium">Total Assets</h3>
            <PieChart className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalAssets}</p>
          <div className="mt-3 text-sm text-blue-300">
            {stats.originals} Original • {stats.remixes} Remix • {stats.derivatives} Derivative
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-green-400 font-medium">Total Revenue</h3>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalRevenue.toFixed(4)} ETH</p>
          <div className="mt-3 text-sm text-green-300">
            Avg royalty: {stats.avgRoyaltyRate.toFixed(1)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-purple-400 font-medium">Derivatives</h3>
            <Layers className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.assetsWithDerivatives}</p>
          <div className="mt-3 text-sm text-purple-300">
            {stats.avgDerivativesPerAsset.toFixed(1)} per asset avg
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-orange-400 font-medium">Top License</h3>
            <Award className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.mostPopularLicense?.[0] || 'N/A'}</p>
          <div className="mt-3 text-sm text-orange-300">
            Used {stats.mostPopularLicense?.[1] || 0} times
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* License Distribution */}
        <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            License Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.licenseDistribution).map(([license, count]) => {
              const percentage = stats.totalAssets > 0 ? (count / stats.totalAssets) * 100 : 0
              return (
                <div key={license}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">{license}</span>
                    <span className="text-sm text-gray-400">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Tags */}
        <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Popular Tags
          </h3>
          <div className="space-y-3">
            {stats.topTags.map(([tag, count], index) => (
              <div key={tag} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">{tag}</span>
                    <span className="text-gray-400 text-sm">{count} assets</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div 
                      className="bg-primary-500 h-1.5 rounded-full"
                      style={{ width: `${(count / stats.totalAssets) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Successful Asset */}
      {stats.mostDerivativesAsset && stats.mostDerivativesAsset.derivatives.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-6">
          <h3 className="text-yellow-400 font-semibold text-lg mb-3 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Most Remixed Asset
          </h3>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="text-white font-semibold text-xl mb-1">{stats.mostDerivativesAsset.title}</h4>
              <p className="text-gray-300 text-sm mb-2">{stats.mostDerivativesAsset.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-yellow-300">
                  {stats.mostDerivativesAsset.derivatives.length} derivatives
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{stats.mostDerivativesAsset.licenseType}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
