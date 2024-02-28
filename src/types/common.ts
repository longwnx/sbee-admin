import { BlockType } from '@/types'

export type BlockHandle = {
  type: BlockType
  image?: string
}

export type MediaLibrary = {
  id: string
  url: string
  fileName?: string
  name?: string
  isSelected: boolean
  ratio?: number
  width?: number
  height?: number
  thumbnailUrl?: string
  originalUrl: string
}
