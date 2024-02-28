'use client'

import { Button, Select, Space, Tooltip, Typography } from 'antd'
import classNames from 'classnames'
import { filter, find, map } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useDebounce } from 'usehooks-ts'
import { css } from '@emotion/css'
import { DEFAULT_IMAGE } from '@public'
import { IconCollection, IconSearch, IconTrash } from '@/components'
import {
  useFilterProductMutation,
  useModifyUiPages,
  useSearchCategoryQuery,
  useSearchCategoryTreeQuery,
  useSelectedPageBlock,
} from '@/hooks'
import { appPageState, currentIndexBlockState, currentIndexPageState } from '@/recoil'
import { ActionType, BlockType } from '@/types'

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBlockCollection: React.FC<Props> = ({ setIsVisible }) => {
  const appPage = useRecoilValue(appPageState)
  const currentIndexPage = useRecoilValue(currentIndexPageState)
  const [currentIndexBlock, setCurrentIndexBlock] = useRecoilState(currentIndexBlockState)
  const { onUpdatePages } = useModifyUiPages()
  const { selectedBlock } = useSelectedPageBlock()
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const debouncedSearch = useDebounce<string>(search, 500)
  const [viewMore, setViewMore] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<any>()
  const ref: any = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const { mutateAsync: onSearchCategoryTree } = useSearchCategoryTreeQuery()

  useEffect(() => {
    setViewMore(selectedBlock?.viewMore?.text || '')
    setSelectedCategory(selectedBlock?.category)
  }, [selectedBlock?.category, selectedBlock?.viewMore?.text])

  useEffect(() => {
    setQuery(debouncedSearch)
  }, [debouncedSearch])

  const { data: categories } = useSearchCategoryQuery({
    query,
  })
  const maxProduct = useMemo(
    () => (selectedBlock?.type === BlockType.ProductCarousel || selectedBlock?.type === BlockType.ProductParallax ? 8 : 4),
    [selectedBlock?.type]
  )

  const { mutateAsync: onSearchProduct, isLoading } = useFilterProductMutation()
  const { data: allCategories } = useSearchCategoryQuery()

  const findParentCategory = useCallback(
    (parentId: number) => find(allCategories?.data, (i) => i?.id === parentId),
    [allCategories?.data]
  )

  const onSave = useCallback(async () => {
    try {
      const rs = await onSearchProduct({
        categoryId: selectedCategory?.id as string,
      })
      const findCate = await onSearchCategoryTree({
        id: selectedCategory?.id,
      })

      const newPages = map(appPage?.pages, (page, indexPage) => ({
        ...page,
        ...(indexPage === currentIndexPage && {
          blocks: map(page?.blocks, (block, indexBlock) => ({
            ...block,
            ...(indexBlock === currentIndexBlock && {
              category: findCate,
              products: map(
                filter(rs?.data, (_, index: number) => index < maxProduct),
                (i) => ({
                  id: i?.id,
                  name: i?.name,
                  image: find(i?.images, (img) => img?.isThumbnail)?.urlThumbnail,
                  price: i?.price,
                })
              ),
              title: {
                ...block?.title,
                text: findCate?.name,
              },
              viewMore: {
                text: viewMore,
              },
              action: {
                category: {
                  ...findCate,
                },
                type: ActionType.OpenCategory,
              },
            }),
          })),
        }),
      }))
      onUpdatePages(newPages)
    } catch (error) {
      //
    }
    setCurrentIndexBlock(undefined)
    setIsVisible?.(false)
  }, [
    appPage?.pages,
    currentIndexBlock,
    currentIndexPage,
    maxProduct,
    onSearchCategoryTree,
    onSearchProduct,
    onUpdatePages,
    selectedCategory?.id,
    setCurrentIndexBlock,
    setIsVisible,
    viewMore,
  ])

  const onSelect = useCallback(
    (categoryId: any) => {
      setSelectedCategory(find(categories?.data, (i) => i?.id === categoryId))
    },
    [categories?.data]
  )

  const classNameItem = css({
    '.icon--action': {
      display: 'none !important',
    },
    '&:hover': {
      '.icon--action': {
        display: 'flex !important',
      },
    },
  })

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 flex-1">
        <div className="mb-0">
          <Typography.Paragraph className="font-medium text-gray800 mb-2">Category</Typography.Paragraph>
          <Select
            ref={ref}
            size="large"
            showSearch
            suffixIcon={<IconSearch width={20} height={20} />}
            className="w-full"
            optionLabelProp="label"
            options={map(categories?.data, (i) => {
              const content =
                (findParentCategory(i?.parentId)?.name ? `${findParentCategory(i?.parentId)?.name} / ` : '') + i?.name
              return {
                value: i?.id,
                label: (
                  <Tooltip title={content}>
                    <div className="flex items-center h-full">
                      <img
                        src={i?.image || DEFAULT_IMAGE}
                        className="w-[30px] h-[30px] mr-2 object-cover rounded-md overflow-hidden"
                      />
                      <Typography.Paragraph className="mb-0 flex-1" ellipsis={{ rows: 1 }}>
                        {content}
                      </Typography.Paragraph>
                    </div>
                  </Tooltip>
                ),
              }
            })}
            filterOption={false}
            searchValue={search}
            onSearch={setSearch}
            onSelect={onSelect}
            open={isOpen}
            onDropdownVisibleChange={setIsOpen}
          />
        </div>
        {selectedCategory ? (
          <>
            <div
              className={classNames(
                'mt-2 hover:border-gray500 flex items-center justify-between px-3 py-2 cursor-pointer bg-gray25 rounded border border-gray300',
                classNameItem
              )}
            >
              <Space>
                <img src={selectedCategory?.image || DEFAULT_IMAGE} className="w-8 h-8 object-cover rounded" alt="" />
                <Typography.Text className="text-gray700">{selectedCategory?.name}</Typography.Text>
              </Space>
              <IconTrash
                width={20}
                height={20}
                className="icon--action"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedCategory(undefined)
                }}
              />
            </div>
          </>
        ) : (
          <div
            onClick={() => {
              setIsOpen(true)
              ref.current.focus()
            }}
            className="mt-2 hover:border-gray500 hover:border-solid flex items-center justify-between px-3 py-2 cursor-pointer bg-gray25 rounded border border-dashed border-gray300"
          >
            <Space>
              <div className="bg-gray-100 rounded w-8 h-8 flex items-center justify-center">
                <IconCollection />
              </div>
              <Typography.Text className="text-gray700">Choose Category</Typography.Text>
            </Space>
          </div>
        )}
      </div>
      <div className="p-4">
        <Button
          size="large"
          loading={isLoading}
          type="primary"
          block
          className="text-gray800 font-semibold text-sm"
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
