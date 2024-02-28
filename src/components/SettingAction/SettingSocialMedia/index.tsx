'use client'

import { Input, Select, Typography } from 'antd'
import { map } from 'lodash'
import { IconSearch } from '@/components'
import { SOCIAL_MEDIA_TYPE } from '@/utils'

type Props = {
  value?: {
    url?: string
    packageName?: string
    urlScheme?: string
  }
  onChange?: (value?: { url?: string; packageName?: string; urlScheme?: string }) => void
}

export const SettingSocialMedia: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <div className="mt-4">
        <Typography.Paragraph className="font-medium text-gray800 mb-2">Social media type</Typography.Paragraph>
        <Select
          size="large"
          showSearch
          placeholder="Select type"
          suffixIcon={<IconSearch width={20} height={20} />}
          className="w-full"
          optionLabelProp="label"
          options={map(SOCIAL_MEDIA_TYPE, (i) => ({
            value: JSON.stringify({
              packageName: i?.packageName,
              urlScheme: i?.urlScheme,
            }),
            label: i?.name,
          }))}
          filterOption={false}
          value={
            value
              ? JSON.stringify({
                  packageName: value?.packageName,
                  urlScheme: value?.urlScheme,
                })
              : undefined
          }
          onChange={(val) => {
            const data = JSON.parse(val || '{}')
            onChange?.({
              ...value,
              ...data,
            })
          }}
        />
      </div>
      <div className="mt-4">
        <Typography.Paragraph className="font-medium text-gray800 mb-2">Enter the URL</Typography.Paragraph>
        <Input
          value={value?.url}
          onChange={(e) =>
            onChange?.({
              ...value,
              url: e.target.value,
            })
          }
          size="large"
          placeholder="e.g. https://www.example.com"
        />
      </div>
    </div>
  )
}
