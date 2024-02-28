'use client'

import classNames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'
import { find, map } from 'lodash'
import { useRecoilState } from 'recoil'
import { css } from '@emotion/css'
import { RangePickerCustom } from '@/components'
import { dateRangeState } from '@/recoil'

type Props = {
  activeKey?: string
  setActiveKey?: (key: string) => void
  showDateRange?: boolean
  items?: {
    key: string
    label: string
    children?: React.ReactNode
  }[]
  color?: string
}

export const TabsCustom: React.FC<Props> = ({ activeKey, setActiveKey, items, showDateRange, color = '#C5AE8F' }) => {
  const [dateRange, setDateRange] = useRecoilState(dateRangeState)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-white">
        {map(items, (item) => (
          <div
            key={item?.key}
            className={classNames(
              'flex-1 w-full flex items-center justify-center border-b-2 h-14 cursor-pointer',
              activeKey === item?.key ? css({ borderColor: color }) || 'border-primary' : 'border-gray200'
            )}
            onClick={() => setActiveKey?.(item?.key)}
          >
            <div className={classNames('font-medium', activeKey === item?.key ? css({ color }) || 'text-primary' : '')}>
              {item?.label}
            </div>
          </div>
        ))}
        {showDateRange && (
          <div className="flex items-center justify-center border-b-2 h-14 border-gray200 px-4">
            <RangePickerCustom
              allowClear={false}
              format="MMM DD, YYYY"
              value={dateRange}
              onSubmit={(dates) => {
                setDateRange(dates as [Dayjs, Dayjs])
              }}
              disabledDate={(current) => {
                return current && current > dayjs().endOf('day')
              }}
            />
          </div>
        )}
      </div>
      <div className="flex-1 h-full overflow-auto">{find(items, (item) => item?.key === activeKey)?.children}</div>
    </div>
  )
}
