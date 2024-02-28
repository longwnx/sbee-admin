'use client'

import { Button, Form, Input, Radio, Switch, Typography } from 'antd'
import { filter, find, map } from 'lodash'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { DEFAULT_IMAGE } from '@public/index'
import { IconClose, SettingOpenCategory } from '@/components'
import { useModifyUiPages, useSearchCategoryTreeQuery, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { PresentationStyleSettings } from '@/types'

type Props = {
  setIsVisible?: (value: boolean) => void
}

const TextEditor = dynamic(() => import('@/components/Dynamic/TextEditor'), { ssr: false })

export const SettingBlockProductDetailHtml: React.FC<Props> = ({ setIsVisible }) => {
  const [form] = Form.useForm()
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [categories, setCategories] = useState<any[]>()
  const [content, setContent] = useState('')
  const { mutateAsync: onSearchCateTree } = useSearchCategoryTreeQuery()
  const watchPresentationStyle = Form.useWatch(['options', 'presentationStyle'], form)

  useEffect(() => {
    form.setFieldsValue({
      title: selectedBlock?.title?.text,
      source: selectedBlock?.source,
      options: selectedBlock?.options,
    })
    const cate = find(selectedBlock?.conditions, (item) => item?.key === 'categories')?.values
    setCategories(cate)
    setContent(selectedBlock?.source?.html)
  }, [
    form,
    selectedBlock?.action,
    selectedBlock?.conditions,
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
        source: {
          html: content,
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
    [content, categories, onUpdateBlockItem, setIsVisible, setCurrentIndexBlock]
  )

  return (
    <Form form={form} layout="vertical" onFinish={onSave} className="h-full">
      <div className="h-full flex flex-col">
        <Scrollbars className="h-full flex-1">
          <div className="h-full flex flex-col px-4">
            <Form.Item name="title" label="Title">
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Content">
              <TextEditor content={content} setContent={setContent} />
            </Form.Item>
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
