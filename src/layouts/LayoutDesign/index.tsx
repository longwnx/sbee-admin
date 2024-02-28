'use client'

import { Col, Drawer, Row, Typography } from 'antd'
import classNames from 'classnames'
import { useCallback } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Scrollbars from 'react-custom-scrollbars-2'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IconClose, IconPlus } from '@/components'
import { useDragDropBlock, useDragDropBottomTab } from '@/hooks'
import { LayoutMain } from '@/layouts'
import { flagChangeAppPageState, flagChangeLayoutState, isVisibleLeftContentState } from '@/recoil'
import { BlockType, DroppableId, DroppableType, PageTypes } from '@/types'

type Props = {
  leftContent?: React.ReactNode
  leftContentClassName?: string
  rightContent?: React.ReactNode
  rightContentClassName?: string
  centerContent?: React.ReactNode
  onSave?: any
  isVisibleFooter?: boolean
  isLoadingOnSave?: boolean
  disabledSave?: boolean
}

export const LayoutDesign: React.FC<Props> = ({
  leftContent,
  leftContentClassName = '',
  rightContent,
  rightContentClassName = '',
  centerContent,
  onSave,
  isVisibleFooter,
  isLoadingOnSave,
  disabledSave,
}) => {
  const {
    onMoveBlockFromPreview,
    onDropBlockFromSidebar,
    onDropCatalogFromSidebar,
    onCombineCatalogFromSidebar,
    onDropCatalogFromPreview,
  } = useDragDropBlock()
  const { onMoveBottomTabFromPreview, onDropBottomTabFromSidebar } = useDragDropBottomTab()
  const flagChangeAppPage = useRecoilValue(flagChangeAppPageState)
  const flagChangeLayout = useRecoilValue(flagChangeLayoutState)
  const [isVisibleLeftContent, setIsVisibleLeftContent] = useRecoilState(isVisibleLeftContentState)

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (result.combine) {
        if (result.source.droppableId === DroppableId.CatalogHandle) {
          onCombineCatalogFromSidebar(result.draggableId, result.combine.draggableId)
        }
        return
      }

      if (result.destination) {
        if (result.type === DroppableType.CatalogChildren) {
          onDropCatalogFromPreview(
            result.source.index,
            result.destination.index,
            result.source?.droppableId,
            result.destination?.droppableId,
            result.draggableId
          )
        }
        if (result.source.droppableId === DroppableId.CatalogHandle) {
          onDropCatalogFromSidebar(result.draggableId, result.destination.index)
        }
        if (result.source.droppableId === DroppableId.BlockHandle) {
          onDropBlockFromSidebar(result.draggableId as BlockType, result.destination!.index)
        }
        if (
          result.source.droppableId === DroppableId.BlockPreview ||
          result.source.droppableId === DroppableId.CatalogPreview
        ) {
          onMoveBlockFromPreview(result.source.index, result.destination.index)
        }
        if (result.source.droppableId === DroppableId.BottomBarHandle) {
          onDropBottomTabFromSidebar(result.draggableId as PageTypes, result.destination.index)
        }
        if (result.source.droppableId === DroppableId.BottomBarPreview) {
          onMoveBottomTabFromPreview(result.source.index, result.destination.index)
        }
        return
      }
    },
    [
      onCombineCatalogFromSidebar,
      onDropBlockFromSidebar,
      onDropBottomTabFromSidebar,
      onDropCatalogFromPreview,
      onDropCatalogFromSidebar,
      onMoveBlockFromPreview,
      onMoveBottomTabFromPreview,
    ]
  )

  return (
    <LayoutMain
      onSave={onSave}
      isVisibleFooter={isVisibleFooter || flagChangeAppPage || flagChangeLayout}
      isLoadingOnSave={isLoadingOnSave}
      disabledSave={disabledSave}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 h-full bg-gray100">
          <Row className="h-full" wrap={false}>
            <Col className="hidden md:block">
              <div className={classNames('h-full bg-white w-[350px]')}>
                <div className={classNames('overflow-y-auto overflow-x-hidden h-full', leftContentClassName)}>
                  <div className="pt-4 py-16">{leftContent}</div>
                </div>
              </div>
              <Drawer
                bodyStyle={{ overflow: 'hidden', padding: 0 }}
                closable={false}
                placement="left"
                onClose={() => setIsVisibleLeftContent(false)}
                open={isVisibleLeftContent}
                width="100%"
              >
                <div className="h-full flex flex-col">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <Typography.Paragraph className="mb-0 text-gray800 font-semibold">List item</Typography.Paragraph>
                      <div className="cursor-pointer flex items-center">
                        <IconClose onClick={() => setIsVisibleLeftContent(false)} />
                      </div>
                    </div>
                    <Typography.Paragraph className="text-gray600 text-xs mb-0 mt-2">
                      Click on the item to add a new one. The item will be added to the beginning of the list.
                    </Typography.Paragraph>
                  </div>
                  <Scrollbars className="flex-1 h-full w-full">
                    <div className="py-4">{leftContent}</div>
                  </Scrollbars>
                </div>
              </Drawer>
            </Col>
            <Col flex={1}>
              <div className="h-[calc(100vh-111px)] md:h-[calc(100vh-64px)] overflow-y-auto md:py-6">
                {centerContent}
                <div
                  onClick={() => setIsVisibleLeftContent(true)}
                  className="fixed cursor-pointer md:hidden bottom-[114px] right-4 z-50 bg-primary shadow-lg rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <IconPlus />
                </div>
              </div>
            </Col>
            {rightContent && (
              <Col className="hidden md:block">
                <div className={classNames('h-full bg-white w-[300px] 2xl:w-[390px]')}>
                  <div className={classNames('overflow-y-auto overflow-x-hidden h-full', rightContentClassName)}>
                    <div className="pt-4 py-16 h-full">{rightContent}</div>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </DragDropContext>
    </LayoutMain>
  )
}
