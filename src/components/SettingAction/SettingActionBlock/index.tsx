'use client'

import { Typography } from 'antd'
import { find, isEmpty } from 'lodash'
import {
  IconBrand,
  IconCollection,
  IconEmail,
  IconPhone,
  IconProduct,
  IconSms,
  IconSocial,
  IconUrl,
  IconWebpage,
  RadioButtonCustom,
  SettingMakePhoneCall,
  SettingOpenBrand,
  SettingOpenCategory,
  SettingOpenInAppScreen,
  SettingOpenProduct,
  SettingOpenUrl,
  SettingSendEmail,
  SettingSendSMS,
  SettingSocialMedia,
} from '@/components'
import { useGetAllBrandQuery, useGetAllPageQuery, useSearchCategoryTreeQuery } from '@/hooks'
import { ActionType } from '@/types'

type Props = {
  action?: Action
  setAction?: (value: Action) => void
}

export const SettingActionBlock: React.FC<Props> = ({ action, setAction }) => {
  const { data: allPage } = useGetAllPageQuery()
  const { data: allBrand } = useGetAllBrandQuery()
  const { mutateAsync: onSearchCategoryTree } = useSearchCategoryTreeQuery()
  return (
    <>
      <Typography.Paragraph className="font-semibold text-gray800 mt-6 mb-4">
        Where should this lead your customers?
      </Typography.Paragraph>
      <RadioButtonCustom
        activeKey={action?.type}
        setActiveKey={(type) => {
          setAction?.({
            ...action,
            type,
          })
        }}
        items={[
          {
            key: ActionType.OpenCategory,
            label: 'Category',
            icon: <IconCollection stroke={action?.type === ActionType.OpenCategory ? '#9E8B72' : '#667085'} />,
          },
          {
            key: ActionType.OpenBrand,
            label: 'Brand',
            icon: <IconBrand stroke={action?.type === ActionType.OpenBrand ? '#9E8B72' : '#667085'} />,
          },
          {
            key: ActionType.OpenProduct,
            label: 'Product',
            icon: <IconProduct stroke={action?.type === ActionType.OpenProduct ? '#9E8B72' : '#667085'} />,
          },
          {
            key: ActionType.OpenInAppScreen,
            label: 'Page',
            icon: <IconWebpage stroke={action?.type === ActionType.OpenInAppScreen ? '#9E8B72' : '#667085'} />,
          },
          {
            key: ActionType.OpenUrl,
            label: 'URL',
            icon: <IconUrl stroke={action?.type === ActionType.OpenUrl ? '#9E8B72' : '#667085'} />,
          },
          {
            key: ActionType.OpenSocialMedia,
            label: 'Social',
            icon: <IconSocial stroke={action?.type === ActionType.OpenSocialMedia ? '#9E8B72' : '#667085'} />,
          },
          {
            key: ActionType.MakePhoneCall,
            label: 'Phone',
            icon: <IconPhone stroke={action?.type === ActionType.MakePhoneCall ? '#9E8B72' : '#667085'} />,
          },
          {
            key: ActionType.SendSMS,
            label: 'SMS',
            icon: <IconSms stroke={action?.type === ActionType.SendSMS ? '#9E8B72' : '#667085'} />,
          },
          {
            key: ActionType.SendEmail,
            label: 'Email',
            icon: <IconEmail stroke={action?.type === ActionType.SendEmail ? '#9E8B72' : '#667085'} />,
          },
        ]}
      />
      {action?.type === ActionType.OpenCategory && (
        <SettingOpenCategory
          value={!isEmpty(action?.category) ? String(action?.category?.id) : undefined}
          onChange={async (id) => {
            const findCate = await onSearchCategoryTree({
              id,
            })
            setAction?.({
              ...action,
              category: {
                ...findCate,
              },
            })
          }}
        />
      )}
      {action?.type === ActionType.OpenBrand && (
        <SettingOpenBrand
          value={!isEmpty(action?.brand) ? action?.brand?.id : undefined}
          onChange={async (id) => {
            const findBrand = find(allBrand?.data?.brands, { id })
            setAction?.({
              ...action,
              brand: {
                ...findBrand,
              },
            })
          }}
        />
      )}
      {action?.type === ActionType.OpenProduct && (
        <SettingOpenProduct
          value={!isEmpty(action?.product) ? JSON.stringify(action?.product) : undefined}
          onChange={(val) => {
            const product = JSON.parse(val || '{}')
            setAction?.({
              ...action,
              product,
            })
          }}
        />
      )}
      {action?.type === ActionType.OpenInAppScreen && (
        <SettingOpenInAppScreen
          value={action?.page?.id}
          onChange={(id) => {
            const findPage = find(allPage?.data, { id })
            setAction?.({
              ...action,
              page: {
                id,
                title: findPage?.title,
              },
            })
          }}
        />
      )}
      {action?.type === ActionType.OpenUrl && (
        <SettingOpenUrl
          value={action?.url}
          onChange={(url) => {
            setAction?.({
              ...action,
              url,
            })
          }}
        />
      )}
      {action?.type === ActionType.SendEmail && (
        <SettingSendEmail
          value={action?.email}
          onChange={(email) => {
            setAction?.({
              ...action,
              email,
            })
          }}
        />
      )}
      {action?.type === ActionType.SendSMS && (
        <SettingSendSMS
          value={action?.sms}
          onChange={(sms) => {
            setAction?.({
              ...action,
              sms,
            })
          }}
        />
      )}
      {action?.type === ActionType.MakePhoneCall && (
        <SettingMakePhoneCall
          value={action?.phone}
          onChange={(phone) => {
            setAction?.({
              ...action,
              phone,
            })
          }}
        />
      )}
      {action?.type === ActionType.OpenSocialMedia && (
        <SettingSocialMedia
          value={action?.socialMedia}
          onChange={(socialMedia) => {
            setAction?.({
              ...action,
              socialMedia,
            })
          }}
        />
      )}
    </>
  )
}
