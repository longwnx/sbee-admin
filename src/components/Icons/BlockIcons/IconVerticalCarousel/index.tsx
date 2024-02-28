import classNames from 'classnames'
import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  className?: string
  width?: number
  height?: number
  stroke?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const IconVerticalCarousel: React.FC<Props> = ({
  className,
  width = 24,
  height = 24,
  stroke = '#475467',
  onClick,
}) => {
  const iconSvg = useMemo(
    () => (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 24" fill="none">
        <g clipPath="url(#clip0_3003_38569)">
          <path
            d="M20 7.5V16.5C20 16.8978 19.842 17.2794 19.5607 17.5607C19.2794 17.842 18.8978 18 18.5 18H6.5C6.10218 18 5.72064 17.842 5.43934 17.5607C5.15804 17.2794 5 16.8978 5 16.5V7.5C5 7.10218 5.15804 6.72064 5.43934 6.43934C5.72064 6.15804 6.10218 6 6.5 6H18.5C18.8978 6 19.2794 6.15804 19.5607 6.43934C19.842 6.72064 20 7.10218 20 7.5ZM6.5 16.5H18.5V7.5H6.5V16.5Z"
            fill={stroke}
          />
          <path
            d="M18.5 21V24H17V21H8V24H6.5V21C6.5 20.6022 6.65804 20.2206 6.93934 19.9393C7.22064 19.658 7.60218 19.5 8 19.5H17C17.3978 19.5 17.7794 19.658 18.0607 19.9393C18.342 20.2206 18.5 20.6022 18.5 21Z"
            fill={stroke}
          />
          <path
            d="M18.5 0V3C18.5 3.39782 18.342 3.77936 18.0607 4.06066C17.7794 4.34196 17.3978 4.5 17 4.5H8C7.60218 4.5 7.22064 4.34196 6.93934 4.06066C6.65804 3.77936 6.5 3.39782 6.5 3V0H8V3H17V0H18.5Z"
            fill={stroke}
          />
        </g>
        <defs>
          <clipPath id="clip0_3003_38569">
            <rect width={24} height={24} fill="white" transform="translate(0.5)" />
          </clipPath>
        </defs>
      </svg>
    ),
    [height, stroke, width]
  )
  return (
    <div className={classNames('flex items-center justify-center', className)} onClick={onClick}>
      <Icon rev component={() => iconSvg} />
    </div>
  )
}
