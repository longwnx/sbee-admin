import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export const IconPlainText: React.FC<Props> = ({ width = 24, height = 24, stroke = '#667085' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_932_13107)">
          <path d="M10.6167 5H20.7867" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.6667 17V5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.66675 17V10" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.66675 10H10.6667" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_932_13107">
            <rect width={24} height={24} fill="white" transform="translate(0.666748)" />
          </clipPath>
        </defs>
      </svg>
    ),
    [height, stroke, width]
  )
  return <Icon rev component={() => iconSvg} />
}
