'use client'

import { Input, InputNumber, Switch, Typography } from 'antd'
import { useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useRecoilValue } from 'recoil'
import { ColorBox } from '@/components'
import { useModifyUiPages } from '@/hooks'
import { appPageState } from '@/recoil'

type Props = {}

export const SettingScreenBrand: React.FC<Props> = () => {
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
          <div className="flex items-center justify-between mb-4">
            <Typography.Paragraph className="mb-0 flex items-center gap-1">Show brand search bar</Typography.Paragraph>
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
          <div className="flex items-center justify-between mb-4">
            <Typography.Paragraph className="mb-0 flex items-center gap-1">Show A-Z scroll bar</Typography.Paragraph>
            <Switch
              checked={appPage?.options?.miniMapEnabled}
              onChange={(checked) => {
                onUpdatePages(appPage?.pages, {
                  options: {
                    ...appPage?.options,
                    miniMapEnabled: checked,
                  },
                })
              }}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <Typography.Paragraph className="mb-0 flex items-center gap-1">Show spacer</Typography.Paragraph>
            <Switch
              checked={appPage?.options?.itemSeparator?.visible}
              onChange={(checked) => {
                onUpdatePages(appPage?.pages, {
                  options: {
                    ...appPage?.options,
                    itemSeparator: {
                      ...appPage?.options?.itemSeparator,
                      visible: checked,
                    },
                  },
                })
              }}
            />
          </div>
          {appPage?.options?.itemSeparator?.visible && (
            <>
              <Typography.Paragraph className="text-gray800 mb-2">Height</Typography.Paragraph>
              <div className="flex items-center mb-4">
                <InputNumber
                  value={appPage?.options?.itemSeparator?.height}
                  onChange={(height) => {
                    onUpdatePages(appPage?.pages, {
                      options: {
                        ...appPage?.options,
                        itemSeparator: {
                          ...appPage?.options?.itemSeparator,
                          height,
                        },
                      },
                    })
                  }}
                  min={0}
                  className="w-full"
                  size="large"
                />
              </div>
              <Typography.Paragraph className="text-gray800 mb-2">Background color</Typography.Paragraph>
              <div className="flex items-center justify-between mb-4">
                <Input
                  value={appPage?.options?.itemSeparator?.backgroundColor || '#F5F5F5'}
                  onChange={(e) => {
                    onUpdatePages(appPage?.pages, {
                      options: {
                        ...appPage?.options,
                        itemSeparator: {
                          ...appPage?.options?.itemSeparator,
                          backgroundColor: e.target.value || '#F5F5F5',
                        },
                      },
                    })
                  }}
                  size="large"
                  className="mr-2 flex-1"
                />
                <ColorBox
                  color={appPage?.options?.itemSeparator?.backgroundColor || '#F5F5F5'}
                  onChange={(color) => {
                    onUpdatePages(appPage?.pages, {
                      options: {
                        ...appPage?.options,
                        itemSeparator: {
                          ...appPage?.options?.itemSeparator,
                          backgroundColor: color || '#F5F5F5',
                        },
                      },
                    })
                  }}
                />
              </div>
            </>
          )}
          <div className="flex items-center justify-between mb-4">
            <Typography.Paragraph className="mb-0 flex items-center gap-1">Show brand image</Typography.Paragraph>
            <Switch
              checked={appPage?.options?.imageEnabled}
              onChange={(checked) => {
                onUpdatePages(appPage?.pages, {
                  options: {
                    ...appPage?.options,
                    imageEnabled: checked,
                  },
                })
              }}
            />
          </div>
        </div>
      </Scrollbars>
    </div>
  )
}
