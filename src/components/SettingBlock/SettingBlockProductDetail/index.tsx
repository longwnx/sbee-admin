'use client'

import { Button, Form, Input, Radio, Switch } from 'antd'
import { useCallback, useEffect } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { PresentationStyleSettings } from '@/types'

type Props = {
  setIsVisible?: (value: boolean) => void
  settingPresentationStyle?: boolean
}

export const SettingBlockProductDetail: React.FC<Props> = ({ setIsVisible, settingPresentationStyle = true }) => {
  const [form] = Form.useForm()
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const watchPresentationStyle = Form.useWatch(['options', 'presentationStyle'], form)

  useEffect(() => {
    form.setFieldsValue({
      title: selectedBlock?.title?.text,
      options: selectedBlock?.options,
    })
  }, [form, selectedBlock?.options, selectedBlock?.title?.text])

  const onSave = useCallback(
    (values: any) => {
      const newData = {
        title: {
          text: values?.title,
        },
        options: values?.options,
      }
      onUpdateBlockItem(newData)
      setIsVisible?.(false)
      setCurrentIndexBlock(undefined)
    },
    [onUpdateBlockItem, setIsVisible, setCurrentIndexBlock]
  )

  return (
    <Form form={form} layout="vertical" onFinish={onSave} className="h-full">
      <div className="h-full flex flex-col">
        <Scrollbars className="h-full flex-1">
          <div className="h-full flex flex-col px-4">
            <Form.Item name="title" label="Title">
              <Input size="large" />
            </Form.Item>
            {settingPresentationStyle && (
              <>
                <Form.Item name={['options', 'presentationStyle']} label="Presentation styles" className="mb-0">
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
              </>
            )}
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
