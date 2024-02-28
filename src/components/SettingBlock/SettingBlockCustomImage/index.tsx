'use client'

import { Button, Typography } from 'antd'
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

export const SettingBlockCustomImage: React.FC<Props> = ({ setIsVisible }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [images, setImages] = useState<Asset[]>()
  const [action, setAction] = useState<Action>()

  useEffect(() => {
    setImages(selectedBlock?.images)
    setAction?.(selectedBlock?.action)
  }, [selectedBlock?.action, selectedBlock?.images])

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
      images,
      action,
    })
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [action, images, onUpdateBlockItem, setCurrentIndexBlock, setIsVisible])

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          <Typography.Paragraph className="font-semibold text-gray800 mb-2">Image</Typography.Paragraph>
          <OpenImageLibrary src={images?.[0]?.src} onUpload={onSelectMedia} onRemoveThumb={onRemoveThumb} />
          <SettingActionBlock action={action} setAction={setAction} />
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
