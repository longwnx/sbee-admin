'use client'

import { Button, Input, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { OpenIconLibrary, SettingActionBlock } from '@/components'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBlockActionButton: React.FC<Props> = ({ setIsVisible }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [title, setTitle] = useState<string>()
  const [action, setAction] = useState<Action>()
  const [iconset, setIconset] = useState<Iconset>()

  useEffect(() => {
    setTitle(selectedBlock?.title?.text)
    setAction(selectedBlock?.action)
    setIconset(selectedBlock?.iconset)
  }, [selectedBlock?.action, selectedBlock?.iconset, selectedBlock?.title?.text])

  const onSelectMedia = useCallback((data: any) => {
    setIconset({
      ...data,
    })
  }, [])

  const onRemoveThumb = useCallback(() => {
    setIconset(undefined)
  }, [])

  const onSave = useCallback(() => {
    const newData = {
      title: {
        text: title,
      },
      action,
      iconset,
    }
    onUpdateBlockItem(newData)
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [title, action, iconset, onUpdateBlockItem, setIsVisible, setCurrentIndexBlock])

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          <div className="mb-4">
            <Typography.Paragraph className="font-medium text-gray800 mb-2">Title</Typography.Paragraph>
            <Input size="large" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-4">
            <Typography.Paragraph className="font-semibold text-gray800 mb-2">Icon</Typography.Paragraph>
            <OpenIconLibrary src={iconset?.source?.uri} onUpload={onSelectMedia} onRemoveThumb={onRemoveThumb} />
          </div>
          {selectedBlock?.action?.editable !== false && <SettingActionBlock action={action} setAction={setAction} />}
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
