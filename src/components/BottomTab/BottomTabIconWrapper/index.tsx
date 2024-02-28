'use client'

import { App, Popover } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { BottomTabIcon, SettingBottomTabItem, SettingBottomTabWrapper, Toolbar } from '@/components'
import { useModifyUiLayout } from '@/hooks'
import { currentIndexBottomTabState } from '@/recoil'
import { PageTypes } from '@/types'

type Props = {
  bottomTab: BottomTab
  index: number
  isEdit?: boolean
}

export const BottomTabIconWrapper: React.FC<Props> = ({ bottomTab, index, isEdit = false }) => {
  const { message } = App.useApp()
  const setCurrentIndexBottomTab = useSetRecoilState(currentIndexBottomTabState)
  const { onRemoveBottomTab } = useModifyUiLayout()
  const [isVisibleToolbar, setIsVisibleToolbar] = useState(false)
  const [isVisibleSetting, setIsVisibleSetting] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isVisibleSetting) {
      setCurrentIndexBottomTab(undefined)
    }
  }, [isVisibleSetting, setCurrentIndexBottomTab])

  return (
    <>
      <div ref={isEdit ? ref : null} className="w-full relative">
        <Popover
          open={isEdit && isVisibleToolbar}
          onOpenChange={setIsVisibleToolbar}
          destroyTooltipOnHide
          placement="top"
          trigger="hover"
          content={
            <Toolbar
              onDesign={(e) => {
                e.stopPropagation()
                setCurrentIndexBottomTab(index)
                setIsVisibleToolbar(false)
                setIsVisibleSetting(true)
              }}
              onDelete={() => {
                if (bottomTab?.page?.type === PageTypes.Home) {
                  message.error('Home cannot be deleted')
                  return
                }
                if (bottomTab?.page?.type === PageTypes.Cart) {
                  message.error('Shopping cart cannot be deleted')
                  return
                }
                if (bottomTab?.page?.type === PageTypes.MyAccount) {
                  message.error('My account cannot be deleted')
                  return
                }
                onRemoveBottomTab(index)
              }}
            />
          }
        >
          <div>
            <BottomTabIcon bottomTab={bottomTab} />
          </div>
        </Popover>
      </div>
      <SettingBottomTabWrapper isVisible={isVisibleSetting} setIsVisible={setIsVisibleSetting} title="Icon" description="">
        <SettingBottomTabItem setIsVisible={setIsVisibleSetting} />
      </SettingBottomTabWrapper>
    </>
  )
}
