import { IPAsset } from '@/types'

export function exportToJSON(assets: IPAsset[], filename: string = 'ip-assets.json') {
  const dataStr = JSON.stringify(assets, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  downloadFile(dataBlob, filename)
}

export function exportToCSV(assets: IPAsset[], filename: string = 'ip-assets.csv') {
  if (assets.length === 0) return

  const headers = [
    'ID',
    'Title',
    'Description',
    'Creator',
    'License Type',
    'IP Type',
    'Tags',
    'Parent ID',
    'File URL',
    'Token ID',
    'Royalty %',
    'Total Earned',
    'Derivatives Count',
    'Created At'
  ]

  const rows = assets.map(asset => [
    asset.id,
    `"${asset.title.replace(/"/g, '""')}"`,
    `"${asset.description.replace(/"/g, '""')}"`,
    asset.creator,
    asset.licenseType,
    asset.ipType,
    `"${asset.tags.join(', ')}"`,
    asset.parentId || '',
    asset.fileUrl || '',
    asset.tokenId || '',
    asset.royalties.percentage,
    asset.royalties.totalEarned,
    asset.derivatives.length,
    new Date(asset.timestamp).toISOString()
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  downloadFile(dataBlob, filename)
}

export function exportGraphData(assets: IPAsset[], filename: string = 'ip-graph.json') {
  const nodes = assets.map(asset => ({
    id: asset.id,
    title: asset.title,
    type: asset.ipType,
    license: asset.licenseType
  }))

  const links = assets
    .filter(asset => asset.parentId)
    .map(asset => ({
      source: asset.parentId,
      target: asset.id
    }))

  const graphData = { nodes, links }
  const dataStr = JSON.stringify(graphData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  downloadFile(dataBlob, filename)
}

function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
