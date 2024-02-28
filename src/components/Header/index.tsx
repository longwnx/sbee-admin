'use client'

import { App, Avatar, Button, Dropdown, Space, Typography } from 'antd'
import { find } from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { LOGO_APP } from '@public'
import { IconMenu } from '@/components'
import { useGetListAppByUserQuery, useGetUserInfoQuery, useLogout, usePublishAppMutation } from '@/hooks'
import { appKeyState, collapsedState, isVisiblePreviewAppState } from '@/recoil'
import { getThirtParty } from '@/utils'


type Props = {}

export const Header: React.FC<Props> = () => {
  const { modal } = App.useApp()
  const router = useRouter()
  const { data: userInfo } = useGetUserInfoQuery()
  const [appKey, setAppKey] = useRecoilState(appKeyState)
  const [collapsed, setCollapsed] = useRecoilState(collapsedState)
  const setIsVisiblePreviewApp = useSetRecoilState(isVisiblePreviewAppState)
  const { data: listApp } = useGetListAppByUserQuery()
  const { onLogout } = useLogout()
  const { mutate: onPublishApp, isPending: isLoadingPublishApp } = usePublishAppMutation()
  const thirtParty = useMemo(() => getThirtParty(), [])
  const [count, setCount] = useState(1)

  useEffect(() => {
    const appKey = localStorage.getItem('appKey')
    if (appKey) {
      setAppKey(appKey)
    } else if (listApp?.data?.[0]?.appKey) {
      setAppKey(listApp?.data?.[0]?.appKey)
    }
  }, [listApp?.data, setAppKey])

  return (
    <div className="flex h-full items-center px-4 justify-between border-b w-full bg-white">
      <div className="flex-col hidden md:flex">
        <Space>
          <Avatar
            src={find(listApp?.data, { appKey })?.icon || LOGO_APP}
            shape="square"
            className="border-1 border-gray-300"
            onClick={() => {
              setCount(count + 1)
              if (count === 5) {
                router.push('/insights')
                setCount(1)
              }
            }}
          />
          <div>
            <Typography.Paragraph className="font-semibold text-gray800 mb-0 text-xs">
              {find(listApp?.data, { appKey })?.applicationName}App
            </Typography.Paragraph>
            <Typography.Paragraph className="text-gray800 text-xs mb-0">{appKey}</Typography.Paragraph>
          </div>
        </Space>
      </div>
      <IconMenu className="block md:hidden" onClick={() => setCollapsed(!collapsed)} />
      <Space>
        <Button className="font-semibold text-gray800" onClick={() => setIsVisiblePreviewApp(true)}>
          Preview
        </Button>
        <Button
          className="font-semibold text-gray800"
          type="primary"
          loading={isLoadingPublishApp}
          onClick={() => {
            modal.confirm({
              icon: null,
              content: (
                <div>
                  <ExclamationCircleOutlined className="mr-2 text-[#faad14]" />
                  <span>Would you like to make the current design available to all mobile users?</span>
                </div>
              ),
              onOk: () => {
                onPublishApp()
              },
              cancelButtonProps: {
                className: 'font-semibold text-gray800',
              },
              okButtonProps: {
                className: 'bg-primary font-semibold text-gray800',
              },
            })
          }}
        >
          Publish to mobile
        </Button>
        <Dropdown
          menu={{
            items: [
              {
                key: 'info',
                label: (
                  <>
                    <div className="flex flex-col">
                      <Typography.Text className="font-semibold text-xs md:text-sm">
                        {userInfo?.preferred_username}
                      </Typography.Text>
                      <Typography.Text className="text-gray500 text-xs md:text-sm mb-1">{userInfo?.email}</Typography.Text>
                    </div>
                  </>
                ),
                disabled: true,
              },
              {
                key: 'profile',
                label: 'Profile',
                onClick: () => {
                  router.push('/profile')
                },
              },
              {
                key: 'subscription-info',
                label: 'Subscription Info',
                onClick: () => {
                  window.open('https://subscriptions.jmango360.com/portal/jmango', '_blank')
                },
              },
              // {
              //   key: 'pricing',
              //   label: 'Pricing',
              //   onClick: () => {
              //     router.push('/pricing')
              //   },
              // },
              ...(thirtParty !== 'true'
                ? [
                    {
                      key: 'logout',
                      danger: true,
                      label: 'Logout',
                      onClick: () => onLogout(),
                    },
                  ]
                : []),
            ],
          }}
        >
          <Avatar size={32} className="bg-gray600 cursor-pointer">
            <span className="uppercase font-bold">{userInfo?.preferred_username?.split('')?.[0]}</span>
          </Avatar>
        </Dropdown>
      </Space>
    </div>
  )
}
