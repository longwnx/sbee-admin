'use client'

import { Empty, Select, Spin, Typography } from 'antd'
import { find, map } from 'lodash'
import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { DEFAULT_IMAGE } from '@public'
import { IconSearch } from '@/components/Icons'
import { useSearchProductQuery } from '@/hooks'

type Props = {
  value?: string
  onChange?: (val?: string) => void
}

export const SettingOpenProduct: React.FC<Props> = ({ value, onChange }) => {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const debouncedSearch = useDebounce<string>(search, 500)

  const { data, isLoading } = useSearchProductQuery({
    query,
  })

  const [products, setProducts] = useState<any>()

  useEffect(() => {
    setProducts(
      map(data?.data, (i) => ({
        id: i?.id,
        name: i?.name,
        image: find(i?.images, (img) => img?.isThumbnail)?.urlThumbnail,
        sku: i?.sku,
      }))
    )
  }, [data])

  useEffect(() => {
    const newData = JSON.parse(value || '{}')
    const isExist = !!find(products, (i) => Number(i?.id) === Number(newData?.id))
    if (value && !isExist) {
      setProducts((prev: any) => [...prev, JSON.parse(value)])
    }
  }, [products, value])

  useEffect(() => {
    setQuery(debouncedSearch)
  }, [debouncedSearch])

  return (
    <Select
      size="large"
      showSearch
      suffixIcon={<IconSearch width={20} height={20} />}
      filterOption={false}
      className="w-full mt-4"
      placeholder="Search by product name or SKU"
      options={map(products, (i) => ({
        label: (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={i?.image || DEFAULT_IMAGE}
                className="w-[30px] h-[30px] mr-2 object-cover rounded-md overflow-hidden"
              />
              <Typography.Paragraph ellipsis className="mb-0 w-50">
                {i?.name}
              </Typography.Paragraph>
            </div>
            <div>{i?.sku}</div>
          </div>
        ),
        value: JSON.stringify({
          id: i?.id,
          name: i?.name,
          image: i?.image,
          sku: i?.sku,
        }),
      }))}
      value={value}
      onChange={onChange}
      searchValue={search}
      onSearch={setSearch}
      allowClear
      onClear={() => onChange?.(undefined)}
      notFoundContent={
        isLoading ? (
          <div className="flex justify-center items-center p-6">
            <Spin />
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
    />
  )
}
