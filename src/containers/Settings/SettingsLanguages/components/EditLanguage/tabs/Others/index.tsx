import { Col, Divider, Input, Row, Typography } from 'antd'

export const Others: React.FC = () => {
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
          <Typography.Text className="font-bold">Payment method</Typography.Text>
        </Col>
        <Col span={12}>
          <Input />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Text className="font-bold">Payment using</Typography.Text>
        </Col>
        <Col span={12}>
          <Input />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Text className="font-bold">Contact Us</Typography.Text>
        </Col>
        <Col span={12}>
          <Input />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Text className="font-bold">Shipping Policies</Typography.Text>
        </Col>
        <Col span={12}>
          <Input />
        </Col>
      </Row>
      <Divider />
    </>
  )
}
