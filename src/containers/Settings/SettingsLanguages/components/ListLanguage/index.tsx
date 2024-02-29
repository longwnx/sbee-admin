import { Col, Row, Select, Tag } from 'antd'
import classNames from 'classnames'
import { find, isEmpty, map } from 'lodash'
import { useCallback, useState } from 'react'
import { LANGUAGES_LIST } from '@/utils'

export const ListLanguage: React.FC = () => {
  const [languages, setLanguages] = useState([
    {
      name: 'English',
      code: 'en',
      isSelected: true,
      isDefault: true,
    },
    {
      name: 'Vietnamese',
      code: 'vi',
      isSelected: false,
      isDefault: false,
    },
  ])

  const onSelectLang = useCallback(
    (code: string) => {
      const newData = map(languages, (lang) => ({
        ...lang,
        isSelected: false,
        ...(code === lang?.code && {
          isSelected: true,
        }),
      }))
      setLanguages(newData)
    },
    [languages]
  )

  const onAddNewLanguage = useCallback(
    (code: string | null) => {
      const isExistLang = find(languages, (i) => i?.code === code)
      if (isEmpty(isExistLang)) {
        const findLang = find(LANGUAGES_LIST, (i) => i.code === code)
        const newData = [
          ...languages,
          {
            name: findLang?.name || '',
            code: code || '',
            isSelected: false,
            isDefault: false,
          },
        ]
        setLanguages(newData)
      }
    },
    [languages]
  )
  return (
    <div className="h-full p-4 border-r">
      <Row gutter={[8, 8]}>
        {map(languages, (lang, index) => (
          <Col span={24} key={index}>
            <div
              className={classNames(
                'py-2 px-4 rounded-md cursor-pointer flex items-center justify-between',
                lang?.isSelected ? 'bg-gray-100' : ''
              )}
              onClick={() => onSelectLang(lang?.code)}
            >
              <span className="font-bold mr-2">{lang?.name}</span>
              {lang?.isDefault && <Tag color="blue">Default</Tag>}
            </div>
          </Col>
        ))}
        <Col span={24}>
          <Select
            value={null}
            placeholder="Search Languages"
            className="w-full"
            optionFilterProp="children"
            showSearch
            filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={map(LANGUAGES_LIST, (i) => ({
              value: i.code,
              label: i.name,
            }))}
            onChange={(val) => onAddNewLanguage(val)}
          />
        </Col>
      </Row>
    </div>
  )
}
