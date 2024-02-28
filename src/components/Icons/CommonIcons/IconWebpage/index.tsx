import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export const IconWebpage: React.FC<Props> = ({ width = 24, height = 24, stroke = '#667085' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_778_9915)">
          <path
            d="M19.5 21H4.5C3.96957 21 3.46086 20.7893 3.08579 20.4142C2.71071 20.0391 2.5 19.5304 2.5 19V5C2.5 4.46957 2.71071 3.96086 3.08579 3.58579C3.46086 3.21071 3.96957 3 4.5 3H19.5C20.0304 3 20.5391 3.21071 20.9142 3.58579C21.2893 3.96086 21.5 4.46957 21.5 5V19C21.5 19.5304 21.2893 20.0391 20.9142 20.4142C20.5391 20.7893 20.0304 21 19.5 21Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 8V21" stroke={stroke} strokeWidth="1.5" strokeLinecap="square" />
          <path d="M2.5 8H21.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M5.505 5.48999C5.502 5.48999 5.5 5.49199 5.5 5.49499C5.5 5.49799 5.502 5.49999 5.505 5.49999C5.508 5.49999 5.51 5.49799 5.51 5.49499C5.51 5.49199 5.508 5.48999 5.505 5.48999Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.04797 5.48999C8.04497 5.48999 8.04297 5.49199 8.04297 5.49499C8.04297 5.49799 8.04497 5.49999 8.04797 5.49999C8.05097 5.49999 8.05297 5.49799 8.05297 5.49499C8.05297 5.49199 8.05097 5.48999 8.04797 5.48999Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.588 5.48999C10.585 5.48999 10.583 5.49199 10.583 5.49499C10.583 5.49799 10.585 5.49999 10.588 5.49999C10.591 5.49999 10.593 5.49799 10.593 5.49499C10.593 5.49199 10.59 5.48999 10.588 5.48999Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_778_9915">
            <rect width={24} height={24} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    [height, stroke, width]
  )
  return <Icon rev component={() => iconSvg} />
}
