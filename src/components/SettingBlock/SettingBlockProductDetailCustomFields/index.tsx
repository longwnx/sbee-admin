'use client'

import { Button, Form, Input, Radio, Space, Switch, Typography } from 'antd'
import classNames from 'classnames'
import { filter, find, map } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { v4 } from 'uuid'
import { css } from '@emotion/css'
import { DEFAULT_IMAGE } from '@public/index'
import { IconClose, IconDrag, IconTrash, SettingOpenCategory } from '@/components'
import { useModifyUiPages, useSearchCategoryTreeQuery, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { DroppableId, DroppableType, PresentationStyleSettings } from '@/types'
import { countObjKey, reorderItemInArray } from '@/utils'

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBlockProductDetailCustomFields: React.FC<Props> = ({ setIsVisible }) => {
  const [form] = Form.useForm()
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [categories, setCategories] = useState<any[]>()
  const { mutateAsync: onSearchCateTree } = useSearchCategoryTreeQuery()
  const [attributeName, setAttributeName] = useState('')
  const [fields, setFields] = useState<
    {
      name?: string
      id?: string
    }[]
  >([])
  const watchPresentationStyle = Form.useWatch(['options', 'presentationStyle'], form)

  useEffect(() => {
    form.setFieldsValue({
      title: selectedBlock?.title?.text,
      source: selectedBlock?.source,
      options: selectedBlock?.options,
    })
    setFields(selectedBlock?.fields)
    const cate = find(selectedBlock?.conditions, (item) => item?.key === 'categories')?.values
    setCategories(cate)
  }, [
    form,
    selectedBlock?.conditions,
    selectedBlock?.fields,
    selectedBlock?.options,
    selectedBlock?.source,
    selectedBlock?.title?.text,
  ])

  const onSave = useCallback(
    (values: any) => {
      const newData = {
        title: {
          text: values?.title,
        },
        options: values?.options,
        conditions: [
          {
            key: 'categories',
            values: categories,
          },
        ],
        fields,
      }
      onUpdateBlockItem(newData)
      setIsVisible?.(false)
      setCurrentIndexBlock(undefined)
    },
    [categories, fields, onUpdateBlockItem, setIsVisible, setCurrentIndexBlock]
  )

  const onChangeFieldName = useCallback(
    (value: string, indexPage: number) => {
      setFields(
        map(fields, (i, idx) => ({
          ...i,
          ...(idx === indexPage && {
            name: value,
          }),
        }))
      )
    },
    [fields]
  )

  const onAddNewAttribute = useCallback(() => {
    const idPage = v4()
    const newPages = [
      ...(fields || []),
      {
        id: idPage,
        name: attributeName || `Attribute ${countObjKey(fields || []) + 1}`,
      },
    ]
    setFields(newPages)
    setAttributeName('')
  }, [attributeName, fields])

  const onRemoveItem = useCallback(
    (indexPage: number) => {
      setFields(filter(fields, (_, idx) => idx !== indexPage))
    },
    [fields]
  )

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (result.destination) {
        if (result.source.droppableId === DroppableId.CustomFields) {
          setFields(reorderItemInArray(fields, result.source.index, result?.destination?.index))
        }
        return
      }
    },
    [fields]
  )

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
    <Form form={form} layout="vertical" onFinish={onSave} className="h-full">
      <div className="h-full flex flex-col">
        <Scrollbars className="h-full flex-1">
          <div className="h-full flex flex-col px-4">
            <Form.Item name="title" label="Title">
              <Input size="large" />
            </Form.Item>
            <Typography.Paragraph className="font-semibold text-gray800 mb-2">Attributes list</Typography.Paragraph>
            <Typography.Paragraph className="text-gray600 mb-4">
              Add product attributes that you want to show in product detail.
            </Typography.Paragraph>
            <div className="flex items-center mb-4">
              <Input
                value={attributeName}
                onChange={(e) => setAttributeName(e.target.value)}
                size="large"
                className="mr-2"
                placeholder="Enter attribute name"
              />
              <Button size="large" type="primary" className="text-gray800 font-semibold text-sm" onClick={onAddNewAttribute}>
                Add
              </Button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable type={DroppableType.CustomFields} droppableId={DroppableId.CustomFields}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {map(fields, (i, index) => (
                      <Draggable key={index} draggableId={String(index) as string} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div
                              className={classNames(
                                'mb-2 hover:border-gray500 flex items-center justify-between px-3 py-2 cursor-pointer bg-gray25 rounded border border-gray300',
                                classNameItem
                              )}
                              key={index}
                            >
                              <IconDrag width={16} height={16} />
                              <div className="relative flex-1">
                                <Input
                                  value={i?.name}
                                  className="mr-4 border-none shadow-none bg-transparent"
                                  size="small"
                                  onChange={(e) => onChangeFieldName(e.target.value, index)}
                                />
                              </div>
                              <Space>
                                <IconTrash
                                  width={20}
                                  height={20}
                                  className="icon--action cursor-pointer"
                                  onClick={() => {
                                    onRemoveItem(index)
                                  }}
                                />
                              </Space>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <Form.Item name={['options', 'presentationStyle']} label="Presentation styles" className="mt-4 mb-0">
              <Radio.Group>
                <Radio value={PresentationStyleSettings.Accordion}>
                  <span className="capitalize">{PresentationStyleSettings.Accordion}</span>
                </Radio>
                <Radio value={PresentationStyleSettings.Modal}>
                  <span className="capitalize">{PresentationStyleSettings.Modal}</span>
                </Radio>
              </Radio.Group>
            </Form.Item>
            {watchPresentationStyle === PresentationStyleSettings.Accordion && (
              <div className="flex items-center justify-between">
                <div className="font-medium">Collapsed by default</div>
                <Form.Item name={['options', 'collapsed']} valuePropName="checked" className="mb-0">
                  <Switch />
                </Form.Item>
              </div>
            )}
            <Typography.Paragraph className="font-medium text-gray800 mb-0 mt-4">Conditions</Typography.Paragraph>
            <Typography.Paragraph className="text-gray600 mb-0">
              Block will only appear on your app&apos;s product page if the product has any of the categories associated
            </Typography.Paragraph>
            <div className="mt-4 flex items-center flex-wrap">
              {map(categories, (cate) => (
                <div className="mr-2 mb-2 flex items-center bg-neutral02 py-1 px-2 rounded-lg" key={cate?.id}>
                  <img src={cate?.image || DEFAULT_IMAGE} alt="" className="w-4 h-4 mr-2 rounded" />
                  <span>{cate?.name}</span>
                  <IconClose
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={() => {
                      setCategories(filter(categories, (item) => item?.id !== cate?.id))
                    }}
                  />
                </div>
              ))}
            </div>
            <SettingOpenCategory
              placeholder="Select categories"
              onChange={async (id) => {
                if (find(categories, (item) => item?.id === id)) return
                try {
                  const data = await onSearchCateTree({
                    id,
                  })
                  setCategories([...(categories || []), { ...data }])
                } catch (error) {
                  //
                }
              }}
            />
          </div>
        </Scrollbars>
        <div className="p-4">
          <Button htmlType="submit" size="large" type="primary" block className="text-gray800 font-semibold text-sm">
            Save
          </Button>
        </div>
      </div>
    </Form>
  )
}
