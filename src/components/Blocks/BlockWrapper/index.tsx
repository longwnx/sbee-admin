'use client'

import { Popover } from 'antd'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { css } from '@emotion/css'
import {
  BlockRender,
  SettingBlockActionButton,
  SettingBlockActionLink,
  SettingBlockBannerCategories,
  SettingBlockBrand,
  SettingBlockCatalog,
  SettingBlockCatalogCollapse,
  SettingBlockCollection,
  SettingBlockContentHtml,
  SettingBlockCountdown,
  SettingBlockCustomBanner,
  SettingBlockCustomImage,
  SettingBlockCustomUrl,
  SettingBlockCustomVideo,
  SettingBlockImageSlide,
  SettingBlockProductDetail,
  SettingBlockProductDetailCustomFields,
  SettingBlockProductDetailHtml,
  SettingBlockProductDetailImage,
  SettingBlockProductDetailVideo,
  SettingBlockSearchBar,
  SettingBlockSpace,
  SettingBlockStoreLocation,
  SettingBlockWrapper,
  Toolbar,
} from '@/components'
import { useDevice, useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { BlockType } from '@/types'

type Props = {
  block: PageBlock
  index: number
  isEdit?: boolean
}

export const BlockWrapper: React.FC<Props> = ({ block, index, isEdit = false }) => {
  const classNameHover = css({
    '&:hover': {
      '.__isHoverItem': {
        display: 'block',
      },
    },
    '.__isHoverItem': {
      display: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: '2px solid #C5AE8F',
      zIndex: 10,
    },
  })
  const { isMobile } = useDevice()
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { onRemoveBlockItem } = useModifyUiPages()
  const [isVisibleToolbar, setIsVisibleToolbar] = useState(false)
  const [isVisibleSetting, setIsVisibleSetting] = useState(false)
  const isVisibleDesign = useMemo(() => {
    switch (block?.type) {
      case BlockType.RecentlyViewed:
        return false
      default:
        return true
    }
  }, [block?.type])

  useEffect(() => {
    if (!isVisibleSetting) {
      setCurrentIndexBlock(undefined)
    }
  }, [isVisibleSetting, setCurrentIndexBlock])

  const { selectedBlock } = useSelectedPageBlock()

  const _renderSettings = useMemo(() => {
    // NEW_BLOCK
    switch (selectedBlock?.type) {
      case BlockType.SearchBar:
        return {
          title: 'Search bar',
          description: 'Allow app users to quickly find the products they are looking for',
          children: <SettingBlockSearchBar setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.CatalogGrid:
        return {
          title: 'Category grid',
          description: 'Feature up to 8 categories in a grid of up to 6 columns',
          children: <SettingBlockCatalog setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.CatalogCollapse:
        return {
          title: 'Settings',
          description: "Upload an image and create a custom banner to grab customer's attention on the homepage",
          children: <SettingBlockCatalogCollapse setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.BannerCategories:
        return {
          title: 'Settings',
          description: 'Design a top category, with or without an image banner',
          children: <SettingBlockBannerCategories setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Brand:
        return {
          title: 'Settings',
          description: 'Design a top category, with or without an image banner',
          children: <SettingBlockBrand setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Store:
        return {
          title: 'Store locator settings',
          description: 'Specify a store address, contact information, and other details',
          children: <SettingBlockStoreLocation setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Countdown:
        return {
          title: 'Countdown',
          description: 'Add a countdown timer to create a sense of urgency for app users and drive sales',
          children: <SettingBlockCountdown setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Banner:
        return {
          title: 'Image banner',
          description: 'Upload a custom image banner and decide where it should take app users to',
          children: <SettingBlockCustomImage setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.CustomBanner:
        return {
          title: 'Settings',
          description: 'Design a custom banner and link it to destination',
          children: <SettingBlockCustomBanner setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Slider:
        return {
          title: 'Image slider',
          description: 'Enhance storytelling and showcase multiple products, categories, or services in an image slider',
          children: <SettingBlockImageSlide setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Grid:
        return {
          title: 'Image grid',
          description: 'Upload up to 8 images and arrange them in a grid of up to 6 columns',
          children: <SettingBlockImageSlide setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.InlineHtmlContent:
        return {
          title: 'Content HTML',
          description: '',
          children: <SettingBlockContentHtml setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Webpage:
        return {
          title: 'Insert URL',
          description: 'Insert link to a webpage',
          children: <SettingBlockCustomUrl setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Video:
        return {
          title: 'Video',
          description: 'Upload a short video to engage app users and quickly deliver a message',
          children: <SettingBlockCustomVideo setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.ActionButton:
        return {
          title: 'Setting content',
          description: '',
          children: <SettingBlockActionButton setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Spacer:
        return {
          title: 'Spacer',
          description: 'Add an adjustable amount of empty space between blocks',
          children: <SettingBlockSpace setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.ProductGrid:
        return {
          title: 'Product grid',
          description: 'Feature the first 8 products of a category in a 2-column grid',
          children: <SettingBlockCollection setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.ProductCarousel:
        return {
          title: 'Product carousel',
          description: 'Feature the first 8 products of a category in a carousel',
          children: <SettingBlockCollection setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.ProductParallax:
        return {
          title: 'Product swipeable cards',
          description: 'Feature the first 8 products of a category as swipeable cards',
          children: <SettingBlockCollection setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Url:
        return {
          title: 'Action link',
          description: '',
          children: <SettingBlockActionLink setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Variants:
        return {
          title: 'Variants',
          description: '',
          children: <SettingBlockProductDetail setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Description:
        return {
          title: 'Description',
          description: '',
          children: <SettingBlockProductDetail setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Reviews:
        return {
          title: 'Reviews',
          description: '',
          children: <SettingBlockProductDetail settingPresentationStyle={false} setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.RelatedProducts:
        return {
          title: 'Related products',
          description: '',
          children: <SettingBlockProductDetail settingPresentationStyle={false} setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.Html:
        return {
          title: 'Content HTML',
          description: '',
          children: <SettingBlockProductDetailHtml setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.ProductDetailImage:
        return {
          title: 'Custom image banner',
          description: '',
          children: <SettingBlockProductDetailImage setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.CustomFields:
        return {
          title: 'Manage product attributes',
          description: '',
          children: <SettingBlockProductDetailCustomFields setIsVisible={setIsVisibleSetting} />,
        }
      case BlockType.ProductDetailVideo:
        return {
          title: 'Custom video',
          description: '',
          children: <SettingBlockProductDetailVideo setIsVisible={setIsVisibleSetting} />,
        }
      default:
        return
    }
  }, [selectedBlock?.type])

  return (
    <>
      <div className="w-full relative">
        <Popover
          open={
            block?.editable !== false &&
            isEdit &&
            isVisibleToolbar &&
            block?.type !== BlockType.Gallery &&
            block?.type !== BlockType.Information
          }
          onOpenChange={setIsVisibleToolbar}
          destroyTooltipOnHide
          placement={isMobile ? 'bottom' : 'right'}
          trigger="hover"
          content={
            <Toolbar
              isVisibleDesign={isVisibleDesign}
              isVisibleDelete={block?.deleteable !== false}
              onDesign={(e) => {
                if (!isEdit) {
                  return
                }
                e.stopPropagation()
                setCurrentIndexBlock(index)
                setIsVisibleToolbar(false)
                setIsVisibleSetting(true)
              }}
              onDelete={() => onRemoveBlockItem(index)}
            />
          }
          zIndex={20}
        >
          <div className={classNames(isEdit ? classNameHover : '')}>
            {![BlockType.CatalogCollapse, BlockType.BannerCategories].includes(block?.type) && (
              <div className="__isHoverItem" />
            )}
            <BlockRender block={block} index={index} />
          </div>
        </Popover>
      </div>
      <SettingBlockWrapper
        isVisible={isVisibleSetting}
        setIsVisible={setIsVisibleSetting}
        title={_renderSettings?.title}
        description={_renderSettings?.description}
      >
        {_renderSettings?.children}
      </SettingBlockWrapper>
    </>
  )
}
