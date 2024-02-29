'use client'

import { App, Col, Form, Input, Row, Switch, Typography } from 'antd'
import classNames from 'classnames'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useCopyToClipboard } from 'usehooks-ts'
import { css } from '@emotion/css'
import { IconCopy, OpenImageLibrary } from '@/components'
import { useGetAppCouponQuery, useGetAppSettingsQuery, useGetUserInfoQuery, useUpdateAppSettingsMutation } from '@/hooks'
import { LayoutMain } from '@/layouts'
import { flagChangeAppSettingsState } from '@/recoil'
import { genCode } from '@/utils'

export const Settings = () => {
  const [form] = Form.useForm()
  const { data: userInfo } = useGetUserInfoQuery()
  const { data: appSettings } = useGetAppSettingsQuery()
  const { data: appCoupon } = useGetAppCouponQuery()
  const { mutate: onUpdateAppSettings, isLoading: isLoadingOnSave } = useUpdateAppSettingsMutation()
  const [flagChangeAppSettings, setFlagChangeAppSettings] = useRecoilState(flagChangeAppSettingsState)
  const watchL2sp = Form.useWatch(['l2sp', 'enabled'], form)
  const watchQuickAddSettings = Form.useWatch(['quickAddSettings', 'enabled'], form)
  const watchAppIcon = Form.useWatch('appIcon', form)
  const [, onCopy] = useCopyToClipboard()
  const { message } = App.useApp()

  const [generatedCode, setGeneratedCode] = useState('')

  useEffect(() => {
    form.setFieldsValue({
      l2sp: appSettings?.data?.l2sp,
      allowGuestCheckout: appSettings?.data?.allowGuestCheckout,
      showColorIndicator: appSettings?.data?.showColorIndicator,
      deleteAccountRequestReceiver: appSettings?.data?.deleteAccountRequestReceiver || userInfo?.email,
      appName: appSettings?.data?.appName,
      appIcon: appSettings?.data?.appIcon,
      appCode: appCoupon?.data?.appCode,
      generatedCode: appCoupon?.data?.generatedCode,
      quickAddSettings: appSettings?.data?.quickAddSettings,
    })
    setGeneratedCode(appCoupon?.data?.generatedCode)
  }, [appCoupon?.data?.appCode, appCoupon?.data?.generatedCode, appSettings, form, userInfo?.email])

  const onSave = useCallback(() => {
    form.submit()
    form.validateFields().then(async (values) => {
      onUpdateAppSettings({
        settings: {
          ...appSettings?.data,
          l2sp: values?.l2sp,
          deleteAccountRequestReceiver: values?.deleteAccountRequestReceiver,
          allowGuestCheckout: values?.allowGuestCheckout,
          showColorIndicator: values?.showColorIndicator,
          appName: values?.appName,
          appIcon: values?.appIcon,
          profileFormSettings: values?.profileFormSettings,
          addressFormSettings: values?.addressFormSettings,
          quickAddSettings: {
            enabled: values?.quickAddSettings?.enabled,
            label: values?.quickAddSettings?.label || appSettings?.data?.quickAddSettings.label || 'Shop Now',
          },
        },
        coupon: {
          appCode: values?.appCode,
          generatedCode,
        },
      })
    })
  }, [appSettings?.data, form, generatedCode, onUpdateAppSettings])

  const inputClassName = css({
    '.ant-input': {
      backgroundColor: '#F2F4F7',
    },
  })

  return (
    <LayoutMain onSave={onSave} isVisibleFooter={flagChangeAppSettings} isLoadingOnSave={isLoadingOnSave}>
      <div className="p-4 bg-gray100 min-h-screen">
        <Form
          layout="vertical"
          form={form}
          requiredMark={false}
          onFieldsChange={(changedFields: any) => {
            if (
              changedFields?.[0]?.name?.[0] === 'l2sp' ||
              changedFields?.[0]?.name?.[0] === 'deleteAccountRequestReceiver' ||
              changedFields?.[0]?.name?.[0] === 'allowGuestCheckout' ||
              changedFields?.[0]?.name?.[0] === 'showColorIndicator' ||
              changedFields?.[0]?.name?.[0] === 'appName' ||
              changedFields?.[0]?.name?.[0] === 'profileFormSettings' ||
              changedFields?.[0]?.name?.[0] === 'addressFormSettings' ||
              changedFields?.[0]?.name?.[0] === 'appCode' ||
              changedFields?.[0]?.name?.[0] === 'quickAddSettings'
            ) {
              setFlagChangeAppSettings(true)
            }

            if (changedFields?.[0]?.name?.[0] === 'appCode') {
              setGeneratedCode(changedFields?.[0]?.value ? `${changedFields?.[0]?.value}_${genCode()}` : '')
            }
          }}
          initialValues={{
            profileFormSettings: {
              type: 0,
            },
            addressFormSettings: {
              type: 0,
            },
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24} lg={12}>
              <div className="bg-white rounded-lg p-4 mb-4">
                <Row className="mb-2">
                  <Typography.Paragraph className="font-bold text-gray800 mb-0">App name</Typography.Paragraph>
                  <Typography.Paragraph className="font-bold text-gray800 text-red-500 mb-0">&nbsp;*</Typography.Paragraph>
                </Row>
                <Typography.Paragraph className="text-gray800 mb-2">
                  Specify the app name for use within the app builder
                </Typography.Paragraph>
                <Form.Item
                  className="mb-3"
                  name="appName"
                  rules={[
                    {
                      required: true,
                      message: 'Required!',
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter app name" maxLength={30} showCount />
                </Form.Item>
                <div className="mb-[21px]">
                  <Typography.Paragraph className="font-bold text-gray800 mb-0">App icon</Typography.Paragraph>
                  <Typography.Paragraph className="text-gray800 mb-0">
                    Upload the app icon (1024 x 1024px) for use within the app builder
                  </Typography.Paragraph>
                </div>
                <Form.Item className="mb-0" name="appIcon">
                  <OpenImageLibrary
                    src={watchAppIcon}
                    onUpload={(selectedMedia) => {
                      form.setFieldValue('appIcon', selectedMedia?.[0]?.url)
                      setFlagChangeAppSettings(true)
                    }}
                    onRemoveThumb={() => {
                      form.setFieldValue('appIcon', '')
                      setFlagChangeAppSettings(true)
                    }}
                    className="w-[200px] h-[200px]"
                  />
                </Form.Item>
              </div>
              <div className="bg-white rounded-lg p-4 mb-4">
                <Row className="mb-2">
                  <Typography.Paragraph className="font-bold text-gray800 mb-0">
                    Account deletion email&nbsp;
                  </Typography.Paragraph>
                  <Typography.Paragraph className="font-bold text-gray800 mb-0 text-red-500">*</Typography.Paragraph>
                </Row>

                <Typography.Paragraph className="text-gray800 mb-[13px]">
                  This functionality allows your customer the possibility to delete their account
                </Typography.Paragraph>

                <Form.Item
                  className="mb-0"
                  name="deleteAccountRequestReceiver"
                  rules={[
                    {
                      type: 'email',
                      message: 'Required!',
                      required: true,
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter email" />
                </Form.Item>
              </div>
              <div className="bg-white rounded-lg p-4 mb-4">
                <Typography.Paragraph className="font-bold text-gray800 mb-0">Log in to see price</Typography.Paragraph>
                <div className="flex my-2">
                  <Typography.Paragraph className="text-gray800 mb-0 mr-6">
                    When enabled, only logged-in users can view prices and proceed to checkout. Customize the reminder block
                    on the home screen and product listings for login prompts.
                  </Typography.Paragraph>

                  <Form.Item name={['l2sp', 'enabled']} valuePropName="checked" className="mb-0">
                    <Switch />
                  </Form.Item>
                </div>
                {watchL2sp && (
                  <>
                    <Form.Item
                      label="Title"
                      name={['l2sp', 'title']}
                      className="mb-2"
                      initialValue={'Login to view pricing'}
                    >
                      <Input size="large" maxLength={30} showCount />
                    </Form.Item>
                    <Form.Item
                      label="Description"
                      name={['l2sp', 'description']}
                      className="mb-2"
                      initialValue={'Please login to your account to see the product prices'}
                    >
                      <Input size="large" maxLength={100} showCount />
                    </Form.Item>
                    <Form.Item
                      label="Button"
                      name={['l2sp', 'ctaButton', 'text']}
                      className="mb-2"
                      initialValue={'Login now'}
                    >
                      <Input size="large" maxLength={30} showCount />
                    </Form.Item>
                  </>
                )}
              </div>
              <div className="bg-white rounded-lg p-4 mb-4">
                <Typography.Paragraph className="font-bold text-gray800 mb-0">Allow Guest Checkout</Typography.Paragraph>
                <div className="flex justify-between mt-2">
                  <Typography.Paragraph className="text-gray800 mb-0 mr-6">
                    When enabled, guest users can proceed to checkout without creating an account or logging in
                  </Typography.Paragraph>

                  <Form.Item name="allowGuestCheckout" valuePropName="checked" className="mb-0">
                    <Switch />
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={24} lg={12}>
              <div className="bg-white rounded-lg p-4 mb-4">
                <Typography.Paragraph className="font-bold text-gray800 mb-0">
                  App-exclusive coupon code
                </Typography.Paragraph>
                <Typography.Paragraph className="text-gray800 mb-0 mt-2">
                  Enter your app-exclusive coupon code (e.g., APP20) and use the auto-generated code (e.g., APP20_ABCDE12345)
                  to create a coupon in BigCommerce
                </Typography.Paragraph>
                <Typography.Paragraph className="text-gray800 my-[11px]">App-exclusive coupon code</Typography.Paragraph>
                <Form.Item
                  className="mb-[11px]"
                  name="appCode"
                  rules={[
                    {
                      pattern: /^[a-zA-Z0-9_-]*$/,
                      message: 'Only letters, numbers, hyphens, and underscores are allowed',
                    },
                  ]}
                >
                  <Input maxLength={30} showCount size="large" />
                </Form.Item>
                <Typography.Paragraph className="text-gray800 my-[11px]">Auto-generated code</Typography.Paragraph>
                <Form.Item className={'mb-0'}>
                  <Input
                    value={generatedCode}
                    size="large"
                    readOnly
                    className={classNames('bg-[#F2F4F7] cursor-pointer', inputClassName)}
                    suffix={
                      <IconCopy
                        width={14}
                        onClick={() => {
                          message.success('Copied!')
                          onCopy(generatedCode)
                        }}
                      />
                    }
                  />
                </Form.Item>
              </div>
              <div className="bg-white rounded-lg p-4 mb-4">
                <Typography.Paragraph className="font-bold text-gray800 mb-0">Quick add products</Typography.Paragraph>

                <div className="flex justify-between mt-2 mb-[11px]">
                  <Typography.Paragraph className="text-gray800 mb-0 mr-6">
                    When enabled, allow quick product adding from listings. Keep the button label short to prevent truncation
                    on mobile devices.
                  </Typography.Paragraph>
                  <Form.Item name={['quickAddSettings', 'enabled']} valuePropName="checked" className="mb-0">
                    <Switch />
                  </Form.Item>
                </div>
                {watchQuickAddSettings && (
                  <>
                    <Form.Item
                      label={
                        <span>
                          Quick Add label <span className={'text-red-500'}>*</span>
                        </span>
                      }
                      name={['quickAddSettings', 'label']}
                      rules={[
                        {
                          required: true,
                          message: 'Required!',
                        },
                      ]}
                      initialValue="Shop Now"
                      className="mb-0"
                    >
                      <Input size="large" maxLength={30} showCount />
                    </Form.Item>
                  </>
                )}
              </div>
              <div className="bg-white rounded-lg p-4 mb-4">
                <Typography.Paragraph className="font-bold text-gray800 mb-0">Color indicators</Typography.Paragraph>
                <div className="flex justify-between mt-2">
                  <div className={'mr-6'}>
                    <Typography.Paragraph className="text-gray800">
                      This setting requires mobile app X.X.X or later;{' '}
                      <Link
                        href="https://support.jmango360.com/portal/en/newticket?departmentId=60403000000006907&layoutId=60403000006979011"
                        target="_blank"
                      >
                        contact us
                      </Link>
                      &nbsp;to request an app upgrade
                    </Typography.Paragraph>

                    <Typography.Paragraph className="text-gray800 mb-0">
                      When enabled, display color indicators for product color options in listings. Use this setting if most
                      products in your app feature color options.
                    </Typography.Paragraph>
                  </div>

                  <Form.Item name="showColorIndicator" valuePropName="checked" className="mb-0">
                    <Switch />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </LayoutMain>
  )
}
