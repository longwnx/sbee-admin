'use client'

import { App, Dropdown, Typography } from 'antd'
import classNames from 'classnames'
import { map } from 'lodash'
import { usePathname, useRouter } from 'next/navigation'
import { JSXElementConstructor, ReactElement, ReactFragment, ReactNode, ReactPortal, useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ProLayout } from '@ant-design/pro-components'
import { LOGO_LONG, LOGO_SHORT } from '@public'
import { IconQuestion, MenuIconItem } from '@/components'
import { useDevice } from '@/hooks'
import {
  collapsedState,
  flagChangeAppPageState,
  flagChangeAppSettingsState,
  flagChangeAppStoreInfoState,
  flagChangeLayoutState,
} from '@/recoil'
import { routes } from '@/routes'
import { getAccessToken } from '@/utils'

type Props = {
  children?: ReactNode
}

export const LayoutWrapper: React.FC<Props> = ({ children }) => {
  const { modal } = App.useApp()
  const router = useRouter()
  const pathname = usePathname()
  const [flagChangeAppPage, setFlagChangeAppPage] = useRecoilState(flagChangeAppPageState)
  const [flagChangeLayout, setFlagChangeLayout] = useRecoilState(flagChangeLayoutState)
  const [flagChangeAppSettings, setFlagChangeAppSettings] = useRecoilState(flagChangeAppSettingsState)
  const [flagChangeAppStoreInfo, setFlagChangeAppStoreInfo] = useRecoilState(flagChangeAppStoreInfoState)
  const [collapsed, setCollapsed] = useRecoilState(collapsedState)
  const { isDesktop } = useDevice()
  const token = getAccessToken()

  useEffect(() => {
    if (!isDesktop) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [isDesktop, setCollapsed])

  const onChangeRoute = useCallback(
    (path: string) => {
      switch (pathname) {
        case '/design/home':
        case '/design/catalog':
        case '/design/my-account':
        case '/design/pcustom-pages':
        case '/design/product-page':
        case '/design/category-tree':
        case '/design/brands':
          if (flagChangeAppPage) {
            modal.confirm({
              icon: null,
              content: (
                <div>
                  <ExclamationCircleOutlined className="mr-2 text-[#faad14]" />
                  <span>You have unsaved changes. Are you sure you want to leave this page?</span>
                </div>
              ),
              onOk: () => {
                router.push(path)
                setFlagChangeAppPage(false)
              },
              cancelButtonProps: {
                className: 'font-semibold text-gray800',
              },
              okButtonProps: {
                className: 'bg-primary font-semibold text-gray800',
              },
            })
          } else {
            router.push(path)
          }
          break
        case '/design/theme':
        case '/design/bottom-tab':
          if (flagChangeLayout) {
            modal.confirm({
              icon: null,
              content: (
                <div>
                  <ExclamationCircleOutlined className="mr-2 text-[#faad14]" />
                  <span>You have unsaved changes. Are you sure you want to leave this page?</span>
                </div>
              ),
              onOk: () => {
                router.push(path)
                setFlagChangeLayout(false)
              },
              cancelButtonProps: {
                className: 'font-semibold text-gray800',
              },
              okButtonProps: {
                className: 'bg-primary font-semibold text-gray800',
              },
            })
          } else {
            router.push(path)
          }
          break
        case '/settings':
          if (flagChangeAppSettings) {
            modal.confirm({
              icon: null,
              content: (
                <div>
                  <ExclamationCircleOutlined className="mr-2 text-[#faad14]" />
                  <span>You have unsaved changes. Are you sure you want to leave this page?</span>
                </div>
              ),
              onOk: () => {
                router.push(path)
                setFlagChangeAppSettings(false)
              },
              cancelButtonProps: {
                className: 'font-semibold text-gray800',
              },
              okButtonProps: {
                className: 'bg-primary font-semibold text-gray800',
              },
            })
          } else {
            router.push(path)
          }
          break
        case '/app-store-info':
          if (flagChangeAppStoreInfo) {
            modal.confirm({
              icon: null,
              content: (
                <div>
                  <ExclamationCircleOutlined className="mr-2 text-[#faad14]" />
                  <span>You have unsaved changes. Are you sure you want to leave this page?</span>
                </div>
              ),
              onOk: () => {
                router.push(path)
                setFlagChangeAppStoreInfo(false)
              },
              cancelButtonProps: {
                className: 'font-semibold text-gray800',
              },
              okButtonProps: {
                className: 'bg-primary font-semibold text-gray800',
              },
            })
          } else {
            router.push(path)
          }
          break
        default:
          router.push(path)
          break
      }
    },
    [
      flagChangeAppPage,
      flagChangeAppSettings,
      flagChangeAppStoreInfo,
      flagChangeLayout,
      modal,
      pathname,
      router,
      setFlagChangeAppPage,
      setFlagChangeAppSettings,
      setFlagChangeAppStoreInfo,
      setFlagChangeLayout,
    ]
  )

  // if (!token) return <></>

  return (
    <ProLayout
      logo={collapsed ? LOGO_SHORT : LOGO_LONG}
      title=""
      collapsed={collapsed}
      onCollapse={setCollapsed}
      collapsedButtonRender={(_: any, defaultDom: any) => (!isDesktop ? false : defaultDom)}
      headerRender={false}
      menu={{
        collapsedShowGroupTitle: true,
      }}
      menuFooterRender={() => (
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                label: <div className="w-32">Help center</div>,
                onClick: () => {
                  window.open('https://support.jmango360.com/portal/en/signin', '_blank')
                },
              },
              {
                key: '2',
                label: <div className="w-32">Tutorial videos</div>,
                onClick: () => {
                  window.open('https://www.youtube.com/user/jmango360', '_blank')
                },
              },
            ],
          }}
          placement="top"
        >
          <div
            className={classNames('flex items-center cursor-pointer', !collapsed ? 'pl-5 justify-start' : 'justify-center')}
          >
            <IconQuestion />
            {!collapsed && <Typography.Paragraph className="font-medium text-gray500 mb-0 ml-2">Help</Typography.Paragraph>}
          </div>
        </Dropdown>
      )}
      locale="en-US"
      // @ts-ignore
      menuItemRender={(
        menuItemProps: any,
        defaultDom:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | ReactFragment
          | ReactPortal
          | null
          | undefined
      ) => {
        return <div onClick={() => onChangeRoute(menuItemProps.path || '/')}>{defaultDom}</div>
      }}
      menuDataRender={(menuList: any) => {
        return map(menuList, (item) => {
          return {
            ...item,
            icon: <MenuIconItem path={item.path} />,
            children: item.children,
          }
        })
      }}
      route={{
        routes,
      }}
    >
      {children}
    </ProLayout>
  )
}
