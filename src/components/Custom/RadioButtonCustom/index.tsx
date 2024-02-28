'use client'

import { Col, Row, Space, Typography } from 'antd'
import classNames from 'classnames'
import { map } from 'lodash'

type Props = {
  activeKey?: string
  setActiveKey?: (key: any) => void
  items?: {
    key: string
    label: string
    icon: React.ReactNode
  }[]
}

export const RadioButtonCustom: React.FC<Props> = ({ activeKey, setActiveKey, items }) => {
  return (
    <Row gutter={[16, 16]}>
      {map(items, (item) => (
        <Col span={8} key={item?.key}>
          <div
            className={classNames(
              'w-full flex items-center border h-12 py-2 px-1 cursor-pointer rounded',
              activeKey === item?.key ? 'border-primary bg-primary' : 'border-gray100 bg-gray50'
            )}
            onClick={() => setActiveKey?.(item?.key)}
          >
            <Space>
              <div className="bg-gray-100 rounded w-8 h-8 flex items-center justify-center">{item?.icon}</div>
              <Typography.Text
                className={classNames('text-sm whitespace-nowrap', activeKey === item?.key ? 'text-gray800' : '')}
              >
                {item?.label}
              </Typography.Text>
            </Space>
          </div>
        </Col>
      ))}
    </Row>
  )
}
