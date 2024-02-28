'use client'

import { Button, Col, Row, Typography } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { InfoCircleFilled } from '@ant-design/icons'
import { LOGO_ALPHONSO } from '@public'
import { useLogout } from '@/hooks'
import { getThirtParty } from '@/utils'

type Props = {}

export const NoApp: React.FC<Props> = () => {
  const { onLogout } = useLogout()
  const thirtParty = useMemo(() => getThirtParty(), [])
  const [isLogout, setIsLogout] = useState<boolean>(false)
  const onLogoutClick = useCallback(() => {
    setIsLogout(true)
    onLogout()
  }, [onLogout, setIsLogout])

  return (
    <div className="min-h-screen bg-gray960">
      <Row justify="center">
        <Col span={24} sm={16} lg={13} xl={10} xxl={7} className="m-32 bg-white rounded-[5px]">
          <div className="text-center p-[35px] pb-[10px]">
            <img src={LOGO_ALPHONSO} alt="logo" className="w-[195px]" />
          </div>
          <Typography.Text className="text-3xl font-light p-[50px]">
            <InfoCircleFilled style={{ color: 'red', width: 20 }} /> You have no app!
          </Typography.Text>
          <Typography.Paragraph className="p-[50px] py-[20px]">
            Please ask the app owner to grant you permission to access an app. You can create a new app by installing the
            JMango360 Mobile app via the e-commerce platform’s marketplace.
          </Typography.Paragraph>
          <div className="text-center pb-[50px]">
            {thirtParty !== 'true' && (
              <Button
                size="large"
                type="primary"
                style={{ width: 170, borderRadius: 4 }}
                onClick={onLogoutClick}
                loading={isLogout}
              >
                OK
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}
