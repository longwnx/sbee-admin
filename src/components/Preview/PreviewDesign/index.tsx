'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import { find, isEmpty, map } from 'lodash'
import { useEffect, useMemo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { css } from '@emotion/css'
import { EMPTY_PREVIEW, MY_ACCOUNT, STATUS_BAR } from '@public'
import { BlockMultipleHome, BlockWrapper, BottomTabIconWrapper, Loading } from '@/components'
import { useGetAllLayoutQuery, useSelectedBottomTab, useSelectedPageBlock } from '@/hooks'
import { appPageState, currentIndexBlockState, currentIndexBottomTabState, layoutState } from '@/recoil'
import { DroppableId, DroppableType } from '@/types'
import { invertColor, MOBILE_WIDTH } from '@/utils'

type Props = {
  isEditMultiplePage?: boolean
  isEditBottomTab?: boolean
  activePage?: AppPage
  showMyAccount?: boolean
  screen?: 'home' | 'bottomTab' | 'productDetail' | 'myAccount' | 'customPages' | 'theme' | 'switchApp'
}

export const PreviewDesign: React.FC<Props> = ({
  activePage,
  isEditMultiplePage,
  isEditBottomTab,
  showMyAccount,
  screen,
}) => {
  const [layout, setLayout] = useRecoilState(layoutState)
  const setCurrentIndexBottomTab = useSetRecoilState(currentIndexBottomTabState)
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const [appPage, setAppPage] = useRecoilState(appPageState)
  const { bottomTabs } = useSelectedBottomTab()
  const { data: allLayout, isLoading: isLoadingGetAllLayout } = useGetAllLayoutQuery()
  const { blocks } = useSelectedPageBlock()

  const activeLayout = useMemo(() => find(allLayout?.data, (i) => i?.defaultActive), [allLayout?.data])

  useEffect(() => {
    setLayout(activeLayout)
    setAppPage(activePage)
  }, [activeLayout, setLayout, setAppPage, activePage])

  useEffect(() => {
    setCurrentIndexBlock(undefined)
  }, [isEditMultiplePage, setCurrentIndexBlock])

  useEffect(() => {
    setCurrentIndexBottomTab(undefined)
  }, [isEditBottomTab, setCurrentIndexBottomTab])

  const classNameTop = useMemo(() => {
    if (screen === 'home') {
      if (appPage?.multiplePage) {
        return 'h-[calc(100vh-362px)]'
      }
      return 'h-[calc(100vh-290px)]'
    }
    if (screen === 'bottomTab' || screen === 'theme' || screen === 'switchApp') {
      if (appPage?.multiplePage) {
        return 'h-[calc(100vh-362px)]'
      }
      return 'h-[calc(100vh-290px)]'
    }
    if (screen === 'myAccount') {
      return 'h-[calc(100vh-454px)]'
    }
    return 'h-[calc(100vh-290px)]'
  }, [appPage?.multiplePage, screen])

  const classNameTopNavigation = css({
    backgroundColor: layout?.options?.topBar?.backgroundColor || '#ffffff',
  })

  const classNameTopNavigationStatusBar = css({
    filter: `brightness(${
      invertColor(layout?.options?.topBar?.backgroundColor || ('#ffffff' as string)) === 'dark' ? 10 : 0
    })`,
  })

  return (
    <div className={classNames('m-auto relative w-full md:w-[390px]')}>
      <Loading isLoading={isLoadingGetAllLayout}>
        <div className="flex flex-col relative bg-white shadow-[0_2px_28px_#0000000d]">
          <div>
            <div className={classNameTopNavigation}>
              <img src={STATUS_BAR} className={classNameTopNavigationStatusBar} />
              {showMyAccount && <img src={MY_ACCOUNT} alt="" className="w-full" />}
            </div>
            {!showMyAccount && (
              <div className={classNames('px-4 text-center', classNameTopNavigation)}>
                {layout?.theme?.logo?.src && <img src={layout?.theme?.logo?.src} alt="" className="h-8" />}
              </div>
            )}
            <BlockMultipleHome isEdit={isEditMultiplePage} />
          </div>
          <Droppable type={DroppableType.Block} droppableId={DroppableId.BlockPreview}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={classNames('bg-white overflow-x-hidden overflow-y-auto', classNameTop)}
              >
                {map(blocks, (block, index) => (
                  <Draggable
                    isDragDisabled={!isEditMultiplePage}
                    key={block?.id}
                    draggableId={block?.id as string}
                    index={index}
                  >
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <BlockWrapper isEdit={isEditMultiplePage} block={block} index={index} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {isEmpty(blocks) && (
                  <div className="flex flex-col items-center justify-center mt-6">
                    <img src={EMPTY_PREVIEW} alt="" className="object-contain w-56 mb-4" />
                    <Typography.Text className=" text-base font-medium text-gray500">
                      Start by dragging block to build your app
                    </Typography.Text>
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable direction="horizontal" type={DroppableType.BottomBar} droppableId={DroppableId.BottomBarPreview}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={classNames(
                  'w-full h-14 px-4 flex items-center justify-between',
                  css({
                    backgroundColor: layout?.options?.bottomTabs?.backgroundColor || '#ffffff',
                  })
                )}
              >
                {map(bottomTabs, (i, index) => (
                  <Draggable isDragDisabled={!isEditBottomTab} key={i?.id} draggableId={i?.id as string} index={index}>
                    {(providedDraggable) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                      >
                        <div
                          style={{
                            // NOTE: mobile screen - 16 * 2 padding
                            width:
                              (MOBILE_WIDTH - 16 * 2) /
                              (bottomTabs.length +
                                (snapshot.isDraggingOver && snapshot.draggingFromThisWith === null ? 1 : 0)),
                          }}
                        >
                          <BottomTabIconWrapper isEdit={isEditBottomTab} bottomTab={i} index={index} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </Loading>
    </div>
  )
}
