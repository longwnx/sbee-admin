'use client'

import { Button, DatePicker, Form, Input, Switch, Typography } from 'antd'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { ColorBox, SettingActionBlock } from '@/components'
import { OpenImageLibrary } from '@/components/Library'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { MediaLibrary } from '@/types'

dayjs.extend(utc)

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBlockCountdown: React.FC<Props> = ({ setIsVisible }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [startAt, setStartAt] = useState(dayjs())
  const [endAt, setEndAt] = useState(dayjs())
  const [color, setColor] = useState<string | undefined>('#000000')
  const [bgColor, setBgColor] = useState<string | undefined>('#FFFFFF')
  const [title, setTitle] = useState<string>()
  const [startTitle, setStartTitle] = useState<string>()
  const [endTitle, setEndTitle] = useState<string>()
  const [hideWhenFinished, setHideWhenFinished] = useState<boolean>(true)
  const [images, setImages] = useState<Asset[]>()
  const [action, setAction] = useState<Action>()

  useEffect(() => {
    setStartAt(dayjs(selectedBlock?.startAt))
    setEndAt(dayjs(selectedBlock?.endAt))
    setTitle(selectedBlock?.title?.text)
    setStartTitle(selectedBlock?.startTitle?.text)
    setEndTitle(selectedBlock?.endTitle?.text)
    setColor(selectedBlock?.title?.textColor || '#000000')
    setBgColor(selectedBlock?.backgroundColor || '#ffffff')
    setHideWhenFinished(selectedBlock?.hideWhenFinished || false)
    setImages(selectedBlock?.images)
    setAction?.(selectedBlock?.action)
  }, [
    selectedBlock?.action,
    selectedBlock?.backgroundColor,
    selectedBlock?.endAt,
    selectedBlock?.endTitle?.text,
    selectedBlock?.hideWhenFinished,
    selectedBlock?.images,
    selectedBlock?.startAt,
    selectedBlock?.startTitle?.text,
    selectedBlock?.title?.text,
    selectedBlock?.title?.textColor,
  ])

  // TODO: move to hook
  const onSelectMedia = useCallback((data: MediaLibrary[]) => {
    setImages([
      {
        src: data?.[0]?.url,
        ratio: data?.[0]?.ratio,
        width: data?.[0]?.width,
        height: data?.[0]?.height,
        thumbnail: data?.[0]?.thumbnailUrl,
      },
    ])
  }, [])

  const onRemoveThumb = useCallback(() => {
    setImages([])
  }, [])

  const onSave = useCallback(() => {
    const newData = {
      startAt: dayjs(startAt).utc().format(),
      endAt: dayjs(endAt).utc().format(),
      backgroundColor: bgColor,
      title: {
        text: title,
        textColor: color,
      },
      startTitle: {
        text: startTitle,
        textColor: color,
      },
      endTitle: {
        text: endTitle,
        textColor: color,
      },
      hideWhenFinished,
      images,
      action,
    }
    onUpdateBlockItem(newData)
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [
    action,
    bgColor,
    color,
    endAt,
    endTitle,
    hideWhenFinished,
    images,
    onUpdateBlockItem,
    setCurrentIndexBlock,
    setIsVisible,
    startAt,
    startTitle,
    title,
  ])

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <Form layout="vertical" className="h-full">
          <div className="h-full flex flex-col px-4">
            <div className="mb-4">
              <Form.Item className="mb-0" label="Start date" tooltip="Set the start time for the countdown">
                <DatePicker
                  size="large"
                  className="w-full"
                  showTime
                  format="MMM DD HH:mm:ss"
                  value={dayjs(startAt)}
                  onOk={(val) => setStartAt(val)}
                  clearIcon={false}
                />
              </Form.Item>
            </div>
            <div className="mb-4">
              <Form.Item className="mb-0" label="End date" tooltip="Set the end time for the countdown">
                <DatePicker
                  size="large"
                  className="w-full"
                  showTime
                  format="MMM DD HH:mm:ss"
                  value={dayjs(endAt)}
                  onOk={(val) => setEndAt(val)}
                  clearIcon={false}
                />
              </Form.Item>
            </div>
            <div className="mb-4">
              <Form.Item className="mb-0" label="Background color" tooltip="Set the background color of the countdown">
                <div className="flex items-center justify-between">
                  <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} size="large" className="mr-2 flex-1" />
                  <ColorBox color={bgColor} onChange={(color) => setBgColor(color)} />
                </div>
              </Form.Item>
            </div>
            <div className="mb-4">
              <Form.Item className="mb-0" label="Text color" tooltip="Set the text color of the countdown">
                <div className="flex items-center justify-between">
                  <Input value={color} onChange={(e) => setColor(e.target.value)} size="large" className="mr-2 flex-1" />
                  <ColorBox color={color} onChange={(color) => setColor(color)} />
                </div>
              </Form.Item>
            </div>
            <div className="mb-4">
              <Form.Item className="mb-0" label="Title" tooltip="Set the text to be displayed during the countdown">
                <Input size="large" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Item>
            </div>
            {/*<div className="mb-4">*/}
            {/*  <Form.Item*/}
            {/*    className="mb-0"*/}
            {/*    label="Start title"*/}
            {/*    tooltip="Set the text for the countdown to indicate the remaining time until the countdown begins"*/}
            {/*  >*/}
            {/*    <Input size="large" value={startTitle} onChange={(e) => setStartTitle(e.target.value)} />*/}
            {/*  </Form.Item>*/}
            {/*</div>*/}
            {/*<div className="mb-4">*/}
            {/*  <Form.Item className="mb-0" label="End title" tooltip="Set the text for the countdown expiration notification">*/}
            {/*    <Input size="large" value={endTitle} onChange={(e) => setEndTitle(e.target.value)} />*/}
            {/*  </Form.Item>*/}
            {/*</div>*/}
            <div className="mb-4 flex items-center justify-between">
              <Typography.Paragraph className="font-medium text-gray800 mb-0">Hide when finished</Typography.Paragraph>
              <Switch checked={hideWhenFinished} onChange={setHideWhenFinished} />
            </div>
            <div className="mb-4">
              <Typography.Paragraph className="font-medium text-gray800 mb-2">Image</Typography.Paragraph>
              <OpenImageLibrary src={images?.[0]?.src} onUpload={onSelectMedia} onRemoveThumb={onRemoveThumb} />
            </div>
            <div className="mb-4">
              <SettingActionBlock action={action} setAction={setAction} />
            </div>
          </div>
        </Form>
      </Scrollbars>
      <div className="p-4">
        <Button size="large" type="primary" block className="text-gray800 font-semibold text-sm" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  )
}
