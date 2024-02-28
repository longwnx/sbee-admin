import { Button, Col, Form, Input, Modal, Row, Select, Space, Typography } from 'antd'
import classNames from 'classnames'
import { map, times } from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { css } from '@emotion/css'
import { ARROWUPRIGHT, CHECKED, COMMUNITY, DIAMOND, LOGO_LONG, ROCKET, TARGET, WELCOME } from '@public'
import { useCreateZohoUserMutation, useGetUserInfoQuery } from '@/hooks'
import { useUpdateAppFirstViewedMutation } from '@/hooks/app/useUpdateAppFirstViewedMutation'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

const listPortal = [
  'Manage the integration with your eCommerce system',
  'Design, configure, and preview your app',
  'Manage your app listing',
  'Trigger the publication process',
  'Send and schedule push notifications',
  'View your app analytics',
  'Manage your JMango360 subscription',
  'Contact the JMango360 team for support',
]

const listExpect = [
  {
    icon: ROCKET,
    step: '01',
    title: '30-day free trial',
    listContent: ['Full access to the platform', 'Try out all available features for free', 'Preview your app on desktop'],
  },
  {
    icon: COMMUNITY,
    step: '02',
    title: 'Choose your subscription',
    listContent: ['Contact JMango360 to understand your requirements ', 'Select the best suited subscription'],
  },
  {
    icon: DIAMOND,
    step: '03',
    title: 'Design your app',
    listContent: ['Design your app', 'Integrate with 3rd parties', 'Draft your app listing', 'Develop custom features'],
  },
  {
    icon: TARGET,
    step: '04',
    title: 'Launch your app',
    listContent: [
      'Submit your app to the App Stores by JMango360',
      'App launch!',
      'Send push notifications',
      'Monitor app analytics',
    ],
  },
]

export const ModalWelcome: React.FC<Props> = ({ open, setOpen }) => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const { mutate: onSave } = useUpdateAppFirstViewedMutation()
  const { mutate: onNext, isLoading } = useCreateZohoUserMutation(() => {
    setStep((value) => value + 1)
  })
  const classNameButton = css({
    textAlign: 'center',
  })
  const { data: userInfo } = useGetUserInfoQuery()

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      email: userInfo?.email,
      lastName: userInfo?.family_name,
      firstName: userInfo?.given_name,
    })
  }, [form, userInfo])

  const classNameModal = css({
    '.ant-modal-content': {
      background: step === 1 || step === 4 ? '#fff' : '#EFEFEF',
      borderRadius: '20px',
      padding: '45px 48px 23px 48px',
    },
    '.ant-select-selection-item': {
      lineHeight: '46px !important',
    },
    '.ant-select-selector': {
      height: '50px !important',
    },
  })

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <Row className="min-h-[35rem]">
            <Col span={12}>
              <div className="px-5 py-8">
                <img src={LOGO_LONG} alt="logo" className="w-[195px] mb-14"></img>
                <Typography.Paragraph className="mb-2 text-[#000] text-2xl 2xl:text-4xl font-medium">
                  Welcome to{' '}
                  <Typography.Text className="text-[#C4AD8F] text-2xl 2xl:text-4xl font-semibold">
                    JMango360!
                  </Typography.Text>
                </Typography.Paragraph>
                <Typography.Paragraph className="mb-12 text-[#000] text-base 2xl:text-lg font-bold">
                  In this portal you can:
                </Typography.Paragraph>
                <div>
                  {map(listPortal, (value: string, index: number) => (
                    <div className="mb-4" key={index}>
                      <Space>
                        <img src={CHECKED} alt="icon" className="w-[12px]"></img>
                        <Typography.Text className="text-[#000] text-base 2xl:text-lg font-normal">{value}</Typography.Text>
                      </Space>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col span={12} className="m-auto">
              <img src={WELCOME} alt="img" className="w-auto rounded-2xl"></img>
            </Col>
            <Col span={24}>
              <div className={classNameButton}>
                <Button
                  className="h-16 w-[19rem] rounded-[2.5rem]"
                  type="primary"
                  onClick={() => {
                    setStep((value) => value + 1)
                  }}
                >
                  <Space size="large">
                    <Typography.Text className="text-[#fff] text-base 2xl:text-lg font-semibold">{'Next'}</Typography.Text>
                    <img src={ARROWUPRIGHT} alt="img" className="w-auto"></img>
                  </Space>
                </Button>
              </div>
            </Col>
          </Row>
        )
      case 2:
        return (
          <div className="min-h-[35rem]">
            <Row justify="space-between" className="px-5 pt-8 pb-2 mb-2">
              <Col>
                <img src={LOGO_LONG} alt="logo" className="w-[195px] mb-14"></img>
              </Col>
              <Col>
                <Typography.Paragraph className="mb-2 text-[#000] text-2xl 2xl:text-4xl font-medium">
                  What to{' '}
                  <Typography.Text className="text-[#C4AD8F] text-2xl 2xl:text-4xl font-medium">expect</Typography.Text>
                </Typography.Paragraph>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              {map(listExpect, (i, index: number) => (
                <Col span={6} key={index}>
                  <div className="h-full w-full bg-white rounded-2xl px-2 py-8">
                    <div className="w-fit rounded-full bg-[#C4AD8F] mb-8">
                      <img src={i?.icon} alt="icon" className="p-4"></img>
                    </div>
                    <Typography.Paragraph className="mb-6 text-[#000] text-lg 2xl:text-xl font-bold tracking-[0.25rem]">
                      STEP {i?.step}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="mb-6 text-[#000] text-base 2xl:text-lg font-medium">
                      {i?.title}
                    </Typography.Paragraph>
                    <div>
                      {map(i?.listContent, (value: string, index: number) => (
                        <div className="mb-4" key={index}>
                          <div className="flex items-start">
                            <img src={CHECKED} alt="icon" className="w-[12px] mt-[0.625rem] mr-2"></img>
                            <Typography.Text className="text-[#000] text-base 2xl:text-lg font-normal">
                              {value}
                            </Typography.Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
              ))}
              <Col span={24}>
                <div className={classNameButton}>
                  <Button
                    className="h-16 w-[19rem] rounded-[2.5rem] mt-4"
                    type="primary"
                    onClick={() => {
                      setStep((value) => value + 1)
                    }}
                  >
                    <Space size="large">
                      <Typography.Text className="text-[#fff] text-base 2xl:text-lg font-semibold">{'Next'}</Typography.Text>
                      <img src={ARROWUPRIGHT} alt="img" className="w-auto"></img>
                    </Space>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        )
      case 3:
        return (
          <div className={'gap-5 grid min-h-[35rem]'}>
            <Row justify="space-between" className="align-left px-5 pt-8">
              <img src={LOGO_LONG} alt="logo" className="w-[195px] mb-[26px]"></img>
              <div className={'flex-1'}></div>
            </Row>
            <Row justify="center" align="middle" className={'justify-center items-center'}>
              <Col span={24}>
                <Typography.Title level={2} className={'text-center whitespace-nowrap text-2xl 2xl:text-4xl font-medium'}>
                  We’d love to{' '}
                  <a href="https://jmango360.com/contact-us-platform/" target="_blank" className="text-[#c4ad8f]">
                    contact
                  </a>{' '}
                  you
                </Typography.Title>
                <Typography.Paragraph className="mb-8 text-[#000] text-base 2xl:text-lg font-normal text-center">
                  Tell us a bit about you and your business. We’ll contact you shortly to discuss your app requirements and
                  align on the best suited subscription.
                </Typography.Paragraph>
                <div>
                  <Form
                    requiredMark={false}
                    form={form}
                    onFinish={(values) => {
                      onNext(values)
                    }}
                  >
                    <Row gutter={[100, 8]}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="email"
                          label={
                            <span>
                              Email address <span style={{ color: 'red' }}>*</span>
                            </span>
                          }
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: 'Required!',
                            },
                          ]}
                        >
                          <Input className="h-[50px]" disabled={!!userInfo?.email} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item name="phone" label="Phone number" labelCol={{ span: 24 }}>
                          <Input className="h-[50px]" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="firstName"
                          label={
                            <span>
                              First name <span style={{ color: 'red' }}>*</span>
                            </span>
                          }
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: 'Required!',
                            },
                          ]}
                        >
                          <Input className="h-[50px]" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="lastName"
                          label={
                            <span>
                              Last name <span style={{ color: 'red' }}>*</span>
                            </span>
                          }
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: 'Required!',
                            },
                          ]}
                        >
                          <Input className="h-[50px]" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="annualOnlineRevenue"
                          label={
                            <span>
                              Annual online revenue <span style={{ color: 'red' }}>*</span>
                            </span>
                          }
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: 'Required!',
                            },
                          ]}
                        >
                          <Select
                            defaultValue=""
                            size="large"
                            options={[
                              {
                                value: 'Just started my business',
                                label: 'Just started my business',
                              },
                              { value: '0-500.000', label: '$0 - $500K' },
                              { value: '500.000-1.000.000', label: '$500K - $1M' },
                              { value: '1.000.000-2.500.000', label: '$1M - $2.5M' },
                              { value: '2.500.000-5.000.000', label: '$2.5M - $5M' },
                              { value: '5.000.000-10.000.000', label: '$5M - $10M' },
                              { value: '>10.000.000', label: '$10M+' },
                              { value: "I'm not sure", label: "I'm not sure" },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <div className={classNameButton}>
                          <Button
                            loading={isLoading}
                            className="h-16 w-[19rem] rounded-[2.5rem]"
                            type="primary"
                            htmlType={'submit'}
                          >
                            <Space size="large">
                              <Typography.Text className="text-[#fff] text-base 2xl:text-lg font-semibold">
                                {'Next'}
                              </Typography.Text>
                              <img src={ARROWUPRIGHT} alt="img" className="w-auto"></img>
                            </Space>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        )
      case 4:
        return (
          <div className="min-h-[35rem]">
            <Row className="px-5 py-8 mb-2">
              <Col>
                <img src={LOGO_LONG} alt="logo" className="w-[195px]"></img>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={18} className="text-center">
                <Typography.Paragraph className="mb-6 text-[#000] text-4xl font-medium">
                  <Typography.Text className="text-[#C4AD8F] text-4xl font-medium">Thank you!</Typography.Text>
                </Typography.Paragraph>
                <Typography.Paragraph className="mb-6 text-[#000] text-base 2xl:text-lg font-normal">
                  We’ll be in touch soon. If you wish to talk to our team right away, go ahead and&nbsp;
                  <Typography.Text>
                    <a
                      href="https://jmango360.com/contact-us-platform/"
                      target="_blank"
                      className="text-[#C4AD8F] text-base 2xl:text-lg font-normal"
                    >
                      contact us.
                    </a>
                  </Typography.Text>
                </Typography.Paragraph>
                <div>
                  <iframe
                    src="https://player.vimeo.com/video/782530032?h=b6698808c6"
                    width="640"
                    height="340"
                    className="border-none"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </Col>
              <Col span={24}>
                <div className={classNameButton}>
                  <Button
                    className="h-16 w-[19rem] rounded-[2.5rem] mt-4"
                    type="primary"
                    onClick={() => {
                      onSave()
                      setOpen(false)
                      router.push('/design/home')
                    }}
                  >
                    <Space size="large">
                      <Typography.Text className="text-[#fff] text-base 2xl:text-lg font-semibold">
                        {'Start free trial'}
                      </Typography.Text>
                      <img src={ARROWUPRIGHT} alt="img" className="w-auto"></img>
                    </Space>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        )
      default:
        return <></>
    }
  }

  return (
    <Modal closable={false} centered width="80%" destroyOnClose footer={null} open={open} className={classNameModal}>
      {renderStep(step)}
      <div className={'flex items-center justify-center mt-6'}>
        {map(times(4), (i) => {
          const isCurrentStep = step === i + 1

          const divClasses = classNames(
            'h-2 rounded-full mx-1',
            isCurrentStep ? 'w-6 bg-primary' : step < ++i ? 'w-4 bg-[#d9d9d9]' : 'w-4 bg-[#92cbd2]'
          )

          return <div key={i} className={divClasses} />
        })}
      </div>
    </Modal>
  )
}
