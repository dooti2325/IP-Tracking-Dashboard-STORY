export type LicenseType = 
  | 'CC0' 
  | 'CC-BY' 
  | 'CC-BY-SA' 
  | 'Commercial' 
  | 'Remix-Allowed' 
  | 'Attribution-Only'

export type IPType = 'Original' | 'Remix' | 'Derivative'

export interface IPAsset {
  id: string
  title: string
  description: string
  creator: string
  creatorName?: string
  licenseType: LicenseType
  tags: string[]
  ipType: IPType
  parentId?: string
  fileUrl?: string
  fileHash?: string
  timestamp: number
  tokenId?: string
  royalties: {
    percentage: number
    totalEarned: number
  }
  derivatives: string[] // Array of child IP IDs
}

export interface IPGraphNode {
  id: string
  asset: IPAsset
  x?: number
  y?: number
  vx?: number
  vy?: number
}

export interface IPGraphEdge {
  source: string
  target: string
}

