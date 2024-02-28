'use client'

import { Input, Switch, Typography } from 'antd'

type Props = {
  value?: {
    url?: string
    openExternal?: boolean
  }
  onChange?: (value?: { url?: string; openExternal?: boolean }) => void
}

export const SettingOpenUrl: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
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
      <div className="mt-4 flex items-center justify-between">
        <Typography.Paragraph className="font-medium text-gray800 mb-2">Open webpage in the app</Typography.Paragraph>
        <Switch
          checked={!value?.openExternal}
          onChange={(checked) => {
            onChange?.({
              ...value,
              openExternal: !checked,
            })
          }}
        />
      </div>
    </div>
  )
}
