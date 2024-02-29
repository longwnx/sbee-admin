import { Col, Divider, Input, Row, Typography } from 'antd'

export const Products: React.FC = () => {
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Paragraph>WORD</Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Paragraph>TRANSLATION</Typography.Paragraph>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Text className="font-bold">Cart</Typography.Text>
        </Col>
        <Col span={12}>
          <Input />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Text className="font-bold">Enter Coupon Code</Typography.Text>
        </Col>
        <Col span={12}>
          <Input />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Text className="font-bold">Coupon applied</Typography.Text>
        </Col>
        <Col span={12}>
          <Input />
        </Col>
      </Row>
      <Divider />
    </>
  )
}
