'use client'

import { Button, Input, Switch, Typography } from 'antd'
import { map } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { OpenImageLibrary, SettingActionBlock } from '@/components'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { MediaLibrary } from '@/types'

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBlockCustomBanner: React.FC<Props> = ({ setIsVisible }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [images, setImages] = useState<Asset[]>()
  const [title, setTitle] = useState<string>()
  const [showTitle, setShowTitle] = useState(true)
  const [showImage, setShowImage] = useState(false)
  const [action, setAction] = useState<Action>()

  useEffect(() => {
    setImages(selectedBlock?.images)
    setTitle(selectedBlock?.title?.text || '')
    setShowTitle(selectedBlock?.title?.visible)
    setShowImage(selectedBlock?.images?.[0]?.visible)
    setAction?.(selectedBlock?.action)
  }, [selectedBlock?.action, selectedBlock?.images, selectedBlock?.title?.text, selectedBlock?.title?.visible])

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
    onUpdateBlockItem({
      images: map(images, (i) => ({
        ...i,
        visible: showImage,
      })),
      title: {
        text: title,
        visible: showTitle,
      },
      action,
    })
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [action, images, onUpdateBlockItem, setCurrentIndexBlock, setIsVisible, showImage, showTitle, title])

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          <div className="mb-4 flex items-center justify-between">
            <Typography.Paragraph className="font-medium text-gray800 mb-0">Show title</Typography.Paragraph>
            <Switch checked={showTitle} onChange={setShowTitle} />
          </div>
          <div className="mb-4">
            <Input size="large" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <Typography.Paragraph className="font-medium text-gray800 mb-0">Show image banner</Typography.Paragraph>
            <Switch checked={showImage} onChange={setShowImage} />
          </div>
          <div className="mb-4">
            <OpenImageLibrary src={images?.[0]?.src} onUpload={onSelectMedia} onRemoveThumb={onRemoveThumb} />
            <SettingActionBlock action={action} setAction={setAction} />
          </div>
        </div>
      </Scrollbars>
      <div className="p-4">
        <Button size="large" type="primary" block className="text-gray800 font-semibold text-sm" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  )
}
