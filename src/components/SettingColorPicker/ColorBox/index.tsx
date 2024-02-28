'use client'

import { ColorPicker } from 'antd'
import { useState } from 'react'

type Props = {
  color?: string
  onChange?: (color?: string) => void
}

export const ColorBox: React.FC<Props> = ({ color = '#FFFFFF', onChange }) => {
  const [color2, setColor2] = useState(color)

  return (
    <ColorPicker
      value={color2}
      onChange={(_, hex) => setColor2?.(hex)}
      onOpenChange={(open) => {
        if (!open) {
          onChange?.(color2)
        }
      }}
    >
      <div className="w-10 h-10 rounded-lg border cursor-pointer" style={{ background: color }} />
    </ColorPicker>
  )
}
