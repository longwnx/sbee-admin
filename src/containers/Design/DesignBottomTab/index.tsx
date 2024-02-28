'use client'

import { Col, Divider, Row, Switch, Typography } from 'antd'
import classNames from 'classnames'
import { find, map } from 'lodash'
import { useCallback, useMemo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import { PreviewDesign } from '@/components'
import {
  useDevice,
  useDragDropBottomTab,
  useGetAllPageQuery,
  useGetListIconQuery,
  useModifyUiLayout,
  useSelectedBottomTab,
  useUpdateLayoutMutation,
} from '@/hooks'
import { LayoutDesign } from '@/layouts'
import { isVisibleLeftContentState } from '@/recoil'
import { DroppableId, DroppableType, PageTypes } from '@/types'

export const DesignBottomTab = () => {
  const { isMobile } = useDevice()
  const { bottomTabs } = useSelectedBottomTab()
  const { onUpdateBottomTab } = useModifyUiLayout()
  const { onDropBottomTabFromSidebar } = useDragDropBottomTab()
  const setIsVisibleLeftContent = useSetRecoilState(isVisibleLeftContentState)

  const { data: allPage } = useGetAllPageQuery()
  const findHomePage = useMemo(() => find(allPage?.data, (i) => i?.type === PageTypes.Home), [allPage?.data])

  const { data: dataMediaLibrary } = useGetListIconQuery()

  const findIcon = useCallback(
    (name: string, code: string) => {
      const findIcon: any = find(find(dataMediaLibrary?.data, (i) => i?.name === name)?.icons, (icon) => icon?.name === code)
      return {
        iconset: {
          name,
          source: {
            uri: findIcon?.src,
          },
        },
      }
    },
    [dataMediaLibrary?.data]
  )

  const { mutate: onSave, isPending: isLoadingOnSave } = useUpdateLayoutMutation()

  const onChangeVisibleTitle = useCallback(
    (visible: boolean) => {
      const newPages = map(bottomTabs, (bottomTab) => {
        return {
          ...bottomTab,
          title: {
            ...bottomTab?.title,
            visible,
          },
        }
      })
      onUpdateBottomTab(newPages)
    },
    [bottomTabs, onUpdateBottomTab]
  )

  return (
    <LayoutDesign
      leftContent={
        <div className="h-full px-4">
          <div className="flex items-center justify-between mb-2">
            <Typography.Paragraph className="font-medium text-gray800 mb-0">Show title</Typography.Paragraph>
            <Switch size="small" checked={bottomTabs?.[0]?.title?.visible} onChange={onChangeVisibleTitle} />
          </div>
          <Divider className="my-7 border-t-gray300" />
          <Typography.Paragraph className="font-semibold text-gray800 mb-1">Icon</Typography.Paragraph>
          <Typography.Paragraph className="text-gray500 mb-4">
            Configure the bottom bar in your mobile app by dragging and dropping icons into the bar, customizing their
            position, labels, action links, and saving the changes.
          </Typography.Paragraph>
          <Droppable type={DroppableType.BottomBar} droppableId={DroppableId.BottomBarHandle} isDropDisabled>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Row gutter={[8, 8]}>
                  {map(
                    [
                      {
                        type: PageTypes.Home,
                        name: 'Home',
                        ...findIcon('essetional', 'home'),
                      },
                      {
                        type: PageTypes.CategoryTree,
                        name: 'Categories',
                        ...findIcon('grid', 'element-3'),
                      },
                      {
                        type: PageTypes.Cart,
                        name: 'Cart',
                        ...findIcon('shop', 'bag-2'),
                      },
                      {
                        type: PageTypes.Notifications,
                        name: 'Notification',
                        ...findIcon('notifications', 'notification'),
                      },
                      {
                        type: PageTypes.MyAccount,
                        name: 'Profile',
                        ...findIcon('users', 'user'),
                      },
                      {
                        type: PageTypes.Wishlist,
                        name: 'Wishlist',
                        ...findIcon('support-like-question', 'heart'),
                      },
                      {
                        type: PageTypes.Search,
                        name: 'Search',
                        ...findIcon('search', 'search-normal'),
                      },
                    ],
                    (i, index) => (
                      <Draggable key={i?.type} draggableId={i?.type as string} index={index}>
                        {(provided) => (
                          <Col span={8} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div
                              onClick={() => {
                                if (isMobile) {
                                  onDropBottomTabFromSidebar(i?.type, 0)
                                  setIsVisibleLeftContent(false)
                                }
                              }}
                              className="hover:border-gray500 flex items-center px-2 py-2 cursor-pointer bg-gray25 rounded border border-gray300"
                            >
                              <div className="flex w-full flex-col items-center justify-center">
                                <div className={classNames('w-6 h-6 flex items-center justify-center mb-[2px]')}>
                                  <img src={i?.iconset?.source?.uri} alt="" className="object-contain" />
                                </div>
                                <Typography.Paragraph className="text-gray700 capitalize mb-0 text-xs">
                                  {i.name}
                                </Typography.Paragraph>
                              </div>
                            </div>
                          </Col>
                        )}
                      </Draggable>
                    )
                  )}
                </Row>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      }
      centerContent={<PreviewDesign screen="bottomTab" activePage={findHomePage} isEditBottomTab={true} />}
      onSave={onSave}
      isLoadingOnSave={isLoadingOnSave}
    />
  )
}
