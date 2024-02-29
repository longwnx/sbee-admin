'use client'

import { ManageUserDetail } from './components'
import { App, Button, Col, Row, Space, Table, Typography } from 'antd'
import { find, map } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { IconPenEdit, IconTrash } from '@/components'
import { useDeleteUserMutation, useGetListAppUserQuery } from '@/hooks'
import { LayoutMain } from '@/layouts'


export const ManageUserList = () => {
  const { modal } = App.useApp()
  const { data: appUsers, isLoading: isLoadingListAppUser } = useGetListAppUserQuery()
  const { mutate: onDelete, isPending: isLoadingDelete } = useDeleteUserMutation()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedId, setSelectedId] = useState()

  useEffect(() => {
    if (!isVisible) {
      setSelectedId(undefined)
    }
  }, [isVisible])

  const columns: any = useMemo(
    () => [
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Role',
        dataIndex: 'roles',
        key: 'roles',
        render: (roles: any) => find(roles, { active: true })?.displayName,
      },
      {
        title: 'Status',
        dataIndex: 'active',
        key: 'active',
        render: (active: boolean) => (active ? 'Active' : 'Inactive'),
      },
      {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        align: 'right',
        render: (_: any, record: any) => (
          <Space>
            <IconPenEdit
              className="cursor-pointer"
              width={20}
              height={20}
              onClick={() => {
                setSelectedId(record?.id)
                setIsVisible(true)
              }}
              stroke="#1D2939"
            />
            <IconTrash
              width={20}
              height={20}
              className="cursor-pointer"
              stroke="#1D2939"
              onClick={() => {
                modal.confirm({
                  icon: null,
                  content: (
                    <div>
                      <ExclamationCircleOutlined className="mr-2 text-[#faad14]" />
                      <span>User will be removed permanently. Are you sure?</span>
                    </div>
                  ),
                  onOk: () => {
                    onDelete({
                      id: record?.id,
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
            />
          </Space>
        ),
      },
    ],
    [modal, onDelete]
  )

  return (
    <LayoutMain>
      <div className="p-4 bg-gray100 h-full">
        <div className="flex items-center justify-between mb-4">
          <Typography.Paragraph className="mb-0 font-semibold text-gray800 text-base">List user</Typography.Paragraph>
          <Button className="font-semibold text-gray800" type="primary" onClick={() => setIsVisible(true)}>
            Add user
          </Button>
        </div>
        <div className="bg-white rounded-lg p-4">
          <Row>
            <Col span={24}>
              <Table
                loading={isLoadingListAppUser || isLoadingDelete}
                dataSource={map(appUsers?.data, (user) => ({
                  ...user,
                  key: user?.id,
                }))}
                columns={columns}
                scroll={{
                  x: 'auto',
                }}
                pagination={false}
              />
            </Col>
          </Row>
        </div>
      </div>
      <ManageUserDetail isVisible={isVisible} setIsVisible={setIsVisible} id={selectedId} />
    </LayoutMain>
  )
}
