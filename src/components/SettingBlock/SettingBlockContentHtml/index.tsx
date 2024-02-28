'use client'

import { Button } from 'antd'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'

type Props = {
  setIsVisible?: (value: boolean) => void
}

const TextEditor = dynamic(() => import('@/components/Dynamic/TextEditor'), { ssr: false })

export const SettingBlockContentHtml: React.FC<Props> = ({ setIsVisible }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [content, setContent] = useState<string>()

  useEffect(() => {
    setContent(selectedBlock?.content)
  }, [selectedBlock?.content])

  const onSave = useCallback(() => {
    const newData = {
      content,
    }
    onUpdateBlockItem(newData)
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [onUpdateBlockItem, content, setCurrentIndexBlock, setIsVisible])

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          <div className="mb-4">
            <TextEditor content={content} setContent={setContent} />
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
