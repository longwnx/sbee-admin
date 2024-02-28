'use client'

import { Input, Typography } from 'antd'

type Props = {
  value?: {
    number?: string
  }
  onChange?: (value?: { number?: string }) => void
}

export const SettingMakePhoneCall: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="mt-4">
      <Typography.Paragraph className="font-medium text-gray800 mb-2">Phone number</Typography.Paragraph>
      <Input
        value={value?.number}
        onChange={(e) =>
          onChange?.({
            ...value,
            number: e.target.value,
          })
        }
        size="large"
        placeholder="Enter phone number"
      />
    </div>
  )
}
