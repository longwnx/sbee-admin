import { Col, Divider, Input, Row, Typography } from 'antd'

export const Users: React.FC = () => {
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
          <Typography.Text className="font-bold">Username or Email</Typography.Text>
        </Col>
        <Col span={12}>
          <Input />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Text className="font-bold">Login</Typography.Text>
        </Col>
        <Col span={12}>
          <Input />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Text className="font-bold">Password</Typography.Text>
        </Col>
        <Col span={12}>
          <Input />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Text className="font-bold">Forgot Password?</Typography.Text>
        </Col>
        <Col span={12}>
          <Input />
        </Col>
      </Row>
      <Divider />
    </>
  )
}
