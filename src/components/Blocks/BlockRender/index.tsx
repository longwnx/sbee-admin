'use client'

import { useMemo } from 'react'
import {
  BlockActionButton,
  BlockActionLink,
  BlockBanner,
  BlockBannerCategory,
  BlockBrand,
  BlockCatalogCollapse,
  BlockCatalogGrid,
  BlockContentHtml,
  BlockCountdown,
  BlockCustomBanner,
  BlockCustomUrl,
  BlockImageGrid,
  BlockImageSlide,
  BlockProductCarousel,
  BlockProductDetailCustomField,
  BlockProductDetailDescription,
  BlockProductDetailGallery,
  BlockProductDetailHtml,
  BlockProductDetailImage,
  BlockProductDetailInformation,
  BlockProductDetailRelated,
  BlockProductDetailReviews,
  BlockProductDetailVariants,
  BlockProductDetailVideo,
  BlockProductGrid,
  BlockProductParallax,
  BlockRecentlyViewed,
  BlockSearchBar,
  BlockSpacer,
  BlockStoreLocation,
  BlockVideo,
} from '@/components'
import { BlockType } from '@/types'

type Props = {
  block: PageBlock
  index: number
}

export const BlockRender: React.FC<Props> = ({ block, index }) => {
  // NEW_BLOCK
  const _renderBlock = useMemo(() => {
    switch (block?.type) {
      case BlockType.Banner:
        return <BlockBanner block={block} />
      case BlockType.CustomBanner:
        return <BlockCustomBanner block={block} />
      case BlockType.Slider:
        return <BlockImageSlide block={block} />
      case BlockType.Video:
        return <BlockVideo block={block} />
      case BlockType.Countdown:
        return <BlockCountdown block={block} />
      case BlockType.SearchBar:
        return <BlockSearchBar block={block} />
      case BlockType.CatalogGrid:
        return <BlockCatalogGrid block={block} />
      case BlockType.RecentlyViewed:
        return <BlockRecentlyViewed />
      case BlockType.ProductGrid:
        return <BlockProductGrid block={block} />
      case BlockType.ProductCarousel:
        return <BlockProductCarousel block={block} />
      case BlockType.ProductParallax:
        return <BlockProductParallax block={block} />
      case BlockType.Grid:
        return <BlockImageGrid block={block} />
      case BlockType.InlineHtmlContent:
        return <BlockContentHtml block={block} />
      case BlockType.Webpage:
        return <BlockCustomUrl block={block} />
      case BlockType.ActionButton:
        return <BlockActionButton block={block} />
      case BlockType.Spacer:
        return <BlockSpacer block={block} />
      case BlockType.ProductDetailImage:
        return <BlockProductDetailImage block={block} />
      case BlockType.ProductDetailVideo:
        return <BlockProductDetailVideo block={block} />
      case BlockType.Gallery:
        return <BlockProductDetailGallery />
      case BlockType.Information:
        return <BlockProductDetailInformation />
      case BlockType.Variants:
        return <BlockProductDetailVariants block={block} />
      case BlockType.Description:
        return <BlockProductDetailDescription block={block} />
      case BlockType.Reviews:
        return <BlockProductDetailReviews block={block} />
      case BlockType.RelatedProducts:
        return <BlockProductDetailRelated block={block} />
      case BlockType.CustomFields:
        return <BlockProductDetailCustomField block={block} />
      case BlockType.Url:
        return <BlockActionLink block={block} />
      case BlockType.Html:
        return <BlockProductDetailHtml block={block} />
      case BlockType.CatalogCollapse:
        return <BlockCatalogCollapse block={block} blockIndex={index} />
      case BlockType.BannerCategories:
        return <BlockBannerCategory block={block} />
      case BlockType.Brand:
        return <BlockBrand block={block} />
      case BlockType.Store:
        return <BlockStoreLocation block={block} />
      default:
        return null
    }
  }, [block, index])

  return <div className="w-full relative">{_renderBlock}</div>
}
