'use client'

import classNames from 'classnames'
import { find, isEmpty, map } from 'lodash'
import { useEffect, useMemo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import { EMPTY_CATALOG } from '@public'
import { BlockWrapper, Loading } from '@/components'
import { useGetAllLayoutQuery, useGetAllPageQuery, useSelectedPageBlock } from '@/hooks'
import { appPageState, layoutState } from '@/recoil'
import { DroppableId, DroppableType, PageTypes } from '@/types'

type Props = {}

export const PreviewCatalog: React.FC<Props> = () => {
  const setLayout = useSetRecoilState(layoutState)
  const setAppPage = useSetRecoilState(appPageState)
  const { data: allLayout, isLoading: isLoadingGetAllLayout } = useGetAllLayoutQuery()
  const { data: allPage, isLoading: isLoadingGetAllPage } = useGetAllPageQuery()
  const { selectedPage } = useSelectedPageBlock()

  const activeLayout = useMemo(() => find(allLayout?.data, (i) => i?.defaultActive), [allLayout?.data])

  useEffect(() => {
    // TODO: sửa lại logic khi nào làm automation change theme
    const findCatalogsPage = find(allPage?.data, (i) => i?.type === PageTypes.Catalogs)
    setLayout(activeLayout)
    setAppPage(findCatalogsPage)
  }, [activeLayout, allPage?.data, setLayout, setAppPage])

  return (
    <div className={classNames('m-auto relative mb-10 w-full md:w-[390px]')}>
      <div className="flex flex-col relative">
        <Loading isLoading={isLoadingGetAllLayout || isLoadingGetAllPage}>
          <Droppable type={DroppableType.Catalog} droppableId={DroppableId.CatalogPreview} isCombineEnabled>
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
                  <div className="flex flex-col items-center justify-center mt-6">
                    <img src={EMPTY_CATALOG} alt="" className="object-contain w-full mb-4" />
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
