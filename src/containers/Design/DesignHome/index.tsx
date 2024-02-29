'use client'

import { Col, Row, Typography } from 'antd'
import classNames from 'classnames'
import { find, map } from 'lodash'
import { useMemo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import {
  PreviewBlockBanner,
  PreviewBlockCatalogGrid,
  PreviewBlockImageGrid,
  PreviewBlockImageSlide,
  PreviewBlockProductCarousel,
  PreviewBlockProductGrid,
  PreviewBlockProductParallax,
  PreviewBlockRecentlyViewed,
  PreviewBlockSearchBar,
  PreviewBlockSpacer,
  PreviewBlockVideo,
  PreviewDesign,
  SettingScreenHome,
} from '@/components'
import { useDevice, useDragDropBlock, useGetAllPageQuery, useUpdatePageMutation } from '@/hooks'
import { LayoutDesign } from '@/layouts'
import { isVisibleLeftContentState } from '@/recoil'
import { BlockType, DroppableId, DroppableType, PageTypes } from '@/types'

export const DesignHome = () => {
  const { isMobile } = useDevice()
  const { mutate: onSave, isPending: isLoadingOnSave } = useUpdatePageMutation()
  const { onDropBlockFromSidebar } = useDragDropBlock()
  const setIsVisibleLeftContent = useSetRecoilState(isVisibleLeftContentState)
  const { data: allPage } = useGetAllPageQuery()

  const findHomePage = useMemo(() => find(allPage?.data, (i) => i?.type === PageTypes.Home), [allPage?.data]) as AppPage
  return (
    <LayoutDesign
      leftContent={
        <Droppable type={DroppableType.Block} droppableId={DroppableId.BlockHandle} isDropDisabled={false}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="h-full px-4">
              <Row gutter={[16, 16]}>
                {map(
                  [
                    {
                      type: BlockType.SearchBar,
                      component: <PreviewBlockSearchBar />,
                    },
                    {
                      type: BlockType.Spacer,
                      component: <PreviewBlockSpacer />,
                    },
                    {
                      type: BlockType.Banner,
                      component: <PreviewBlockBanner />,
                    },
                    {
                      type: BlockType.Slider,
                      component: <PreviewBlockImageSlide />,
                    },
                    {
                      type: BlockType.Grid,
                      component: <PreviewBlockImageGrid />,
                    },
                    {
                      type: BlockType.CatalogGrid,
                      component: <PreviewBlockCatalogGrid isVisibleTitle />,
                    },
                    {
                      type: BlockType.Video,
                      component: <PreviewBlockVideo />,
                    },
                    {
                      type: BlockType.ProductCarousel,
                      component: <PreviewBlockProductCarousel />,
                    },
                    {
                      type: BlockType.ProductParallax,
                      component: <PreviewBlockProductParallax />,
                    },
                    {
                      type: BlockType.ProductGrid,
                      component: <PreviewBlockProductGrid />,
                    },
                    {
                      type: BlockType.RecentlyViewed,
                      component: <PreviewBlockRecentlyViewed />,
                    },
                  ],
                  (block, index) => (
                    <Draggable key={block?.type} draggableId={block?.type as string} index={index}>
                      {(provided) => (
                        <Col span={24} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div
                            className={classNames('cursor-pointer select-none')}
                            onClick={() => {
                              if (isMobile) {
                                onDropBlockFromSidebar(block?.type, 0)
                                setIsVisibleLeftContent(false)
                              }
                            }}
                          >
                            {block?.component}
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
      }
      centerContent={<PreviewDesign screen="home" activePage={findHomePage} isEditMultiplePage={true} />}
      rightContent={
        <div className="h-full flex flex-col">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <Typography.Paragraph className="mb-0 text-gray800 font-semibold">Home settings</Typography.Paragraph>
            </div>
          </div>
          <SettingScreenHome />
        </div>
      }
      onSave={onSave}
      isLoadingOnSave={isLoadingOnSave}
    />
  )
}
