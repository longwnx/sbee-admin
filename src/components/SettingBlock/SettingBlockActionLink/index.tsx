'use client'

import { Button, Form, Input, Switch, Typography } from 'antd'
import { filter, find, map } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { DEFAULT_IMAGE } from '@public/index'
import { IconClose, SettingOpenCategory } from '@/components'
import { useModifyUiPages, useSearchCategoryTreeQuery, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBlockActionLink: React.FC<Props> = ({ setIsVisible }) => {
  const [form] = Form.useForm()
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [categories, setCategories] = useState<any[]>()
  const { mutateAsync: onSearchCateTree } = useSearchCategoryTreeQuery()

  useEffect(() => {
    form.setFieldsValue({
      title: selectedBlock?.title?.text,
      source: {
        ...selectedBlock?.source,
        openExternal: !selectedBlock?.source?.openExternal,
      },
      options: selectedBlock?.options,
    })
    const cate = find(selectedBlock?.conditions, (item) => item?.key === 'categories')?.values
    setCategories(cate)
  }, [form, selectedBlock?.conditions, selectedBlock?.options, selectedBlock?.source, selectedBlock?.title?.text])

  const onSave = useCallback(
    (values: any) => {
      const newData = {
        title: {
          text: values?.title,
        },
        source: {
          ...values?.source,
          openExternal: !values?.source?.openExternal,
        },
        options: values?.options,
        conditions: [
          {
            key: 'categories',
            values: categories,
          },
        ],
      }
      onUpdateBlockItem(newData)
      setIsVisible?.(false)
      setCurrentIndexBlock(undefined)
    },
    [categories, onUpdateBlockItem, setIsVisible, setCurrentIndexBlock]
  )

  return (
    <Form form={form} layout="vertical" onFinish={onSave} className="h-full">
      <div className="h-full flex flex-col">
        <Scrollbars className="h-full flex-1">
          <div className="h-full flex flex-col px-4">
            <Form.Item name="title" label="Title">
              <Input size="large" />
            </Form.Item>
            <Form.Item name={['source', 'url']} label="Enter the URL">
              <Input size="large" placeholder="e.g. https://www.example.com" />
            </Form.Item>
            <div className="flex items-center justify-between mb-4">
              <Typography.Paragraph className="font-medium text-gray800 mb-0">Open webpage in the app</Typography.Paragraph>
              <Form.Item name={['source', 'openExternal']} className="mb-0" valuePropName="checked">
                <Switch />
              </Form.Item>
            </div>
            <Typography.Paragraph className="font-medium text-gray800 mb-0">Conditions</Typography.Paragraph>
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
              value=""
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
