'use client'

import { Button, Input, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { ColorBox } from '@/components'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBlockSearchBar: React.FC<Props> = ({ setIsVisible }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [bgColor, setBgColor] = useState<string | undefined>('#FFFFFF')
  const [placeholder, setPlaceholder] = useState<string>()

  useEffect(() => {
    setBgColor(selectedBlock?.backgroundColor || '#FFFFFF')
    setPlaceholder(selectedBlock?.placeholder)
  }, [selectedBlock?.backgroundColor, selectedBlock?.placeholder])

  const onSave = useCallback(() => {
    const newData = {
      backgroundColor: bgColor,
      placeholder,
    }
    onUpdateBlockItem(newData)
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [bgColor, onUpdateBlockItem, placeholder, setCurrentIndexBlock, setIsVisible])

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          <div className="mb-4">
            <Typography.Paragraph className="font-medium text-gray800 mb-2">Background color</Typography.Paragraph>
            <div className="flex items-center justify-between">
              <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} size="large" className="mr-2 flex-1" />
              <ColorBox color={bgColor} onChange={(color) => setBgColor(color)} />
            </div>
          </div>
          <div className="mb-4">
            <Typography.Paragraph className="font-medium text-gray800 mb-2">Hint text</Typography.Paragraph>
            <Input size="large" value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
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
