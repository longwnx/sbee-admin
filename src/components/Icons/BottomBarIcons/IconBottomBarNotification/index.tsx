import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
  fill?: string
}

export const IconBottomBarNotification: React.FC<Props> = ({ width = 24, height = 24, stroke = '#1D2939', fill = '' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_871_13456)">
          <path
            d="M17.4999 17.359C18.0028 17.359 18.4852 17.1597 18.8413 16.8046C19.1974 16.4496 19.3983 15.9679 19.3999 15.465C19.3999 14.932 19.1869 14.422 18.8089 14.046L17.5499 12.786V9.043C17.5499 8.31453 17.4063 7.5942 17.1274 6.92125C16.8485 6.24829 16.4397 5.63691 15.9243 5.12203C15.409 4.60716 14.7972 4.1989 14.124 3.92058C13.4508 3.64226 12.7294 3.49935 12.0009 3.5C10.5311 3.50053 9.1216 4.08473 8.08236 5.12416C7.04312 6.16358 6.45918 7.57316 6.45891 9.043V12.783L5.19991 14.043C5.01277 14.229 4.86415 14.45 4.76256 14.6935C4.66098 14.937 4.60842 15.1982 4.60791 15.462C4.6095 15.9649 4.81038 16.4466 5.16652 16.8016C5.52267 17.1567 6.00504 17.356 6.50791 17.356L17.4999 17.359Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10.521 20.5H13.478" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_871_13456">
            <rect width={24} height={24} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    [fill, height, stroke, width]
  )
  return <Icon rev component={() => iconSvg} />
}
