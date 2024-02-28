'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import { find, isEmpty, map } from 'lodash'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'
import { css } from '@emotion/css'
import { EMPTY_PREVIEW, STATUS_BAR } from '@public'
import { BlockWrapper, IconSearch, Loading, TabsCustom } from '@/components'
import { useGetAllLayoutQuery, useGetAllPageQuery, useSelectedPageBlock } from '@/hooks'
import { appPageState, layoutState } from '@/recoil'
import { BlockType, DroppableId, DroppableType, PageTypes } from '@/types'
import { invertColor } from '@/utils'

const GGMap = dynamic(() => import('@/components/Dynamic/GGMap'), { ssr: false })

type Props = {
  activePage: AppPage
}

export const PreviewCustomPage: React.FC<Props> = ({ activePage }) => {
  const [layout, setLayout] = useRecoilState(layoutState)
  const [appPage, setAppPage] = useRecoilState(appPageState)
  const { data: allLayout, isLoading: isLoadingGetAllLayout } = useGetAllLayoutQuery()
  const { data: allPage, isLoading: isLoadingGetAllPage } = useGetAllPageQuery()
  const { selectedPage } = useSelectedPageBlock()
  const [activeTab, setActiveTab] = useState('list')

  const activeLayout = useMemo(() => find(allLayout?.data, (i) => i?.defaultActive), [allLayout?.data]) as UiLayout

  useEffect(() => {
    setLayout(activeLayout)
    setAppPage(activePage)
  }, [activeLayout, allPage?.data, setLayout, setAppPage, activePage])

  const classNameTopNavigation = css({
    backgroundColor: layout?.options?.topBar?.backgroundColor || '#ffffff',
    color: invertColor(layout?.options?.topBar?.backgroundColor || ('#ffffff' as string)) === 'dark' ? '#FFFFFF' : '#000000',
  })

  const classNameTopNavigationStatusBar = css({
    filter: `brightness(${
      invertColor(layout?.options?.topBar?.backgroundColor || ('#ffffff' as string)) === 'dark' ? 10 : 0
    })`,
  })

  return (
    <div className={classNames('m-auto relative mb-10 bg-white w-full rounded-lg md:w-[390px]')}>
      <div className="flex flex-col relative">
        <Loading isLoading={isLoadingGetAllLayout || isLoadingGetAllPage}>
          <div>
            <div className={classNameTopNavigation}>
              <img src={STATUS_BAR} className={classNameTopNavigationStatusBar} />
            </div>
            <div
              className={classNames(
                'px-4 text-center h-12 flex items-center justify-center font-semibold',
                classNameTopNavigation
              )}
            >
              {appPage?.title?.text}
            </div>
          </div>
          {appPage?.type === PageTypes.StoreLocator ? (
            <>
              {appPage?.options?.layout?.searchBar?.visible && (
                <div
                  className={css({
                    padding: 16,
                    backgroundColor: appPage?.options?.layout?.searchBar?.backgroundColor || '#FFFFFF',
                  })}
                >
                  <div className="flex items-center h-10 rounded-lg py-[10px] border border-[#E4E7EE] bg-white relative">
                    <IconSearch width={20} height={20} stroke="#7F8596" className="ml-5 mr-2" />
                    <Typography.Paragraph className="mb-0 text-[#7F8596]">
                      {appPage?.options?.layout?.searchBar?.placeholder || 'Search by City, Address, or ZIP Code'}
                    </Typography.Paragraph>
                  </div>
                </div>
              )}
              <TabsCustom
                activeKey={activeTab}
                setActiveKey={setActiveTab}
                items={[
                  {
                    key: 'list',
                    label: 'List',
                    children: (
                      <Droppable type={DroppableType.Block} droppableId={DroppableId.BlockPreview}>
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {map(selectedPage?.blocks, (block, index) => (
                              <Draggable
                                key={block?.id}
                                draggableId={block?.id as string}
                                index={index}
                                isDragDisabled={block?.type === BlockType.Brand}
                              >
                                {(provided) => (
                                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <BlockWrapper isEdit={true} block={block} index={index} />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {isEmpty(selectedPage?.blocks) && (
                              <div className="flex flex-col items-center justify-center my-6">
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
                    ),
                  },
                  {
                    key: 'map',
                    label: 'Map',
                    children: !isEmpty(appPage?.pages?.[0]?.blocks) ? (
                      <GGMap markers={map(appPage?.pages?.[0]?.blocks, (b) => b?.coordinates)} />
                    ) : null,
                  },
                ]}
                color="#22252D"
              />
            </>
          ) : (
            <Droppable type={DroppableType.Block} droppableId={DroppableId.BlockPreview}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {map(selectedPage?.blocks, (block, index) => (
                    <Draggable
                      key={block?.id}
                      draggableId={block?.id as string}
                      index={index}
                      isDragDisabled={block?.type === BlockType.Brand}
                    >
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <BlockWrapper isEdit={true} block={block} index={index} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {isEmpty(selectedPage?.blocks) && (
                    <div className="flex flex-col items-center justify-center my-6">
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
          )}
        </Loading>
      </div>
    </div>
  )
}
