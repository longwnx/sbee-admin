'use client'

import { Button, Input, InputNumber, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { ColorBox } from '@/components'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBlockSpace: React.FC<Props> = ({ setIsVisible }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [height, setHeight] = useState<number | null>()
  const [bgColor, setBgColor] = useState<string | undefined>('#ffffff')

  useEffect(() => {
    setHeight(selectedBlock?.height)
    setBgColor(selectedBlock?.backgroundColor)
  }, [selectedBlock?.backgroundColor, selectedBlock?.height])

  const onSave = useCallback(() => {
    const newData = {
      height,
      backgroundColor: bgColor,
    }
    onUpdateBlockItem(newData)
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [bgColor, height, onUpdateBlockItem, setCurrentIndexBlock, setIsVisible])

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          <div className="mb-4">
            <Typography.Paragraph className="font-medium text-gray800 mb-2">Height</Typography.Paragraph>
            <InputNumber size="large" value={height} onChange={setHeight} className="w-full" min={1} max={200} />
          </div>
          <div className="mb-4">
            <Typography.Paragraph className="font-medium text-gray800 mb-2">Background color</Typography.Paragraph>
            <div className="flex items-center justify-between">
              <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} size="large" className="mr-2 flex-1" />
              <ColorBox color={bgColor} onChange={(color) => setBgColor(color)} />
            </div>
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
