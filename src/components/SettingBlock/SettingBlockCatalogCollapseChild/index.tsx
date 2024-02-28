'use client'

import { Button, Input, Typography } from 'antd'
import { map } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { OpenImageLibrary } from '@/components'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { MediaLibrary } from '@/types'

type Props = {
  setIsVisible?: (value: boolean) => void
  index: number
}

export const SettingBlockCatalogCollapseChild: React.FC<Props> = ({ setIsVisible, index }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [images, setImages] = useState<Asset[]>()
  const [title, setTitle] = useState<string>()

  useEffect(() => {
    setImages([selectedBlock?.category?.children?.[index]?.image || {}])
    setTitle(selectedBlock?.category?.children?.[index]?.name || '')
  }, [selectedBlock?.category?.children, index])

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
      category: {
        ...selectedBlock?.category,
        children: map(selectedBlock?.category?.children, (item, i: number) => ({
          ...item,
          ...(i === index && {
            image: images?.[0],
            name: title,
          }),
        })),
      },
    })
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [selectedBlock?.category, images, index, onUpdateBlockItem, setCurrentIndexBlock, setIsVisible, title])

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          <div className="mb-4">
            <Typography.Paragraph className="font-medium text-gray800 mb-2">Title</Typography.Paragraph>
            <Input size="large" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-4">
            <Typography.Paragraph className="font-semibold text-gray800 mb-2">Image banner</Typography.Paragraph>
            <OpenImageLibrary src={images?.[0]?.src} onUpload={onSelectMedia} onRemoveThumb={onRemoveThumb} />
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
