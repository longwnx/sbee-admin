'use client'

import { Button, Form, InputNumber, Select, Space, Typography } from 'antd'
import { filter, map, times } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { getImageSize } from 'react-image-size'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useDebounce } from 'usehooks-ts'
import { css } from '@emotion/css'
import { DEFAULT_IMAGE } from '@public'
import { IconCollection, IconSearch, IconTrash } from '@/components'
import { useModifyUiPages, useSearchCategoryQuery, useSearchCategoryTreeQuery, useSelectedPageBlock } from '@/hooks'
import { appPageState, currentIndexBlockState, currentIndexPageState } from '@/recoil'
import { ActionType } from '@/types'
import { replaceItemInArray } from '@/utils'

type Props = {
  setIsVisible?: (value: boolean) => void
}

const DEFAULT_COLUMNS = 4
const MAX_CATEGORIES = 8

export const SettingBlockCatalog: React.FC<Props> = ({ setIsVisible }) => {
  const appPage = useRecoilValue(appPageState)
  const currentIndexPage = useRecoilValue(currentIndexPageState)
  const [currentIndexBlock, setCurrentIndexBlock] = useRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdatePages } = useModifyUiPages()
  const [slotsCategory, setSlotsCategory] = useState<any[]>(times(MAX_CATEGORIES, () => ({ id: null })))
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const debouncedSearch = useDebounce<string>(search, 500)
  const ref: any = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [columns, setColumns] = useState<number | null>()
  const { mutateAsync: onSearchCategoryTree } = useSearchCategoryTreeQuery()

  const { data: categories } = useSearchCategoryQuery({
    query,
  })

  useEffect(() => {
    setColumns(selectedBlock?.columns || DEFAULT_COLUMNS)
  }, [selectedBlock?.columns])

  useEffect(() => {
    setQuery(debouncedSearch)
  }, [debouncedSearch])

  useEffect(() => {
    const newCategories = map(selectedBlock?.categories, (category) => ({
      ...category,
      image: category?.image?.src,
    }))
    const newData = [
      ...newCategories,
      ...times(MAX_CATEGORIES - newCategories?.length, () => ({
        id: null,
      })),
    ]
    setSlotsCategory(newData)
  }, [selectedBlock?.categories])

  const onSelect = useCallback(
    async (id: string) => {
      const findIndex = slotsCategory.findIndex((i) => i?.id === null)
      if (findIndex === -1) return
      const findCate = await onSearchCategoryTree({
        id,
      })
      const newData = replaceItemInArray(
        slotsCategory,
        {
          ...findCate,
          action: {
            category: {
              ...findCate,
            },
            type: ActionType.OpenCategory,
          },
        },
        findIndex
      )
      setSlotsCategory(newData)
    },
    [onSearchCategoryTree, slotsCategory]
  )

  const onRemoveItem = useCallback(
    (index: number) => {
      const newData = filter(slotsCategory, (_i, idx) => idx !== index)
      setSlotsCategory([
        ...newData,
        {
          id: null,
        },
      ])
    },
    [slotsCategory]
  )

  const onSave = useCallback(async () => {
    const newData = filter(slotsCategory, (i) => i?.id)
    let newCheckedNodes: any[] = []
    for (let index = 0; index < newData?.length; index++) {
      const element = newData?.[index]
      if (element?.image) {
        const { width, height } = await getImageSize(element?.image)
        const ratio = width / height
        newCheckedNodes = [
          ...newCheckedNodes,
          {
            ...element,
            image: {
              src: element?.image,
              ratio,
              width,
              height,
            },
          },
        ]
      } else {
        newCheckedNodes = [
          ...newCheckedNodes,
          {
            ...element,
            image: {
              src: '',
            },
          },
        ]
      }
    }
    const newPages = map(appPage?.pages, (page, indexPage) => ({
      ...page,
      ...(indexPage === currentIndexPage && {
        blocks: map(page?.blocks, (block, indexBlock) => ({
          ...block,
          ...(indexBlock === currentIndexBlock && {
            categories: [...newCheckedNodes],
            columns,
          }),
        })),
      }),
    }))
    onUpdatePages(newPages)
    setCurrentIndexBlock(undefined)
    setIsVisible?.(false)
  }, [
    appPage?.pages,
    columns,
    currentIndexBlock,
    currentIndexPage,
    onUpdatePages,
    setCurrentIndexBlock,
    setIsVisible,
    slotsCategory,
  ])

  const classNameItem = css({
    '.icon--action': {
      display: 'none',
    },
    '&:hover': {
      '.icon--action': {
        display: 'flex',
      },
    },
  })

  return (
    <div className="h-full flex flex-col">
      <Form layout="vertical" className="h-full flex flex-col">
        <div className="px-4">
          <div className="mb-4">
            <Form.Item
              className="mb-0"
              label="Columns"
              tooltip="Specify the desired number of columns within the range of 2 to 6"
            >
              <InputNumber className="w-full" size="large" value={columns} onChange={setColumns} min={2} max={6} />
            </Form.Item>
          </div>
          <Typography.Paragraph className="font-medium text-gray800 mb-2">Categories</Typography.Paragraph>
          <Select
            ref={ref}
            size="large"
            showSearch
            placeholder="Search category"
            suffixIcon={<IconSearch width={20} height={20} />}
            className="w-full"
            optionLabelProp="label"
            options={map(categories?.data, (i) => ({
              value: i?.id,
              label: (
                <div className="flex items-center">
                  <img
                    src={i?.image || DEFAULT_IMAGE}
                    className="w-[30px] h-[30px] mr-2 object-cover rounded-md overflow-hidden"
                  />
                  {i?.name}
                </div>
              ),
            }))}
            filterOption={false}
            value={search}
            searchValue={search}
            onSearch={setSearch}
            onSelect={onSelect}
            open={isOpen}
            onDropdownVisibleChange={setIsOpen}
          />
        </div>
        <Scrollbars className="h-full flex-1">
          <div className="h-full flex flex-col px-4">
            {map(slotsCategory, (category, index) => (
              <div className={classNameItem} key={index}>
                {category?.id ? (
                  <div className="mt-2 hover:border-gray500 flex items-center justify-between px-3 py-2 cursor-pointer bg-gray25 rounded border border-gray300">
                    <Space>
                      <img src={category?.image || DEFAULT_IMAGE} className="w-8 h-8 object-cover rounded" alt="" />
                      <Typography.Text className="text-gray700">{category?.name}</Typography.Text>
                    </Space>
                    <IconTrash
                      width={20}
                      height={20}
                      className="icon--action"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveItem(index)
                      }}
                    />
                  </div>
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
            ))}
          </div>
        </Scrollbars>
        <div className="p-4">
          <Button size="large" type="primary" block className="text-gray800 font-semibold text-sm" onClick={onSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}
