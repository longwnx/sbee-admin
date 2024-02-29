import { General, Others, Products, Users } from './tabs'
import { Tabs } from 'antd'
import { PageContainer } from '@ant-design/pro-components'

export const EditLanguage: React.FC = () => {
  return (
    <PageContainer title="Edit Translations">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'General',
            key: '1',
            children: <General />,
          },
          {
            label: 'Products',
            key: '2',
            children: <Products />,
          },
          {
            label: 'Users',
            key: '3',
            children: <Users />,
          },
          {
            label: 'Others',
            key: '4',
            children: <Others />,
          },
        ]}
      />
    </PageContainer>
  )
}
