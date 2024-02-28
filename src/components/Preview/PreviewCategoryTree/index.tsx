'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import { find, isEmpty, map } from 'lodash'
import { useEffect, useMemo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'
import { css } from '@emotion/css'
import { STATUS_BAR } from '@public/index'
import { BlockWrapper, IconSearch, Loading } from '@/components'
import { useGetAllLayoutQuery, useGetAllPageQuery, useSelectedPageBlock } from '@/hooks'
import { appPageState, layoutState } from '@/recoil'
import { DroppableId, DroppableType, PageTypes } from '@/types'
import { invertColor } from '@/utils'

type Props = {}

export const PreviewCategoryTree: React.FC<Props> = () => {
  const [layout, setLayout] = useRecoilState(layoutState)
  const [appPage, setAppPage] = useRecoilState(appPageState)
  const { data: allLayout, isLoading: isLoadingGetAllLayout } = useGetAllLayoutQuery()
  const { data: allPage, isLoading: isLoadingGetAllPage } = useGetAllPageQuery()
  const { selectedPage } = useSelectedPageBlock()

  const activeLayout = useMemo(() => find(allLayout?.data, (i) => i?.defaultActive), [allLayout?.data])

  useEffect(() => {
    const findCatalogsPage = find(allPage?.data, (i) => i?.type === PageTypes.CategoryTree)
    setLayout(activeLayout)
    setAppPage(findCatalogsPage)
  }, [activeLayout, allPage?.data, setLayout, setAppPage])

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
                  {appPage?.options?.layout?.searchBar?.placeholder || 'Search Product'}
                </Typography.Paragraph>
              </div>
            </div>
          )}
          <Droppable type={DroppableType.Block} droppableId={DroppableId.BlockPreview}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {map(selectedPage?.blocks, (block, index) => (
                  <Draggable key={block?.id} draggableId={block?.id as string} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <BlockWrapper isEdit={true} block={block} index={index} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {isEmpty(selectedPage?.blocks) && (
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center bg-white w-full h-40 text-gray500">
                      <div>No categories selected</div>
                      <div>Please select at least one category</div>
                    </div>
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Loading>
      </div>
    </div>
  )
}
