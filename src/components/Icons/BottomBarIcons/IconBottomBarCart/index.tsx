import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
  fill?: string
}

export const IconBottomBarCart: React.FC<Props> = ({ width = 24, height = 24, stroke = '#1D2939', fill = '' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_871_13444)">
          <path
            d="M19.6 6.467L17.9 4.2C17.6205 3.82753 17.2581 3.5252 16.8415 3.31693C16.425 3.10866 15.9657 3.00016 15.5 3H8.5C7.556 3 6.667 3.445 6.1 4.2L4.4 6.467C4.14 6.813 4 7.234 4 7.667V18C4 18.7956 4.31607 19.5587 4.87868 20.1213C5.44129 20.6839 6.20435 21 7 21H17C17.7956 21 18.5587 20.6839 19.1213 20.1213C19.6839 19.5587 20 18.7956 20 18V7.667C20 7.234 19.86 6.813 19.6 6.467Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 10C15 10.7956 14.6839 11.5587 14.1213 12.1213C13.5587 12.6839 12.7956 13 12 13C11.2044 13 10.4413 12.6839 9.87868 12.1213C9.31607 11.5587 9 10.7956 9 10"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M19.8801 7H4.12012Z" fill={fill} />
          <path d="M19.8801 7H4.12012" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_871_13444">
            <rect width={24} height={24} fill={fill} />
          </clipPath>
        </defs>
      </svg>
    ),
    [fill, height, stroke, width]
  )
  return <Icon rev component={() => iconSvg} />
}
