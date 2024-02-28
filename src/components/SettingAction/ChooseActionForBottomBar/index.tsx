'use client'

import { Form, Select, Tooltip } from 'antd'
import { filter, find, includes, map } from 'lodash'
import { useCallback, useEffect, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { IconSearch } from '@/components'
import { useGetAllPageQuery, useGetIntegrationsByAppKeyQuery, useModifyUiLayout, useSelectedBottomTab } from '@/hooks'
import { currentIndexBottomTabState } from '@/recoil'
import { PageTypes } from '@/types'

type Props = {}

const FILTER_IN_APP_PAGE = [
  PageTypes.Home,
  PageTypes.CategoryTree,
  PageTypes.Cart,
  PageTypes.Notifications,
  PageTypes.MyAccount,
  PageTypes.Wishlist,
  PageTypes.Search,
  PageTypes.CategoryTree,
  PageTypes.Custom,
  PageTypes.Brands,
]

export const ChooseActionForBottomBar: React.FC<Props> = () => {
  const [form] = Form.useForm()
  const currentIndexBottomTab = useRecoilValue(currentIndexBottomTabState)
  const { bottomTabs, selectedBottomTab } = useSelectedBottomTab()
  const { onUpdateBottomTab } = useModifyUiLayout()
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

  useEffect(() => {
    form.setFieldsValue({
      page: selectedBottomTab?.page?.id,
    })
  }, [form, selectedBottomTab?.page?.id])

  const onChangeData = useCallback(
    (obj: any) => {
      const newPages = map(bottomTabs, (bottomTab, indexBottomTab) => ({
        ...bottomTab,
        ...(indexBottomTab === currentIndexBottomTab && {
          page: {
            ...obj,
          },
        }),
      }))
      onUpdateBottomTab(newPages)
    },
    [bottomTabs, currentIndexBottomTab, onUpdateBottomTab]
  )

  const onFieldsChange = useCallback(
    (changedFields: any) => {
      if (changedFields?.[0]?.name?.[0] === 'page') {
        onChangeData({
          id: changedFields?.[0].value,
          title: {
            text: find(listPage, { id: changedFields?.[0].value })?.title?.text,
          },
        })
      }
    },
    [listPage, onChangeData]
  )

  return (
    <div>
      <Form name="formAction" form={form} layout="vertical" onFieldsChange={onFieldsChange}>
        <Form.Item name="page" label="Page">
          <Select
            size="large"
            placeholder="Select screen"
            suffixIcon={<IconSearch width={20} height={20} />}
            className="w-full"
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
            allowClear
          />
        </Form.Item>
      </Form>
    </div>
  )
}
