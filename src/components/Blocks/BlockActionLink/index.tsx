'use client'

import { Typography } from 'antd'
import { Link2Icon } from 'lucide-react'
import { IconChevronRight } from '@/components/Icons'

type Props = {
  block: ActionLink
}

export const BlockActionLink: React.FC<Props> = ({ block }) => {
  return (
    <div className="w-full h-14 px-4 flex items-center justify-between border-b-4 border-[#F4F4F4]">
      <div className="flex items-center mr-2">
        <Typography.Paragraph className="mb-0 font-semibold" ellipsis={{ rows: 1 }}>
          {block?.title?.text}
        </Typography.Paragraph>
      </div>
      <IconChevronRight />
    </div>
  )
}

export const PreviewBlockActionLink: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray100 border border-gray300 p-4">
      <Link2Icon className="mb-2" strokeWidth={1.5} />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Web link</Typography.Paragraph>
    </div>
  )
}
