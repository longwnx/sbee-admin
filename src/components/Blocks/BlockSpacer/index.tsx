'use client'

import { Typography } from 'antd'
import { css } from '@emotion/css'
import { IconSpacer } from '@/components'

type Props = {
  block: Spacer
}

export const BlockSpacer: React.FC<Props> = ({ block }) => {
  const className = css({
    height: block?.height || 4,
    backgroundColor: block?.backgroundColor || '#fff',
  })
  return <div className={className} />
}

export const PreviewBlockSpacer: React.FC = () => {
  return (
    <div className="flex items-center justify-center rounded-lg bg-gray100 border border-gray300 p-4">
      <IconSpacer className="mr-2" />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Spacer</Typography.Paragraph>
    </div>
  )
}
