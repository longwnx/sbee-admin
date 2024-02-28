'use client'

import { Drawer, Input, Space, Typography } from 'antd'
import classNames from 'classnames'
import { isEmpty, map } from 'lodash'
import { useEffect, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Scrollbars from 'react-custom-scrollbars-2'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useDebounce } from 'usehooks-ts'
import { css } from '@emotion/css'
import { BLANK_IMAGE, DEFAULT_IMAGE } from '@public'
import {
  IconClose,
  IconCollection,
  IconPenEdit,
  IconSearch,
  IconTrash,
  SettingBlockCatalogCollapseChild,
  SettingBlockWrapper,
} from '@/components'
import { useDragDropBlock, useModifyUiPages, useSearchCategoryQuery } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { DroppableType } from '@/types'

type Props = {
  block: CatalogCollapse
  blockIndex: number
}

export const BlockCatalogCollapse: React.FC<Props> = ({ block, blockIndex }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { onUpdateBlockItem } = useModifyUiPages()
  const [isVisibleSetting, setIsVisibleSetting] = useState(false)
  const [isVisibleCategories, setIsVisibleCategories] = useState(false)
  const [indexChild, setIndexChild] = useState(0)
  const { onCombineCatalogFromSidebar } = useDragDropBlock()

  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const debouncedSearch = useDebounce<string>(search, 500)

  const { data: categories } = useSearchCategoryQuery({
    query,
  })

  useEffect(() => {
    setQuery(debouncedSearch)
  }, [debouncedSearch])

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
    <div className={classNames('p-4')}>
      <div className="relative z-[1] w-full h-[210px] flex flex-col rounded-lg overflow-hidden border border-gray300">
        <div
          className="w-full flex-1 bg-center bg-cover"
          style={{
            backgroundImage: `url(${
              block?.category?.image?.visible !== false ? block?.category?.image?.src || BLANK_IMAGE : BLANK_IMAGE
            })`,
          }}
        />
        <div className="bg-white text-gray800 h-14 flex items-center justify-between py-1 px-6">
          {block?.category?.name && block?.category?.visibleName && <span>{block?.category?.name}</span>}
        </div>
      </div>
      <Droppable type={DroppableType.CatalogChildren} droppableId={block?.id as string}>
        {(provided, snapshotDroppable) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="pl-2">
            {!isEmpty(block?.category?.children) ? (
              map(block?.category?.children, (category, index) => (
                <Draggable
                  key={index}
                  draggableId={`${block?.id}__${String(category?.id)}__${index}` as string}
                  index={index}
                >
                  {(provided, snapshotDraggable) => (
                    <div
                      className={classNames('flex items-center', classNameItem)}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        className={classNames(
                          'w-[7px] h-[7px] rounded-full mr-2 relative before:absolute before:bottom-0 before:left-[3px] before:bg-gray500 before:w-[1px] before:h-16',
                          snapshotDroppable.isDraggingOver || snapshotDraggable.isDragging
                            ? 'bg-transparent before:hidden'
                            : 'bg-gray500'
                        )}
                      />
                      <div className="mt-2 flex-1 hover:border-gray500 flex items-center justify-between px-3 py-2 cursor-pointer bg-gray25 rounded border border-gray300">
                        <Space>
                          {/* <img src={category?.image?.src} className="w-8 h-8 object-cover rounded" alt="" /> */}
                          <Typography.Paragraph className="text-gray700 mb-0">{category?.name}</Typography.Paragraph>
                        </Space>
                        <Space className="icon--action">
                          {/* <IconPenEdit
                            width={20}
                            height={20}
                            onClick={() => {
                              setCurrentIndexBlock(blockIndex)
                              setIndexChild(index)
                              setIsVisibleSetting(true)
                            }}
                          /> */}
                          <IconTrash
                            width={20}
                            height={20}
                            onClick={() => {
                              onUpdateBlockItem(
                                {
                                  category: {
                                    ...block?.category,
                                    children: block?.category?.children?.filter((_, i) => i !== index),
                                  },
                                },
                                blockIndex
                              )
                            }}
                          />
                        </Space>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className="items-center hidden md:flex">
                <div
                  className={classNames(
                    'w-[7px] h-[7px] bg-gray500 rounded-full mr-2 relative before:absolute before:bottom-0 before:left-[3px] before:bg-gray500 before:w-[1px] before:h-16'
                  )}
                />
                <div className="mt-2 flex-1 hover:border-gray500 hover:border-solid flex items-center justify-between px-3 py-2 cursor-pointer bg-gray25 rounded border border-dashed border-gray300">
                  <Space>
                    <div className="bg-gray-100 rounded w-8 h-8 flex items-center justify-center">
                      <IconCollection />
                    </div>
                    <Typography.Text className="text-gray700">Drag in a category (Optional)</Typography.Text>
                  </Space>
                </div>
              </div>
            )}
            <div className="flex items-center md:hidden">
              <div
                className={classNames(
                  'w-[7px] h-[7px] bg-gray500 rounded-full mr-2 relative before:absolute before:bottom-0 before:left-[3px] before:bg-gray500 before:w-[1px] before:h-16'
                )}
              />
              <div
                onClick={() => {
                  setIsVisibleCategories(true)
                }}
                className="mt-2 flex-1 hover:border-gray500 hover:border-solid flex items-center justify-between px-3 py-2 cursor-pointer bg-gray25 rounded border border-dashed border-gray300"
              >
                <Space>
                  <div className="bg-gray-100 rounded w-8 h-8 flex items-center justify-center">
                    <IconCollection />
                  </div>
                  <Typography.Text className="text-gray700">Click to add category (Optional)</Typography.Text>
                </Space>
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <SettingBlockWrapper
        isVisible={isVisibleSetting}
        setIsVisible={setIsVisibleSetting}
        title="Settings"
        description="Design a top category, with or without an image banner"
      >
        <SettingBlockCatalogCollapseChild index={indexChild} setIsVisible={setIsVisibleSetting} />
      </SettingBlockWrapper>
      <Drawer
        bodyStyle={{ overflow: 'hidden', padding: 0 }}
        closable={false}
        placement="left"
        onClose={() => setIsVisibleCategories(false)}
        open={isVisibleCategories}
        width="100%"
      >
        <div className="h-full flex flex-col">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <Typography.Paragraph className="mb-0 text-gray800 font-semibold">List item</Typography.Paragraph>
              <div className="cursor-pointer flex items-center">
                <IconClose onClick={() => setIsVisibleCategories(false)} />
              </div>
            </div>
            <Typography.Paragraph className="text-gray600 text-xs mb-0 mt-2">
              Click on the item to add a new one. The item will be added to the beginning of the list.
            </Typography.Paragraph>
          </div>
          <div className="flex-1 p-4">
            <Input
              size="large"
              placeholder="Search category"
              prefix={<IconSearch width={20} height={20} />}
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Scrollbars className="flex-1 h-full w-full">
              <div className="py-4">
                <div className="h-full flex flex-col">
                  {map(
                    categories?.data,
                    (category, index: number) =>
                      index <= 10 && (
                        <Draggable key={category?.id} draggableId={`${JSON.stringify(category)}` as string} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div
                                onClick={() => {
                                  onCombineCatalogFromSidebar(JSON.stringify(category), block?.id)
                                  setIsVisibleCategories(false)
                                }}
                                className="mt-2 hover:border-gray500 flex items-center justify-between px-3 py-2 cursor-pointer bg-gray25 rounded border border-gray300"
                              >
                                <Space>
                                  <img
                                    src={category?.image || DEFAULT_IMAGE}
                                    className="w-8 h-8 object-cover rounded"
                                    alt=""
                                  />
                                  <Typography.Text className="text-gray700">{category?.name}</Typography.Text>
                                </Space>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      )
                  )}
                </div>
              </div>
            </Scrollbars>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
