'use client'

import { Button, Input, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBlockCustomUrl: React.FC<Props> = ({ setIsVisible }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [source, setSource] = useState<{
    url?: string
  }>()

  useEffect(() => {
    setSource(selectedBlock?.source)
  }, [selectedBlock?.source])

  const onSave = useCallback(() => {
    const newData = {
      source,
    }
    onUpdateBlockItem(newData)
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [onUpdateBlockItem, setCurrentIndexBlock, setIsVisible, source])

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          <div className="mb-4">
            <Typography.Paragraph className="font-medium text-gray800 mb-2">Url</Typography.Paragraph>
            <Input
              value={source?.url}
              onChange={(e) =>
                setSource({
                  ...source,
                  url: e.target.value,
                })
              }
              placeholder="Enter link here"
            />
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
