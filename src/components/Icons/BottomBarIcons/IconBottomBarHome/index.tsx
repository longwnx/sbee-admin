import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
  fill?: string
}

export const IconBottomBarHome: React.FC<Props> = ({ width = 24, height = 24, stroke = '#1D2939', fill = '' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_871_13439)">
          <path
            d="M16 20.9997H8C6.67392 20.9997 5.40215 20.4729 4.46447 19.5352C3.52678 18.5975 3 17.3258 3 15.9997V11.1997C3.00011 10.4498 3.16886 9.70964 3.49377 9.03386C3.81868 8.35807 4.29142 7.76402 4.877 7.29568L8.877 4.09568C9.76357 3.38641 10.8651 3 12.0005 3C13.1359 3 14.2374 3.38641 15.124 4.09568L19.124 7.29568C19.7094 7.76412 20.1819 8.35822 20.5067 9.03399C20.8314 9.70977 21 10.4499 21 11.1997V15.9997C21 17.3258 20.4732 18.5975 19.5355 19.5352C18.5979 20.4729 17.3261 20.9997 16 20.9997Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M15.3 15.918H8.56396" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_871_13439">
            <rect width={24} height={24} fill={fill} />
          </clipPath>
        </defs>
      </svg>
    ),
    [fill, height, stroke, width]
  )
  return <Icon rev component={() => iconSvg} />
}
