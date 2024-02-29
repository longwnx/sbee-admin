'use client'

import { Button, Checkbox, Divider, Drawer, Form, Input, message, Select, Space, Typography } from 'antd'
import classNames from 'classnames'
import { every, filter, find, forIn, groupBy, includes, map } from 'lodash'
import { Fragment, useCallback, useEffect, useMemo } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { css } from '@emotion/css'
import { IconClose } from '@/components'
import {
  useCreateUserMutation,
  useGetAllPermissionsQuery,
  useGetPermissionsOfUserQuery,
  useUpdateUserMutation,
} from '@/hooks'


const FIELD_ROLE = 'role'
const FIELD_CODE = 'code'
const FIELD_GROUP = 'group'
const ROLE_STAFF = 'staff'

type Props = {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
  id?: string
}

export const ManageUserDetail: React.FC<Props> = ({ isVisible, setIsVisible, id }) => {
  const [form] = Form.useForm()

  const { data: allPermissions } = useGetAllPermissionsQuery()
  const { data: detailUsers } = useGetPermissionsOfUserQuery({
    id,
  })
  const { mutate: onCreate, isPending: isLoadingCreate } = useCreateUserMutation(() => setIsVisible(false))
  const { mutate: onUpdate, isPending: isLoadingUpdate } = useUpdateUserMutation(() => setIsVisible(false))

  const className = css({
    '.ant-checkbox-group': {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      '.ant-checkbox-wrapper': {
        marginLeft: 0,
      },
    },
  })

  const initialValues = useMemo(
    () => (id ? detailUsers?.data : allPermissions?.data),
    [allPermissions?.data, detailUsers?.data, id]
  )

  useEffect(() => {
    if (id) {
      const groupByPermission = groupBy(initialValues?.permissions, 'group')
      let newPermission = {}
      forIn(groupByPermission, (value, key) => {
        newPermission = {
          ...newPermission,
          [key]: map(
            filter(value, (i) => i?.active),
            'code'
          ),
        }
      })
      form.setFieldsValue({
        ...detailUsers?.data,
        permissions: newPermission,
        role: find(detailUsers?.data?.roles, { active: true })?.code,
      })
    } else {
      const role = find(initialValues?.roles, { code: ROLE_STAFF })?.code
      const permissions = map(initialValues?.permissions, (permission) => ({
        ...permission,
        active: includes(permission?.roles, role) || false,
      }))
      const groupByPermission = groupBy(permissions, FIELD_GROUP)
      let newPermission = {}
      forIn(groupByPermission, (value, key) => {
        newPermission = {
          ...newPermission,
          [key]: map(
            filter(value, (i) => i?.active),
            FIELD_CODE
          ),
        }
      })
      form.setFieldsValue({
        role,
        permissions: newPermission,
      })
    }
  }, [detailUsers?.data, form, initialValues?.permissions, initialValues?.roles, id])

  const groupPermissions = useMemo(() => {
    const groupByPermission = groupBy(initialValues?.permissions, 'group')
    return map(Object.keys(groupByPermission), (key) => ({
      group: {
        code: key,
        displayName: find(initialValues?.groups, { code: key })?.displayName,
      },
      permissions: groupByPermission?.[key],
    }))
  }, [initialValues?.groups, initialValues?.permissions])

  const onFieldsChange = useCallback(
    (changedFields: any) => {
      const fieldName = changedFields?.[0]?.name?.[0]
      if (fieldName === FIELD_ROLE) {
        const fieldValue = changedFields?.[0]?.value
        const permissions = map(initialValues?.permissions, (permission) => ({
          ...permission,
          active: includes(permission?.roles, fieldValue) || false,
        }))
        const groupByPermission = groupBy(permissions, FIELD_GROUP)
        let newPermission = {}
        forIn(groupByPermission, (value, key) => {
          newPermission = {
            ...newPermission,
            [key]: map(
              filter(value, (i) => i?.active),
              FIELD_CODE
            ),
          }
        })
        form.setFieldsValue({
          permissions: newPermission,
        })
      }
    },
    [form, initialValues?.permissions]
  )

  const onReset = useCallback(() => {
    form.resetFields()
    setIsVisible(false)
  }, [form, setIsVisible])

  const onSave = useCallback(() => {
    form.submit()
    form.validateFields().then(async (values) => {
      const permissions = map(initialValues?.permissions, (permission) => ({
        ...permission,
        active: includes(values?.permissions?.[permission?.group], permission?.code) || false,
      }))
      const isEmpty = every(permissions, (permission) => permission?.active === false)
      if (isEmpty) {
        return message.error('Please select at least one permission')
      }
      const data = {
        email: values?.email,
        name: values?.name,
        active: values?.active,
        role: values?.role,
        permissions,
      }
      if (id) {
        onUpdate({
          data,
          id,
        })
      } else {
        onCreate({
          data,
        })
      }
      onReset()
    })
  }, [form, initialValues?.permissions, id, onReset, onUpdate, onCreate])

  return (
    <Drawer
      bodyStyle={{ overflow: 'hidden', padding: 0 }}
      closable={false}
      placement="right"
      onClose={onReset}
      open={isVisible}
      destroyOnClose
      width={400}
    >
      <div className="h-full flex flex-col">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Typography.Paragraph className="mb-0 text-gray800 font-semibold">
              {id ? 'Edit User' : 'Add User'}
            </Typography.Paragraph>
            <div className="cursor-pointer flex items-center">
              <IconClose onClick={onReset} />
            </div>
          </div>
        </div>
        <div className="h-full flex flex-col">
          <Scrollbars className="h-full flex-1">
            <div className="h-full flex flex-col px-4">
              <div className={classNames(className)}>
                <Typography.Paragraph className="font-bold">Permissions</Typography.Paragraph>
                <Form
                  form={form}
                  onFieldsChange={onFieldsChange}
                  layout="vertical"
                  initialValues={{
                    active: true,
                  }}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { type: 'email', message: 'Invalid email!' },
                      { required: true, message: 'Required!' },
                    ]}
                  >
                    <Input
                      size="large"
                      disabled={!!id}
                      value={form.getFieldValue('email')}
                      onChange={(e) => {
                        form.setFieldsValue({
                          email: e.target.value.replaceAll(' ', ''),
                        })
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Status" name="active" rules={[{ required: true, message: 'Required!' }]}>
                    <Select
                      size="large"
                      options={[
                        { label: 'Active', value: true },
                        { label: 'Inactive', value: false },
                      ]}
                    />
                  </Form.Item>
                  <Divider />
                  <Form.Item label="User role" name={FIELD_ROLE} rules={[{ required: true, message: 'Required!' }]}>
                    <Select
                      size="large"
                      options={map(initialValues?.roles, (role) => ({
                        label: role?.displayName,
                        value: role?.code,
                      }))}
                    />
                  </Form.Item>
                  <Divider />
                  {map(groupPermissions, (group) => (
                    <Fragment key={group?.group?.code}>
                      <Form.Item label={group?.group?.displayName} name={['permissions', group?.group?.code]}>
                        <Checkbox.Group
                          options={map(group?.permissions, (permission) => ({
                            label: permission?.displayName,
                            value: permission?.code,
                          }))}
                        />
                      </Form.Item>
                      <Space className="mb-6">
                        <Button
                          className="font-semibold text-gray800"
                          onClick={() => {
                            form.setFieldsValue({
                              permissions: {
                                [group?.group?.code]: map(group?.permissions, 'code'),
                              },
                            })
                          }}
                        >
                          Select All
                        </Button>
                        <Button
                          className="font-semibold text-gray800"
                          onClick={() => {
                            form.setFieldsValue({
                              permissions: {
                                [group?.group?.code]: [],
                              },
                            })
                          }}
                        >
                          Unselect All
                        </Button>
                      </Space>
                      <Divider />
                    </Fragment>
                  ))}
                </Form>
              </div>
            </div>
          </Scrollbars>
          <div className="p-4">
            <Button
              onClick={onSave}
              loading={isLoadingCreate || isLoadingUpdate}
              size="large"
              type="primary"
              block
              className="text-gray800 font-semibold text-sm"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
