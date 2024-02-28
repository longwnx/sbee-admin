'use client'

import { Button, Input, Typography } from 'antd'
import { map } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useRecoilState } from 'recoil'
import { ChooseActionForBottomBar, OpenIconLibrary } from '@/components'
import { useModifyUiLayout, useSelectedBottomTab } from '@/hooks'
import { currentIndexBottomTabState } from '@/recoil'

type Props = {
  setIsVisible?: (value: boolean) => void
}

export const SettingBottomTabItem: React.FC<Props> = ({ setIsVisible }) => {
  const [currentIndexBottomTab, setCurrentIndexBottomTab] = useRecoilState(currentIndexBottomTabState)
  const { bottomTabs, selectedBottomTab } = useSelectedBottomTab()
  const { onUpdateBottomTab } = useModifyUiLayout()
  const [title, setTitle] = useState<string>()
  const [iconset, setIconset] = useState<Iconset>()

  useEffect(() => {
    setTitle(selectedBottomTab?.title?.text)
    setIconset(selectedBottomTab?.iconset)
  }, [selectedBottomTab?.iconset, selectedBottomTab?.title?.text])

  const onSelectMedia = useCallback((data: any) => {
    setIconset({
      ...data,
    })
  }, [])

  const onRemoveThumb = useCallback(() => {
    setIconset(undefined)
  }, [])

  const onSave = useCallback(() => {
    const newBottomTabs = map(bottomTabs, (bottomTab, indexBottomTab) => {
      return {
        ...bottomTab,
        ...(indexBottomTab === currentIndexBottomTab && {
          title: {
            ...bottomTab?.title,
            text: title,
          },
          iconset,
        }),
      }
    })
    onUpdateBottomTab(newBottomTabs)
    setIsVisible?.(false)
    setCurrentIndexBottomTab(undefined)
  }, [bottomTabs, currentIndexBottomTab, iconset, onUpdateBottomTab, setCurrentIndexBottomTab, setIsVisible, title])

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
          <ChooseActionForBottomBar />
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
