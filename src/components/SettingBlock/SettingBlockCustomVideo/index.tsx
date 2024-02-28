'use client'

import { Button, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { OpenVideoLibrary, SettingActionBlock } from '@/components'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { MediaLibrary } from '@/types'

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBlockCustomVideo: React.FC<Props> = ({ setIsVisible }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [videos, setVideos] = useState<Asset[]>()
  const [action, setAction] = useState<Action>()

  useEffect(() => {
    setVideos(selectedBlock?.videos)
    setAction?.(selectedBlock?.action)
  }, [selectedBlock?.action, selectedBlock?.videos])

  const onSelectMedia = useCallback((data: MediaLibrary[]) => {
    setVideos([
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
    setVideos([])
  }, [])

  const onSave = useCallback(() => {
    onUpdateBlockItem({
      videos,
      action,
    })
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [action, onUpdateBlockItem, setCurrentIndexBlock, setIsVisible, videos])

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          <Typography.Paragraph className="font-semibold text-gray800 mb-2">Video</Typography.Paragraph>
          <OpenVideoLibrary src={videos?.[0]?.src} onUpload={onSelectMedia} onRemoveThumb={onRemoveThumb} />
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
