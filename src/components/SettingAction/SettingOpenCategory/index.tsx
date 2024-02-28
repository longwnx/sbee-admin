'use client'

import { Select, Tooltip, Typography } from 'antd'
import { find, map } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { DEFAULT_IMAGE } from '@public'
import { IconSearch } from '@/components'
import { useSearchCategoryQuery } from '@/hooks'

type Props = {
  value?: string
  onChange?: (val?: string) => void
  placeholder?: string
}

export const SettingOpenCategory: React.FC<Props> = ({ value, onChange, placeholder = 'Search category' }) => {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const debouncedSearch = useDebounce<string>(search, 500)

  const { data } = useSearchCategoryQuery({
    query,
  })

  const { data: allCategories } = useSearchCategoryQuery()

  const [categories, setCategories] = useState<any>()

  const findParentCategory = useCallback(
    (parentId: number) => find(allCategories?.data, (i) => i?.id === parentId),
    [allCategories?.data]
  )

  useEffect(() => {
    setCategories(
      map(data?.data, (i) => ({
        id: i?.id,
        name: i?.name,
        image: i?.image,
        manufactureCategory: i?.manufactureCategory,
        parentId: i?.parentId,
      }))
    )
  }, [data])

  useEffect(() => {
    setQuery(debouncedSearch)
  }, [debouncedSearch])

  return (
    <Select
      size="large"
      showSearch
      placeholder={placeholder}
      suffixIcon={<IconSearch width={20} height={20} />}
      className="w-full mt-4"
      optionLabelProp="label"
      options={map(categories, (i) => {
        const content =
          (findParentCategory(i?.parentId)?.name ? `${findParentCategory(i?.parentId)?.name} / ` : '') + i?.name
        return {
          value: String(i?.id),
          label: (
            <Tooltip title={content}>
              <div className="flex items-center h-full">
                <img
                  src={i?.image || DEFAULT_IMAGE}
                  className="w-[30px] h-[30px] mr-2 object-cover rounded-md overflow-hidden"
                />
                <Typography.Paragraph className="mb-0 flex-1" ellipsis={{ rows: 1 }}>
                  {content}
                </Typography.Paragraph>
              </div>
            </Tooltip>
          ),
        }
      })}
      filterOption={false}
      value={value}
      onChange={onChange}
      searchValue={search}
      onSearch={setSearch}
      allowClear
      onClear={() => onChange?.(undefined)}
    />
  )
}
