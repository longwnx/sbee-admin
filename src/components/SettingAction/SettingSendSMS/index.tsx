'use client'

import { Input, Typography } from 'antd'

type Props = {
  value?: {
    text?: string
  }
  onChange?: (value?: { text?: string }) => void
}

export const SettingSendSMS: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="mt-4">
      <Typography.Paragraph className="font-medium text-gray800 mb-2">SMS</Typography.Paragraph>
      <Input
        value={value?.text}
        onChange={(e) =>
          onChange?.({
            ...value,
            text: e.target.value,
          })
        }
        size="large"
        placeholder="Enter sms"
      />
    </div>
  )
}
