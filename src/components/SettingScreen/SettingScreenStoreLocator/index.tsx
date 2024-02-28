'use client'

import { Input, Switch, Typography } from 'antd'
import { useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useRecoilValue } from 'recoil'
import { ColorBox } from '@/components'
import { useModifyUiPages } from '@/hooks'
import { appPageState } from '@/recoil'
import { PageTypes } from '@/types'

type Props = {
  activePage?: AppPage
}

export const SettingScreenStoreLocator: React.FC<Props> = ({ activePage }) => {
  const appPage = useRecoilValue(appPageState)
  const { onUpdatePages } = useModifyUiPages()
  const [isRequired, setIsRequired] = useState(false)

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          <Typography.Paragraph className="text-gray800 mb-2">Screen name</Typography.Paragraph>
          <div className="mb-4">
            <Input
              value={appPage?.title?.text}
              onChange={(e) => {
                if (e.target.value === '') {
                  setIsRequired(true)
                } else {
                  setIsRequired(false)
                }
                onUpdatePages(appPage?.pages, {
                  title: {
                    ...appPage?.title,
                    text: e.target.value,
                  },
                })
              }}
              size="large"
            />
            {isRequired && (
              <Typography.Text type="danger" className="mt-2">
                Required!
              </Typography.Text>
            )}
          </div>
          {activePage?.type === PageTypes.StoreLocator && (
            <>
              <div className="flex items-center justify-between mb-4">
                <Typography.Paragraph className="mb-0 flex items-center gap-1">
                  Show location search bar
                </Typography.Paragraph>
                <Switch
                  checked={appPage?.options?.layout?.searchBar?.visible}
                  onChange={(checked) => {
                    onUpdatePages(appPage?.pages, {
                      options: {
                        ...appPage?.options,
                        layout: {
                          ...appPage?.options?.layout,
                          searchBar: {
                            ...appPage?.options?.layout?.searchBar,
                            visible: checked,
                          },
                        },
                      },
                    })
                  }}
                />
              </div>
              {appPage?.options?.layout?.searchBar?.visible && (
                <>
                  <Typography.Paragraph className="text-gray800 mb-2">Hint text</Typography.Paragraph>
                  <div className="flex items-center mb-4">
                    <Input
                      value={appPage?.options?.layout?.searchBar?.placeholder || ''}
                      onChange={(e) => {
                        onUpdatePages(appPage?.pages, {
                          options: {
                            ...appPage?.options,
                            layout: {
                              ...appPage?.options?.layout,
                              searchBar: {
                                ...appPage?.options?.layout?.searchBar,
                                placeholder: e.target.value || '',
                              },
                            },
                          },
                        })
                      }}
                      size="large"
                    />
                  </div>
                  <Typography.Paragraph className="text-gray800 mb-2">Background color</Typography.Paragraph>
                  <div className="flex items-center justify-between mb-4">
                    <Input
                      value={appPage?.options?.layout?.searchBar?.backgroundColor || '#FFFFFF'}
                      onChange={(e) => {
                        onUpdatePages(appPage?.pages, {
                          options: {
                            ...appPage?.options,
                            layout: {
                              ...appPage?.options?.layout,
                              searchBar: {
                                ...appPage?.options?.layout?.searchBar,
                                backgroundColor: e.target.value || '#FFFFFF',
                              },
                            },
                          },
                        })
                      }}
                      size="large"
                      className="mr-2 flex-1"
                    />
                    <ColorBox
                      color={appPage?.options?.layout?.searchBar?.backgroundColor || '#FFFFFF'}
                      onChange={(color) => {
                        onUpdatePages(appPage?.pages, {
                          options: {
                            ...appPage?.options,
                            layout: {
                              ...appPage?.options?.layout,
                              searchBar: {
                                ...appPage?.options?.layout?.searchBar,
                                backgroundColor: color || '#FFFFFF',
                              },
                            },
                          },
                        })
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Scrollbars>
    </div>
  )
}
