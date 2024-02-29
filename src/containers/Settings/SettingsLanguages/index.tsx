import { EditLanguage, ListLanguage } from './components'
import { Col, Row } from 'antd'
import { LayoutMain } from '@/layouts'

export const SettingsLanguages = () => {
  return (
    <LayoutMain>
      <div className="overflow-hidden h-[calc(100vh-64px)]">
        <Row className="h-full">
          <Col span={6}>
            <ListLanguage />
          </Col>
          <Col span={18}>
            <EditLanguage />
          </Col>
        </Row>
      </div>
    </LayoutMain>
  )
}
