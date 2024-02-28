'use client'

import { Select, Tooltip } from 'antd'
import { filter, find, includes, map } from 'lodash'
import { useMemo } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { IconSearch } from '@/components/Icons'
import { useGetAllPageQuery, useGetIntegrationsByAppKeyQuery } from '@/hooks'
import { PageTypes } from '@/types'

type Props = {
  value?: string
  onChange?: (val?: string) => void
}

const FILTER_IN_APP_PAGE = [
  PageTypes.Cart,
  PageTypes.Notifications,
  PageTypes.Orders,
  PageTypes.Search,
  PageTypes.Wishlist,
  PageTypes.Address,
  PageTypes.CategoryTree,
  PageTypes.Custom,
  PageTypes.Brands,
]

export const SettingOpenInAppScreen: React.FC<Props> = ({ value, onChange }) => {
  const { data: allPage } = useGetAllPageQuery()
  const { data: integerations } = useGetIntegrationsByAppKeyQuery()

  const isActiveBarcodeQR = useMemo(() => find(integerations?.data, (i) => i?.code === 'barcodeQR')?.active, [integerations])
  const isActiveStoreLocator = useMemo(
    () => find(integerations?.data, (i) => i?.code === 'storeLocator')?.active,
    [integerations]
  )

  const listPage = useMemo(
    () =>
      filter(allPage?.data, (i) => {
        if (isActiveBarcodeQR) {
          FILTER_IN_APP_PAGE.push(PageTypes.Scanner)
        }
        if (isActiveStoreLocator) {
          FILTER_IN_APP_PAGE.push(PageTypes.StoreLocator)
        }
        return includes([...FILTER_IN_APP_PAGE], i?.type)
      }),
    [allPage?.data, isActiveBarcodeQR, isActiveStoreLocator]
  )

  return (
    <Select
      size="large"
      placeholder="Select screen"
      suffixIcon={<IconSearch width={20} height={20} />}
      className="w-full mt-4"
      options={map(listPage, (i) => ({
        label: (
          <span>
            {i?.title?.text}
            {i?.type === PageTypes.Scanner && (
              <Tooltip title="This page requires the Barcode & QR Scanner integration">
                <QuestionCircleOutlined rev className="ml-1 text-[#8C8C8C] text-sm" />
              </Tooltip>
            )}
            {i?.type === PageTypes.StoreLocator && (
              <Tooltip title="This page requires the Store Locator integration">
                <QuestionCircleOutlined rev className="ml-1 text-[#8C8C8C] text-sm" />
              </Tooltip>
            )}
          </span>
        ),
        value: i?.id,
      }))}
      value={find(listPage, (i) => i?.id === value)?.id}
      onChange={onChange}
      allowClear
      onClear={() => onChange?.(undefined)}
    />
  )
}
