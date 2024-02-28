'use client'

import { Typography } from 'antd'
import { isEmpty } from 'lodash'
import { IconImageAdd } from '@/components'

type Props = {
  block: Banner
}

export const BlockBanner: React.FC<Props> = ({ block }) => {
  return (
    <div>
      {!isEmpty(block?.images?.[0]?.src) ? (
        <div className="w-full h-auto">
          <img src={block?.images?.[0]?.src || ''} className="max-w-full w-full h-auto" />
        </div>
      ) : (
        <div className="p-4">
          <PreviewBlockBanner />
        </div>
      )}
    </div>
  )
}

export const PreviewBlockBanner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray100 border border-gray300 px-4 py-20">
      <IconImageAdd className="mb-2" />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Image banner</Typography.Paragraph>
      <Typography.Paragraph className="mb-0 text-gray400 text-xs">Upload your design here</Typography.Paragraph>
    </div>
  )
}
