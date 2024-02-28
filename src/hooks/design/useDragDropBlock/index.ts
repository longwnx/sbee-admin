import { filter, find, forEach, includes, isEmpty, map, reverse } from 'lodash'
import { useCallback, useMemo } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { v4 } from 'uuid'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { appPageState, currentIndexBlockState, currentIndexPageState } from '@/recoil'
import { BlockType } from '@/types'
import { DEFAULT_NEW_BLOCK, insertItemToArr, removeItemInArray, reorderItemInArray } from '@/utils'

export const useDragDropBlock = () => {
  const appPage = useRecoilValue(appPageState)
  const currentIndexPage = useRecoilValue(currentIndexPageState)
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedPage } = useSelectedPageBlock()
  const { onUpdatePages } = useModifyUiPages()
  // NEW_BLOCK
  const defaultBlock: any = useCallback((type: BlockType) => {
    switch (type) {
      case BlockType.Banner:
        return DEFAULT_NEW_BLOCK.BANNER
      case BlockType.CustomBanner:
        return DEFAULT_NEW_BLOCK.CUSTOM_BANNER
      case BlockType.Slider:
        return DEFAULT_NEW_BLOCK.SLIDER
      case BlockType.Grid:
        return DEFAULT_NEW_BLOCK.GRID
      case BlockType.InlineHtmlContent:
        return DEFAULT_NEW_BLOCK.CONTENT_HTML
      case BlockType.Webpage:
        return DEFAULT_NEW_BLOCK.WEB_PAGE
      case BlockType.ActionButton:
        return DEFAULT_NEW_BLOCK.ACTION_BUTTON
      case BlockType.Spacer:
        return DEFAULT_NEW_BLOCK.SPACE
      case BlockType.Video:
        return DEFAULT_NEW_BLOCK.VIDEO
      case BlockType.Countdown:
        return DEFAULT_NEW_BLOCK.COUNTDOWN
      case BlockType.SearchBar:
        return DEFAULT_NEW_BLOCK.SEARCH_BAR
      case BlockType.CatalogGrid:
        return DEFAULT_NEW_BLOCK.CATALOG_GRID
      case BlockType.RecentlyViewed:
        return DEFAULT_NEW_BLOCK.RECENTLY_VIEWED
      case BlockType.Store:
        return DEFAULT_NEW_BLOCK.STORE

      case BlockType.ProductGrid:
      case BlockType.ProductCarousel:
      case BlockType.ProductParallax:
        return {
          ...DEFAULT_NEW_BLOCK.PRODUCT,
          type,
        }

      case BlockType.Url:
        return DEFAULT_NEW_BLOCK.ACTION_LINK
      case BlockType.Html:
        return DEFAULT_NEW_BLOCK.HTML
      case BlockType.ProductDetailImage:
        return DEFAULT_NEW_BLOCK.PRODUCT_DETAIL_IMAGE
      case BlockType.ProductDetailVideo:
        return DEFAULT_NEW_BLOCK.PRODUCT_DETAIL_VIDEO
      case BlockType.Variants:
        return DEFAULT_NEW_BLOCK.VARIANTS
      case BlockType.Description:
        return DEFAULT_NEW_BLOCK.DESCRIPTION
      case BlockType.RelatedProducts:
        return DEFAULT_NEW_BLOCK.RELATED_PRODUCTS
      case BlockType.Reviews:
        return DEFAULT_NEW_BLOCK.REVIEWS
      case BlockType.CustomFields:
        return DEFAULT_NEW_BLOCK.CUSTOM_FIELDS
      default:
        return
    }
  }, [])

  const initPage = useMemo(
    () => [
      {
        id: v4(),
        title: {
          text: 'Home 1',
        },
        backgroundColor: '#FFFFFF',
        blocks: [],
      },
    ],
    []
  )

  const onDropCatalogFromSidebar = useCallback(
    async (category?: string, endIndex?: number) => {
      const cate: any = JSON.parse(category || '{}')
      const pages: AppPageLayout[] = !isEmpty(appPage?.pages) ? appPage?.pages || initPage : initPage
      const newPages = map(pages, (page, index) => ({
        ...page,
        ...(index === currentIndexPage && {
          blocks: insertItemToArr(
            page?.blocks,
            {
              type: BlockType.CatalogCollapse,
              id: v4(),
              category: {
                ...cate,
                id: cate?.id,
                name: cate?.name || '',
                image: {
                  src: cate?.image || '',
                  ratio: 1,
                  visible: true,
                },
                children: [],
                visibleName: true,
              },
            },
            endIndex
          ),
        }),
      }))
      onUpdatePages(newPages)
    },
    [appPage?.pages, initPage, onUpdatePages, currentIndexPage]
  )

  const onDropCategoryTreeFromSidebar = useCallback(
    async (categories?: any) => {
      const selectedCategories = filter(categories, (cate) => cate?.selected)
      const ids = map(selectedCategories, 'id')
      const newBlocks = map(selectedCategories, (cate) => ({
        type: BlockType.BannerCategories,
        id: v4(),
        category: {
          ...cate,
          visibleName: true,
          image: {
            src: cate?.image || '',
            ratio: 1,
            visible: false,
          },
        },
      }))
      const pages: AppPageLayout[] = !isEmpty(appPage?.pages) ? appPage?.pages || initPage : initPage
      const oldBlocks = pages[currentIndexPage || 0]?.blocks
      const blocks = map(oldBlocks, (block) => ({
        ...block,
        ...(includes(ids, block?.category?.id) && {
          category: {
            ...block?.category,
            children: find(selectedCategories, ['id', block?.category?.id])?.children || [],
          },
        }),
      }))
      let blocks2 = [...blocks]
      forEach(blocks, (block) => {
        const findBlockExist = find(selectedCategories, ['id', block?.category?.id])
        if (!findBlockExist) {
          blocks2 = filter(blocks2, (b) => b?.type !== BlockType.BannerCategories || b?.category?.id !== block?.category?.id)
        }
        const diffBlock = filter(
          selectedCategories,
          (cate) =>
            !includes(
              map(blocks2, (b) => b?.category?.id),
              cate?.id
            )
        )
        forEach(reverse(diffBlock), (cate) => {
          blocks2.unshift({
            type: BlockType.BannerCategories,
            id: v4(),
            category: {
              ...cate,
              visibleName: true,
              image: {
                src: cate?.image || '',
                ratio: 1,
                visible: false,
              },
            },
          })
        })
      })
      const newPages = map(pages, (page, index) => ({
        ...page,
        ...(index === currentIndexPage && {
          blocks: !isEmpty(oldBlocks) ? blocks2 : newBlocks,
        }),
      }))
      onUpdatePages(newPages)
    },
    [appPage?.pages, initPage, onUpdatePages, currentIndexPage]
  )

  const onDropBrandFromSidebar = useCallback(
    async (
      brands?: {
        id: string
        name: string
        imageUrl: string
        selected: boolean
      }[]
    ) => {
      const selectedBrand = filter(brands, (brand) => brand?.selected)
      const newBlocks = map(selectedBrand, (brand) => ({
        type: BlockType.Brand,
        id: v4(),
        brand: {
          ...brand,
          image: {
            src: brand?.imageUrl || '',
            ratio: 1,
            visible: false,
          },
        },
      }))
      const pages: AppPageLayout[] = !isEmpty(appPage?.pages) ? appPage?.pages || initPage : initPage
      const oldBlocks = pages[currentIndexPage || 0]?.blocks
      const blocks2 = filter(oldBlocks, (b) => b?.type !== BlockType.Brand)
      const blocks3 = [...blocks2, ...newBlocks]
      const newPages = map(pages, (page, index) => ({
        ...page,
        ...(index === currentIndexPage && {
          blocks: blocks3,
        }),
      }))
      onUpdatePages(newPages)
    },
    [appPage?.pages, initPage, onUpdatePages, currentIndexPage]
  )

  const onCombineCatalogFromSidebar = useCallback(
    async (category?: string, blockId?: string) => {
      const cate: any = JSON.parse(category || '{}')
      const pages: AppPageLayout[] = !isEmpty(appPage?.pages) ? appPage?.pages || initPage : initPage
      const newPages = map(pages, (page, index) => ({
        ...page,
        ...(index === currentIndexPage && {
          blocks: map(page?.blocks, (block) => ({
            ...block,
            ...(block?.id === blockId && {
              category: {
                ...block?.category,
                children: [
                  ...(block?.category?.children || []),
                  {
                    ...cate,
                    image: {
                      src: cate?.image,
                      ratio: 1,
                    },
                  },
                ],
              },
            }),
          })),
        }),
      }))
      onUpdatePages(newPages)
    },
    [appPage?.pages, initPage, onUpdatePages, currentIndexPage]
  )

  const onDropCatalogFromPreview = useCallback(
    (startIndex: number, endIndex: number, startBlockId?: string, endblockId?: string, categoryId?: string) => {
      const findChild = [...(find(selectedPage?.blocks, (i) => i?.id === startBlockId)?.category?.children || [])]
      const newPages = map(appPage?.pages, (page, index) => ({
        ...page,
        ...(index === currentIndexPage && {
          blocks: map(selectedPage?.blocks, (block) => ({
            ...block,
            ...(block?.id === endblockId &&
              startBlockId === endblockId && {
                category: {
                  ...block?.category,
                  children: reorderItemInArray(block?.category?.children, startIndex, endIndex),
                },
              }),
            ...(startBlockId !== endblockId && {
              ...(block?.id === startBlockId && {
                category: {
                  ...block?.category,
                  children: removeItemInArray(block?.category?.children, startIndex),
                },
              }),
              ...(block?.id === endblockId && {
                category: {
                  ...block?.category,
                  children: insertItemToArr(
                    block?.category?.children,
                    {
                      ...find(findChild, (child) => String(child?.id) === categoryId?.split('__')[1]),
                    },
                    endIndex
                  ),
                },
              }),
            }),
          })),
        }),
      }))
      onUpdatePages(newPages)
      setCurrentIndexBlock(undefined)
    },
    [currentIndexPage, onUpdatePages, appPage?.pages, selectedPage?.blocks, setCurrentIndexBlock]
  )

  const onDropBlockFromSidebar = useCallback(
    (type: BlockType, endIndex: number, dataBlock?: PageBlock) => {
      if (defaultBlock(type)) {
        const pages: AppPageLayout[] = !isEmpty(appPage?.pages) ? appPage?.pages || initPage : initPage

        const newPages = map(pages, (page, index: number) => ({
          ...page,
          ...(index === currentIndexPage && {
            blocks: insertItemToArr(
              page?.blocks,
              {
                ...(dataBlock ?? defaultBlock(type)),
                id: v4(),
              },
              endIndex
            ),
          }),
        }))
        onUpdatePages(newPages)
      }
    },
    [appPage?.pages, currentIndexPage, defaultBlock, initPage, onUpdatePages]
  )

  const onMoveBlockFromPreview = useCallback(
    (startIndex: number, endIndex: number) => {
      const newBlocks = reorderItemInArray(selectedPage?.blocks, startIndex, endIndex)
      const newPages = map(appPage?.pages, (page, index) => ({
        ...page,
        ...(index === currentIndexPage && {
          blocks: newBlocks,
        }),
      }))
      onUpdatePages(newPages)
      setCurrentIndexBlock(undefined)
    },
    [currentIndexPage, onUpdatePages, appPage?.pages, selectedPage?.blocks, setCurrentIndexBlock]
  )

  return {
    onDropBlockFromSidebar,
    onMoveBlockFromPreview,

    onDropCatalogFromSidebar,
    onDropCategoryTreeFromSidebar,
    onDropBrandFromSidebar,

    onCombineCatalogFromSidebar,
    onDropCatalogFromPreview,
  }
}
