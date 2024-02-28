'use client'

import { Typography } from 'antd'
import { IconChevronRight, IconTouch } from '@/components/Icons'

type Props = {
  block: ActionButton
}

export const BlockActionButton: React.FC<Props> = ({ block }) => {
  return (
    <div className="w-full h-14 px-4 flex items-center justify-between">
      <div className="flex items-center">
        {block?.iconset?.source?.uri && (
          <div className="w-6 h-6 flex items-center justify-center mr-2">
            <img src={block?.iconset?.source?.uri} alt="" className="object-contain" />
          </div>
        )}
        <Typography.Paragraph className="mb-0" ellipsis={{ rows: 1 }}>
          {block?.title?.text}
        </Typography.Paragraph>
      </div>
      <IconChevronRight />
    </div>
  )
}

export const PreviewBlockActionButton: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray100 border border-gray300 p-4">
      <IconTouch className="mb-2" />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Action button</Typography.Paragraph>
    </div>
  )
}
