'use client'

import { App, Button, Col, Form, Input, Modal, Row, Select, Tooltip, Typography } from 'antd'
import classNames from 'classnames'
import { filter, find, includes, isEmpty, map } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { EMPTY_LEFT_CONTENT, REVISED_STORE_DATA } from '@public'
import {
  IconPlus,
  IconTrash,
  PreviewBlockBanner,
  PreviewBlockContentHtml,
  PreviewBlockImageGrid,
  PreviewBlockStoreLocation,
  PreviewBlockVideo,
  PreviewCustomPage,
  SettingScreenStoreLocator,
} from '@/components'
import {
  useCreatePageMutation,
  useDeletePageMutation,
  useDevice,
  useDragDropBlock,
  useGetAllPageQuery,
  useUpdatePageMutation,
} from '@/hooks'
import { LayoutDesign } from '@/layouts'
import { isVisibleLeftContentState } from '@/recoil'
import { BlockType, DroppableId, DroppableType, PageTypes } from '@/types'

const FILTER_IN_APP_PAGE = [PageTypes.Custom, PageTypes.StoreLocator]

export const DesignCustomPages = () => {
  const { modal } = App.useApp()
  const { isMobile } = useDevice()
  const { mutate: onSave, isPending: isLoadingOnSave } = useUpdatePageMutation()
  const { onDropBlockFromSidebar } = useDragDropBlock()
  const setIsVisibleLeftContent = useSetRecoilState(isVisibleLeftContentState)
  const { data: allPage } = useGetAllPageQuery()
  const [pageId, setPageId] = useState<string>()

  const listPage = useMemo(() => filter(allPage?.data, (i) => includes(FILTER_IN_APP_PAGE, i?.type)), [allPage?.data])
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [flag, setFlag] = useState(false)

  const onDeleteSuccess = useCallback(() => {
    setPageId(listPage?.[0]?.id)
  }, [listPage])

  const { mutate: onDeletePage, isPending: isLoadingDeletePage } = useDeletePageMutation(onDeleteSuccess)

  useEffect(() => {
    if (!flag && listPage?.[0]?.id) {
      setPageId(listPage?.[0]?.id)
      setFlag(true)
    }
  }, [flag, listPage])

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      type: PageTypes.Custom,
    })
  }, [form])

  const onReset = useCallback(() => {
    form.resetFields()
    setIsVisibleModal?.(false)
  }, [form, setIsVisibleModal])

  const onCreateSucess = useCallback(
    (rs: any) => {
      setPageId(rs?.data?.id)
      onReset()
    },
    [onReset]
  )

  const { mutate: onCreatePage } = useCreatePageMutation(onCreateSucess)

  const onFinish = useCallback(() => {
    form.submit()
    form.validateFields().then(async (values) => {
      onCreatePage({
        name: values?.name,
        type: values?.type,
      })
    })
  }, [form, onCreatePage])

  const pageType = useMemo(() => find(allPage?.data, (i) => i?.id === pageId)?.type, [allPage?.data, pageId])

  const listBlock = useMemo(() => {
    switch (pageType) {
      case PageTypes.Custom:
        return [
          {
            type: BlockType.Banner,
            component: <PreviewBlockBanner />,
          },
          {
            type: BlockType.Grid,
            component: <PreviewBlockImageGrid />,
          },
          {
            type: BlockType.Video,
            component: <PreviewBlockVideo />,
          },
          {
            type: BlockType.InlineHtmlContent,
            component: <PreviewBlockContentHtml />,
          },
        ]
      case PageTypes.StoreLocator:
        return [
          {
            type: BlockType.Store,
            component: <PreviewBlockStoreLocation />,
          },
        ]
      default:
        return []
    }
  }, [pageType])

  const activePage = useMemo(() => find(listPage, (i) => i?.id === pageId), [listPage, pageId]) as AppPage

  return (
    <>
      <LayoutDesign
        leftContent={
          <>
            <div className="px-4 mb-4 flex items-center">
              {!isEmpty(listPage) && (
                <>
                  <Select
                    size="large"
                    placeholder="Select screen"
                    className="flex-1 w-1/2"
                    options={map(listPage, (i) => ({
                      label: i?.title?.text,
                      value: i?.id,
                    }))}
                    value={pageId}
                    onChange={setPageId}
                  />
                  <Tooltip title="Delete this page">
                    <Button
                      size="large"
                      className="ml-2"
                      onClick={() => {
                        modal.confirm({
                          icon: null,
                          content: (
                            <div>
                              <ExclamationCircleOutlined className="mr-2 text-[#faad14]" />
                              <span>Are you sure?</span>
                            </div>
                          ),
                          onOk: () => {
                            onDeletePage({
                              id: pageId,
                            })
                          },
                          cancelButtonProps: {
                            className: 'font-semibold text-gray800',
                          },
                          okButtonProps: {
                            className: 'bg-primary font-semibold text-gray800',
                          },
                        })
                      }}
                      loading={isLoadingDeletePage}
                      icon={<IconTrash />}
                    />
                  </Tooltip>
                </>
              )}
              <Tooltip title="Create new page">
                <Button
                  size="large"
                  className={classNames('ml-2 flex items-center justify-center', isEmpty(listPage) ? 'w-full' : '')}
                  onClick={() => setIsVisibleModal(true)}
                  icon={<IconPlus />}
                >
                  {isEmpty(listPage) ? 'Create new page' : ''}
                </Button>
              </Tooltip>
            </div>
            {pageType === PageTypes.StoreLocator && (
              <div className="px-4 mb-4">
                <a
                  href="https://support.jmango360.com/portal/en/newticket?departmentId=60403000000006907&layoutId=60403000006979011"
                  target="_blank"
                  className="cursor-pointer text-blueDark600 font-medium"
                >
                  Contact us
                </a>{' '}
                for support with bulk store location imports. Download the{' '}
                <a href={REVISED_STORE_DATA} target="_blank" className="cursor-pointer text-blueDark600 font-medium">
                  CSV template
                </a>{' '}
                with required store_name and store_address fields.
              </div>
            )}
            <Droppable type={DroppableType.Block} droppableId={DroppableId.BlockHandle} isDropDisabled>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="h-full px-4">
                  <Row gutter={[16, 16]}>
                    {!isEmpty(listBlock) ? (
                      map(listBlock, (block, index) => (
                        <Draggable key={block?.type} draggableId={block?.type as string} index={index}>
                          {(provided) => (
                            <Col
                              span={24}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                className="cursor-pointer"
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
                      ))
                    ) : (
                      <Col span={24}>
                        <div className="flex flex-col items-center justify-center h-[300px]">
                          <img src={EMPTY_LEFT_CONTENT} alt="" />
                          <Typography.Paragraph className="mb-0 text-gray500">Empty pages</Typography.Paragraph>
                        </div>
                      </Col>
                    )}
                  </Row>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </>
        }
        centerContent={<PreviewCustomPage activePage={activePage} />}
        rightContent={
          <div className="h-full flex flex-col">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Typography.Paragraph className="mb-0 text-gray800 font-semibold">
                  {activePage?.type === PageTypes.Custom ? 'Info page settings' : 'Store locator settings'}
                </Typography.Paragraph>
              </div>
            </div>
            <SettingScreenStoreLocator activePage={activePage} />
          </div>
        }
        onSave={onSave}
        isLoadingOnSave={isLoadingOnSave}
      />
      <Modal title="Create new page" width={768} destroyOnClose open={isVisibleModal} onOk={onFinish} onCancel={onReset}>
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          <div className="flex items-start gap-4">
            <Form.Item
              label="Page type"
              name="type"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Required!',
                },
              ]}
            >
              <Select
                size="large"
                placeholder=""
                className="w-64"
                options={[
                  {
                    label: 'Info Page',
                    value: PageTypes.Custom,
                  },
                  {
                    label: (
                      <span>
                        Store Locator
                        <Tooltip title="This page requires the Store Locator integration">
                          <QuestionCircleOutlined className="ml-1 text-[#8C8C8C] text-sm" />
                        </Tooltip>
                      </span>
                    ),
                    value: PageTypes.StoreLocator,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Page name"
              name="name"
              className="mb-0 flex-1"
              rules={[
                {
                  required: true,
                  message: 'Required!',
                },
              ]}
            >
              <Input size="large" className="h-10" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
