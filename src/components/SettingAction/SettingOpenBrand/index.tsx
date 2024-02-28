'use client'

import { Select, Typography } from 'antd'
import { filter, includes, map } from 'lodash'
import { useState } from 'react'
import { DEFAULT_IMAGE } from '@public'
import { IconSearch } from '@/components/Icons'
import { useGetAllBrandQuery } from '@/hooks'

type Props = {
  value?: number
  onChange?: (val?: number) => void
}

export const SettingOpenBrand: React.FC<Props> = ({ value, onChange }) => {
  const { data: allBrand } = useGetAllBrandQuery()
  const [search, setSearch] = useState('')

  return (
    <Select
      size="large"
      placeholder="Search brand"
      suffixIcon={<IconSearch width={20} height={20} />}
      className="w-full mt-4"
      options={map(
        filter(allBrand?.data?.brands, (i) => includes(i?.name?.toLowerCase(), search.toLowerCase())),
        (i) => ({
          label: (
            <div className="flex items-center h-full">
              <img
                src={i?.image || DEFAULT_IMAGE}
                className="w-[30px] h-[30px] mr-2 object-cover rounded-md overflow-hidden"
              />
              <Typography.Paragraph className="mb-0 flex-1" ellipsis={{ rows: 1 }}>
                {i?.name}
              </Typography.Paragraph>
            </div>
          ),
          value: i?.id,
        })
      )}
      optionLabelProp="label"
      filterOption={false}
      value={value}
      onChange={onChange}
      searchValue={search}
      onSearch={setSearch}
      showSearch
      allowClear
      onClear={() => onChange?.(undefined)}
    />
  )
}
