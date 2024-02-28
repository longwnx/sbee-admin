'use client'

import { Drawer, Typography } from 'antd'
import { IconClose } from '@/components'
import { useDevice } from '@/hooks'

type Props = {
  isVisible?: boolean
  setIsVisible?: (isVisible: boolean) => void
  title?: string
  description?: string
  children?: React.ReactNode
}

export const SettingBottomTabWrapper: React.FC<Props> = ({ isVisible, setIsVisible, title, description, children }) => {
  const { isMobile } = useDevice()
  return (
    <Drawer
      bodyStyle={{ overflow: 'hidden', padding: 0 }}
      closable={false}
      placement="right"
      onClose={() => setIsVisible && setIsVisible(false)}
      open={isVisible}
      destroyOnClose
      width={isMobile ? '100%' : 400}
    >
      <div className="h-full flex flex-col">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Typography.Paragraph className="mb-0 text-gray800 font-semibold">{title}</Typography.Paragraph>
            <div className="cursor-pointer flex items-center">
              <IconClose onClick={() => setIsVisible?.(false)} />
            </div>
          </div>
          {description && (
            <Typography.Paragraph className="text-gray600 text-xs mb-4 mt-2">{description}</Typography.Paragraph>
          )}
        </div>
        {children}
      </div>
    </Drawer>
  )
}
