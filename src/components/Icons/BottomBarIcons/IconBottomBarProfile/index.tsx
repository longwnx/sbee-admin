import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
  fill?: string
}

export const IconBottomBarProfile: React.FC<Props> = ({ width = 24, height = 24, stroke = '#1D2939', fill = '' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_871_13462)">
          <path
            d="M12 12C10.8119 11.9971 9.67335 11.5238 8.83325 10.6838C7.99315 9.84365 7.5199 8.70507 7.517 7.517C7.517 5.049 9.533 3 12 3C13.1881 3.0029 14.3267 3.47615 15.1668 4.31625C16.0068 5.15635 16.4801 6.29493 16.483 7.483C16.483 9.951 14.467 12 12 12ZM19 21H5C4.45 21 4 20.55 4 20V19C4 16.8 5.8 15 8 15H16C18.2 15 20 16.8 20 19V20C20 20.55 19.55 21 19 21Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_871_13462">
            <rect width={24} height={24} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    [fill, stroke, height, width]
  )
  return <Icon rev component={() => iconSvg} />
}
