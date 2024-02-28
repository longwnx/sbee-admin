'use client'

import { Typography } from 'antd'
import dayjs from 'dayjs'
import { find, isEmpty } from 'lodash'
import { IconChevronRight, IconStoreLocation } from '@/components/Icons'

type Props = {
  block: Store
}

export const BlockStoreLocation: React.FC<Props> = ({ block }) => {
  const getCurrenDay = dayjs().format('dddd').toLowerCase()
  const findCurrenDay = find(block?.openDays, (item) => item.type === getCurrenDay)
  const isShowOpenDay = !isEmpty(findCurrenDay?.time)

  return block?.store?.address ? (
    <div className="w-full p-4 flex items-center justify-between border-b border-b-[#E4E7ED]">
      <div className="flex flex-col gap-1">
        <div className="mb-0 font-semibold line-clamp-1">{block?.store?.name}</div>
        <div className="line-clamp-2">{block?.store?.address}</div>
        {isShowOpenDay && <div className="mb-0 line-clamp-1">{`${findCurrenDay?.label} ${findCurrenDay?.time}`}</div>}
      </div>
      <IconChevronRight />
    </div>
  ) : (
    <div className="p-4">
      <PreviewBlockStoreLocation />
    </div>
  )
}

export const PreviewBlockStoreLocation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray100 border border-gray300 px-4 py-20">
      <IconStoreLocation className="mb-2" />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Store location</Typography.Paragraph>
      <Typography.Paragraph className="mb-0 text-gray400 text-xs">Upload your design here</Typography.Paragraph>
    </div>
  )
}
