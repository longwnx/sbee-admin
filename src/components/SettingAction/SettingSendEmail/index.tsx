'use client'

import { Input, Typography } from 'antd'

type Props = {
  value?: {
    address?: string
    subject?: string
    content?: string
  }
  onChange?: (value?: { address?: string; subject?: string; content?: string }) => void
}

export const SettingSendEmail: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <div className="mt-4">
        <Typography.Paragraph className="font-medium text-gray800 mb-2">Email address</Typography.Paragraph>
        <Input
          value={value?.address}
          onChange={(e) =>
            onChange?.({
              ...value,
              address: e.target.value,
            })
          }
          size="large"
          placeholder="email@address.com"
        />
      </div>
      <div className="mt-4">
        <Typography.Paragraph className="font-medium text-gray800 mb-2">Subject</Typography.Paragraph>
        <Input
          value={value?.subject}
          onChange={(e) =>
            onChange?.({
              ...value,
              subject: e.target.value,
            })
          }
          size="large"
          placeholder="Enter subject"
        />
      </div>
      <div className="mt-4">
        <Typography.Paragraph className="font-medium text-gray800 mb-2">Content</Typography.Paragraph>
        <Input
          value={value?.content}
          onChange={(e) =>
            onChange?.({
              ...value,
              content: e.target.value,
            })
          }
          size="large"
          placeholder="Enter content"
        />
      </div>
    </div>
  )
}
