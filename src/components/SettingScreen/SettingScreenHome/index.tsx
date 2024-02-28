'use client'

import { Button, Divider, Input, Radio, Space, Spin, Switch, Tooltip, Typography } from 'antd'
import classNames from 'classnames'
import { filter, map } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import Scrollbars from 'react-custom-scrollbars-2'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 } from 'uuid'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { css } from '@emotion/css'
import { IconDrag, IconTrash } from '@/components'
import { useModifyUiPages } from '@/hooks'
import { appPageState, currentIndexPageState } from '@/recoil'
import { DroppableId, DroppableType, OptionScrollBehavior } from '@/types'
import { countObjKey, reorderItemInArray } from '@/utils'


type Props = {}

export const SettingScreenHome: React.FC<Props> = () => {
  const appPage = useRecoilValue(appPageState)
  const [currentIndexPage, setCurrentIndexPage] = useRecoilState(currentIndexPageState)
  const [tabName, setTabName] = useState('')
  const { onUpdatePages } = useModifyUiPages()
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    return () => {
      setCurrentIndexPage(0)
    }
  }, [setCurrentIndexPage])

  const onRemoveItem = useCallback(
    (indexPage: number) => {
      onUpdatePages(filter(appPage?.pages, (_, idx) => idx !== indexPage))
      setCurrentIndexPage(0)
    },
    [appPage?.pages, onUpdatePages, setCurrentIndexPage]
  )

  const onChangeTitlePage = useCallback(
    (value: string, indexPage: number) => {
      onUpdatePages(
        map(appPage?.pages, (i, idx) => ({
          ...i,
          title: {
            ...i?.title,
            ...(idx === indexPage && {
              text: value,
            }),
          },
        }))
      )
      if (!appPage?.multiplePage) {
        setCurrentIndexPage(0)
      }
    },
    [appPage?.multiplePage, appPage?.pages, onUpdatePages, setCurrentIndexPage]
  )

  const onChangeScrollBehavior = useCallback(
    (value: string, indexPage: number) => {
      onUpdatePages(
        map(appPage?.pages, (i, idx) => ({
          ...i,
          options: {
            ...i?.options,
            ...(idx === indexPage && {
              scrollBehavior: value,
            }),
          },
        }))
      )
      if (!appPage?.multiplePage) {
        setCurrentIndexPage(0)
      }
    },
    [appPage?.multiplePage, appPage?.pages, onUpdatePages, setCurrentIndexPage]
  )

  const onAddNewPage = useCallback(() => {
    const idPage = v4()
    const newPages = [
      ...(appPage?.pages || []),
      {
        id: idPage,
        title: {
          text: tabName || `Home ${countObjKey(appPage?.pages) + 1}`,
        },
        backgroundColor: '#FFFFFF',
        blocks: [],
        options: {
          scrollBehavior: OptionScrollBehavior.Smooth,
        },
      },
    ]
    onUpdatePages(newPages)
    if (appPage?.multiplePage) {
      setCurrentIndexPage(newPages.length - 1)
    } else {
      setCurrentIndexPage(0)
    }
    setTabName('')
  }, [appPage?.multiplePage, appPage?.pages, onUpdatePages, setCurrentIndexPage, tabName])

  const onDragEnd = useCallback(
    (result: DropResult) => {
      setSpinning(true)
      if (result.destination) {
        if (result.source.droppableId === DroppableId.MultiplePage) {
          onUpdatePages(reorderItemInArray(appPage?.pages, result.source.index, result?.destination?.index))
          setTimeout(() => {
            setSpinning(false)
          }, 1000)
          if (!appPage?.multiplePage) {
            setCurrentIndexPage(0)
          }
        }
        return
      }
    },
    [appPage?.multiplePage, appPage?.pages, onUpdatePages, setCurrentIndexPage]
  )

  const onEnableMultiplePage = useCallback(
    (value: boolean) => {
      onUpdatePages(appPage?.pages, {
        multiplePage: value,
      })
      if (!value) {
        setCurrentIndexPage(0)
      }
    },
    [onUpdatePages, appPage?.pages, setCurrentIndexPage]
  )

  const classNameItem = css({
    '.icon--action': {
      display: 'none',
    },
    '&:hover': {
      '.icon--action': {
        display: 'flex',
      },
    },
  })

  return (
    <div className="h-full flex flex-col">
      <Scrollbars className="h-full flex-1">
        <div className="h-full flex flex-col px-4">
          <div className="flex items-center justify-between mb-4">
            <Typography.Paragraph className="mb-0 flex items-center gap-1">Multi-home</Typography.Paragraph>
            <Switch checked={appPage?.multiplePage} onChange={onEnableMultiplePage} />
          </div>
          <Typography.Paragraph className="text-gray800 mb-2">New home</Typography.Paragraph>
          <div className="flex items-center mb-4">
            <Input
              value={tabName}
              onChange={(e) => setTabName(e.target.value)}
              size="large"
              className="mr-2"
              placeholder="Home name"
            />
            <Button size="large" type="primary" className="text-gray800 font-semibold text-sm" onClick={onAddNewPage}>
              Add
            </Button>
          </div>
          <Typography.Paragraph className="flex items-center gap-1 mb-2">
            Home list
            <Tooltip title="Rearrange the order and set scrolling behavior for each home">
              <QuestionCircleOutlined className="cursor-help" />
            </Tooltip>
          </Typography.Paragraph>
          <Spin spinning={spinning}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable type={DroppableType.MultiplePage} droppableId={DroppableId.MultiplePage}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {map(
                      map(
                        appPage?.pages,
                        (i, index) =>
                          ({
                            ...i,
                            id: String(index),
                          }) || []
                      ),
                      (i, index) => (
                        <Draggable key={index} draggableId={String(index) as string} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div
                                className={classNames(
                                  'mb-2 hover:border-gray500 px-3 py-2 cursor-pointer bg-gray25 rounded border',
                                  currentIndexPage === index ? 'border-primary' : 'border-gray300',
                                  classNameItem
                                )}
                                onClick={() => {
                                  if (appPage?.multiplePage) {
                                    setCurrentIndexPage(index)
                                  }
                                }}
                                key={index}
                              >
                                <div className="flex items-center justify-between">
                                  <IconDrag width={16} height={16} />
                                  <div className="relative flex-1">
                                    <Input
                                      value={i?.title?.text}
                                      className="mr-4 border-none shadow-none bg-transparent"
                                      size="small"
                                      onChange={(e) => onChangeTitlePage(e.target.value, index)}
                                    />
                                  </div>
                                  <Space>
                                    <IconTrash
                                      width={20}
                                      height={20}
                                      className="icon--action cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        onRemoveItem(index)
                                      }}
                                    />
                                  </Space>
                                </div>
                                <Divider className="my-1" />
                                <div>
                                  <div>Scrolling mode</div>
                                  <div className="mt-1">
                                    <Radio.Group
                                      value={i?.options?.scrollBehavior || OptionScrollBehavior.Smooth}
                                      onChange={(e) => onChangeScrollBehavior(e.target.value, index)}
                                    >
                                      <Radio value={OptionScrollBehavior.Smooth}>Continuous</Radio>
                                      <Radio value={OptionScrollBehavior.Paging}>Paging</Radio>
                                    </Radio.Group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Spin>
        </div>
      </Scrollbars>
    </div>
  )
}
