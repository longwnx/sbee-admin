'use client'

import { Divider, Form, Input, Radio, Typography } from 'antd'
import { find } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { ColorBox, OpenImageLibrary, PreviewDesign } from '@/components'
import { useGetAllPageQuery, useModifyUiLayout, useUpdateLayoutMutation } from '@/hooks'
import { LayoutDesign } from '@/layouts'
import { layoutState } from '@/recoil'
import { CornerStyle, ImageStyle, PageTypes } from '@/types'

export const DesignTheme = () => {
  const layout = useRecoilValue(layoutState)
  const { mutate: onSave, isPending: isLoadingOnSave } = useUpdateLayoutMutation()
  const { onUpdateTheme, onUpdateOptions, onUpdateBottomTab } = useModifyUiLayout()
  const { data: allPage } = useGetAllPageQuery()
  const [visibleMoreColors, setVisibleMoreColors] = useState(false)
  const [bottomTabIconInactiveColor, setBottomTabIconInactiveColor] = useState('')

  const findHomePage = useMemo(() => find(allPage?.data, (i) => i?.type === PageTypes.Home), [allPage?.data])

  useEffect(() => {
    setBottomTabIconInactiveColor(layout?.options?.bottomTabs?.title?.textColor || '#7F8596')
  }, [layout?.options?.bottomTabs?.title?.textColor])

  return (
    <LayoutDesign
      leftContent={
        <Form layout="vertical">
          <div className="px-4">
            <div className="mb-4">
              <Typography.Paragraph className="text-gray800 font-semibold text-base mb-4">Logo</Typography.Paragraph>
              <Typography.Paragraph className="text-gray800 font-medium mb-2">Upload</Typography.Paragraph>
              <OpenImageLibrary
                src={layout?.theme?.logo?.src}
                onUpload={(selectedMedia) => {
                  onUpdateTheme({
                    logo: {
                      src: selectedMedia?.[0]?.url,
                      ratio: selectedMedia?.[0]?.ratio,
                      width: selectedMedia?.[0]?.width,
                      height: selectedMedia?.[0]?.height,
                    },
                  })
                }}
                onRemoveThumb={() => {
                  onUpdateTheme({
                    logo: {
                      src: '',
                    },
                  })
                }}
                objectFit="contain"
              />
            </div>
            <Divider className="my-6 border-t-gray300" />
            <Typography.Paragraph className="text-gray800 text-base font-semibold mb-4">Colors</Typography.Paragraph>
            <div className="mb-4">
              <Form.Item label="Primary color" tooltip="Color for buttons and product badges" className="mb-0">
                <div className="flex items-center justify-between mt-2">
                  <Input
                    value={layout?.theme?.colour?.primary || '#1F2128'}
                    onChange={(e) => {
                      onUpdateTheme({
                        colour: {
                          ...layout?.theme?.colour,
                          primary: e.target.value || '#1F2128',
                        },
                      })
                    }}
                    size="large"
                    className="mr-2 flex-1"
                    maxLength={7}
                  />
                  <ColorBox
                    color={layout?.theme?.colour?.primary || '#1F2128'}
                    onChange={(color) => {
                      onUpdateTheme({
                        colour: {
                          ...layout?.theme?.colour,
                          primary: color || '#1F2128',
                        },
                      })
                    }}
                  />
                </div>
              </Form.Item>
            </div>
            <div className="mb-4">
              <Form.Item label="Secondary color" tooltip="Color for notification badges" className="mb-0">
                <div className="flex items-center justify-between mt-2">
                  <Input
                    value={layout?.theme?.colour?.secondary || '#E45F35'}
                    onChange={(e) => {
                      onUpdateTheme({
                        colour: {
                          ...layout?.theme?.colour,
                          secondary: e.target.value || '#E45F35',
                        },
                      })
                    }}
                    size="large"
                    className="mr-2 flex-1"
                    maxLength={7}
                  />
                  <ColorBox
                    color={layout?.theme?.colour?.secondary || '#E45F35'}
                    onChange={(color) => {
                      onUpdateTheme({
                        colour: {
                          ...layout?.theme?.colour,
                          secondary: color || '#E45F35',
                        },
                      })
                    }}
                  />
                </div>
              </Form.Item>
            </div>
            <div className="flex items-center justify-end">
              <div
                className="text-blueDark600 cursor-pointer font-medium"
                onClick={() => setVisibleMoreColors(!visibleMoreColors)}
              >
                {visibleMoreColors ? 'Fewer colors' : 'More colors'}
              </div>
            </div>
            {visibleMoreColors && (
              <>
                <div className="mb-4">
                  <Form.Item
                    label="Header background"
                    tooltip="Background color for the app header, with header text in contrasting black or white"
                    className="mb-0"
                  >
                    <div className="flex items-center justify-between mt-2">
                      <Input
                        value={layout?.options?.topBar?.backgroundColor || layout?.theme?.colour?.primary || '#FFFFFF'}
                        onChange={(e) => {
                          onUpdateOptions({
                            ...layout?.options,
                            topBar: {
                              ...layout?.options?.topBar,
                              backgroundColor: e.target.value || '#FFFFFF',
                            },
                          })
                        }}
                        size="large"
                        className="mr-2 flex-1"
                        maxLength={7}
                      />
                      <ColorBox
                        color={layout?.options?.topBar?.backgroundColor || layout?.theme?.colour?.primary || '#FFFFFF'}
                        onChange={(color) => {
                          onUpdateOptions({
                            ...layout?.options,
                            topBar: {
                              ...layout?.options?.topBar,
                              backgroundColor: color || '#FFFFFF',
                            },
                          })
                        }}
                      />
                    </div>
                  </Form.Item>
                </div>
                <div className="mb-4">
                  <Form.Item label="Bottom tab background" tooltip="Background color for the bottom tab" className="mb-0">
                    <div className="flex items-center justify-between mt-2">
                      <Input
                        value={layout?.options?.bottomTabs?.backgroundColor || '#FFFFFF'}
                        onChange={(e) => {
                          onUpdateOptions({
                            ...layout?.options,
                            bottomTabs: {
                              ...layout?.options?.bottomTabs,
                              backgroundColor: e.target.value || '#FFFFFF',
                            },
                          })
                        }}
                        size="large"
                        className="mr-2 flex-1"
                        maxLength={7}
                      />
                      <ColorBox
                        color={layout?.options?.bottomTabs?.backgroundColor || '#FFFFFF'}
                        onChange={(color) => {
                          onUpdateOptions({
                            ...layout?.options,
                            bottomTabs: {
                              ...layout?.options?.bottomTabs,
                              backgroundColor: color || '#FFFFFF',
                            },
                          })
                        }}
                      />
                    </div>
                  </Form.Item>
                </div>
                <div className="mb-4">
                  <Form.Item
                    label="Bottom tab icon active"
                    tooltip="Color for the icon and label in the active tab"
                    className="mb-0"
                  >
                    <div className="flex items-center justify-between mt-2">
                      <Input
                        value={layout?.options?.bottomTabs?.title?.selectedTextColor || '#1F2128'}
                        onChange={(e) => {
                          const newBottomTabs = layout?.bottomTabs?.map((i) => ({
                            ...i,
                            iconset: {
                              ...i?.iconset,
                              selectedColor: e.target.value || '#1F2128',
                            },
                            title: {
                              ...i?.title,
                              selectedTextColor: e.target.value || '#1F2128',
                            },
                          }))
                          onUpdateBottomTab(newBottomTabs || [])
                          onUpdateOptions({
                            ...layout?.options,
                            bottomTabs: {
                              ...layout?.options?.bottomTabs,
                              iconset: {
                                ...layout?.options?.bottomTabs?.iconset,
                                selectedColor: e.target.value || '#1F2128',
                              },
                              title: {
                                ...layout?.options?.bottomTabs?.title,
                                selectedTextColor: e.target.value || '#1F2128',
                              },
                            },
                          })
                        }}
                        size="large"
                        className="mr-2 flex-1"
                        maxLength={7}
                      />
                      <ColorBox
                        color={layout?.options?.bottomTabs?.title?.selectedTextColor || '#1F2128'}
                        onChange={(color) => {
                          const newBottomTabs = layout?.bottomTabs?.map((i) => ({
                            ...i,
                            iconset: {
                              ...i?.iconset,
                              selectedColor: color || '#1F2128',
                            },
                            title: {
                              ...i?.title,
                              selectedTextColor: color || '#1F2128',
                            },
                          }))
                          onUpdateBottomTab(newBottomTabs || [])
                          onUpdateOptions({
                            ...layout?.options,
                            bottomTabs: {
                              ...layout?.options?.bottomTabs,
                              iconset: {
                                ...layout?.options?.bottomTabs?.iconset,
                                selectedColor: color || '#1F2128',
                              },
                              title: {
                                ...layout?.options?.bottomTabs?.title,
                                selectedTextColor: color || '#1F2128',
                              },
                            },
                          })
                        }}
                      />
                    </div>
                  </Form.Item>
                </div>
                <div className="mb-4">
                  <Form.Item
                    label="Bottom tab icon inactive"
                    tooltip="Color for the icon and label in the inactive tabs"
                    className="mb-0"
                  >
                    <div className="flex items-center justify-between mt-2">
                      <Input
                        value={bottomTabIconInactiveColor ?? '#7F8596'}
                        onChange={(e) => {
                          setBottomTabIconInactiveColor(e.target.value)
                        }}
                        onBlur={() => {
                          const newBottomTabs = layout?.bottomTabs?.map((i) => ({
                            ...i,
                            iconset: {
                              ...i?.iconset,
                              color: bottomTabIconInactiveColor || '#7F8596',
                            },
                            title: {
                              ...i?.title,
                              textColor: bottomTabIconInactiveColor || '#7F8596',
                            },
                          }))
                          onUpdateBottomTab(newBottomTabs || [])
                          onUpdateOptions({
                            ...layout?.options,
                            bottomTabs: {
                              ...layout?.options?.bottomTabs,
                              iconset: {
                                ...layout?.options?.bottomTabs?.iconset,
                                color: bottomTabIconInactiveColor || '#7F8596',
                              },
                              title: {
                                ...layout?.options?.bottomTabs?.title,
                                textColor: bottomTabIconInactiveColor || '#7F8596',
                              },
                            },
                          })
                        }}
                        size="large"
                        className="mr-2 flex-1"
                        maxLength={7}
                      />
                      <ColorBox
                        color={layout?.options?.bottomTabs?.title?.textColor || '#7F8596'}
                        onChange={(color) => {
                          const newBottomTabs = layout?.bottomTabs?.map((i) => ({
                            ...i,
                            iconset: {
                              ...i?.iconset,
                              color: color || '#7F8596',
                            },
                            title: {
                              ...i?.title,
                              textColor: color || '#7F8596',
                            },
                          }))
                          onUpdateBottomTab(newBottomTabs || [])
                          onUpdateOptions({
                            ...layout?.options,
                            bottomTabs: {
                              ...layout?.options?.bottomTabs,
                              iconset: {
                                ...layout?.options?.bottomTabs?.iconset,
                                color: color || '#7F8596',
                              },
                              title: {
                                ...layout?.options?.bottomTabs?.title,
                                textColor: color || '#7F8596',
                              },
                            },
                          })
                        }}
                      />
                    </div>
                  </Form.Item>
                </div>
              </>
            )}
            <Divider className="my-6 border-t-gray300" />
            <div className="mb-5">
              <Typography.Paragraph className="text-gray800 font-medium mb-2">Corner style</Typography.Paragraph>
              <Radio.Group
                value={layout?.theme?.corner?.style || CornerStyle.Round}
                onChange={(e) => {
                  onUpdateTheme({
                    corner: {
                      ...layout?.theme?.corner,
                      style: e.target.value,
                    },
                  })
                }}
                options={[
                  // { label: 'Circle', value: CornerStyle.Circle },
                  { label: 'Rounded', value: CornerStyle.Round },
                  { label: 'Sharp', value: CornerStyle.Sharp },
                ]}
              />
            </div>
            <Divider className="my-6 border-t-gray300" />
            <div className="mb-4">
              <Form.Item
                label="Product image style"
                tooltip="These image ratios determine the dimensions of your product images across various screens, including the product list, product details page, catalog blocks."
                className="mb-0"
              >
                <Radio.Group
                  value={layout?.theme?.image?.style || ImageStyle['2:3']}
                  onChange={(e) => {
                    onUpdateTheme({
                      image: {
                        ...layout?.theme?.image,
                        style: e.target.value,
                      },
                    })
                  }}
                  options={[
                    { label: 'Square 1:1', value: ImageStyle['1:1'] },
                    { label: 'Rectangle 2:3', value: ImageStyle['2:3'] },
                    { label: 'Rectangle 3:4', value: ImageStyle['3:4'] },
                  ]}
                  className="flex flex-col"
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      }
      centerContent={<PreviewDesign screen="theme" activePage={findHomePage} />}
      onSave={onSave}
      isLoadingOnSave={isLoadingOnSave}
    />
  )
}
