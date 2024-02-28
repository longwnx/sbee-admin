'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import { map, times } from 'lodash'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '@/hooks'

type Props = {}

export const BlockRecentlyViewed: React.FC<Props> = () => {
  return (
    <div className="p-4">
      <PreviewBlockRecentlyViewed />
    </div>
  )
}

export const PreviewBlockRecentlyViewed: React.FC = () => {
  const { imgRatio, corner } = useTheme()
  const height = 104 / imgRatio
  return (
    <div className="rounded-lg bg-gray100 border border-gray300 p-4">
      <div className="mb-3 flex items-center justify-between">
        <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Recently viewed</Typography.Paragraph>
        <Typography.Paragraph className="mb-0 text-gray700 text-xs">
          View all <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
        </Typography.Paragraph>
      </div>
      <div className="flex flex-nowrap overflow-hidden pb-4">
        {map(times(4), (item) => (
          <div key={item} className="mr-4" style={{ flex: '0 0 auto' }}>
            <div className={classNames('w-[104px] bg-white', corner)} style={{ height }} />
            <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold mt-2">
              Product name
            </Typography.Paragraph>
            <Typography.Paragraph className="mb-0 text-gray400 text-xs">$100.00</Typography.Paragraph>
          </div>
        ))}
      </div>
    </div>
  )
}
