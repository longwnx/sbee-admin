'use client'

import { Button } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { OpenImageLibrary } from '@/components'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { MediaLibrary } from '@/types'

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBlockBrand: React.FC<Props> = ({ setIsVisible }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [images, setImages] = useState<Asset[]>()
  const [title, setTitle] = useState<string>()

  useEffect(() => {
    setImages([selectedBlock?.brand?.image || {}])
    setTitle(selectedBlock?.brand?.name || '')
  }, [selectedBlock?.brand?.image, selectedBlock?.brand?.name, selectedBlock?.brand?.visibleName])

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
      brand: {
        ...selectedBlock?.brand,
        image: {
          ...images?.[0],
        },
        name: title,
      },
    })
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [images, onUpdateBlockItem, selectedBlock?.brand, setCurrentIndexBlock, setIsVisible, title])

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          {/* <div className="mb-4">
            <Input size="large" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div> */}
          <div className="mb-4">
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
