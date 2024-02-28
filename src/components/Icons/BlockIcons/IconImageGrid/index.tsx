import classNames from 'classnames'
import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  className?: string
  width?: number
  height?: number
  fill?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const IconImageGrid: React.FC<Props> = ({ className, width = 24, height = 24, fill = '#475467', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1501_19808)">
          <path
            d="M3 11.25H13.5C13.8978 11.25 14.2794 11.092 14.5607 10.8107C14.842 10.5294 15 10.1478 15 9.75V3C15 2.60218 14.842 2.22064 14.5607 1.93934C14.2794 1.65804 13.8978 1.5 13.5 1.5H3C2.60218 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60218 1.5 3V9.75C1.5 10.1478 1.65804 10.5294 1.93934 10.8107C2.22064 11.092 2.60218 11.25 3 11.25ZM3 3H13.5V9.75H3V3Z"
            fill={fill}
          />
          <path
            d="M21 1.5H18C17.6022 1.5 17.2206 1.65804 16.9393 1.93934C16.658 2.22064 16.5 2.60218 16.5 3V9.75C16.5 10.1478 16.658 10.5294 16.9393 10.8107C17.2206 11.092 17.6022 11.25 18 11.25H21C21.3978 11.25 21.7794 11.092 22.0607 10.8107C22.342 10.5294 22.5 10.1478 22.5 9.75V3C22.5 2.60218 22.342 2.22064 22.0607 1.93934C21.7794 1.65804 21.3978 1.5 21 1.5ZM18 9.75V3H21V9.75H18Z"
            fill={fill}
          />
          <path
            d="M3 22.5H6C6.39782 22.5 6.77936 22.342 7.06066 22.0607C7.34196 21.7794 7.5 21.3978 7.5 21V14.25C7.5 13.8522 7.34196 13.4706 7.06066 13.1893C6.77936 12.908 6.39782 12.75 6 12.75H3C2.60218 12.75 2.22064 12.908 1.93934 13.1893C1.65804 13.4706 1.5 13.8522 1.5 14.25V21C1.5 21.3978 1.65804 21.7794 1.93934 22.0607C2.22064 22.342 2.60218 22.5 3 22.5ZM3 14.25H6V21H3V14.25Z"
            fill={fill}
          />
          <path
            d="M21 12.75H10.5C10.1022 12.75 9.72064 12.908 9.43934 13.1893C9.15804 13.4706 9 13.8522 9 14.25V21C9 21.3978 9.15804 21.7794 9.43934 22.0607C9.72064 22.342 10.1022 22.5 10.5 22.5H21C21.3978 22.5 21.7794 22.342 22.0607 22.0607C22.342 21.7794 22.5 21.3978 22.5 21V14.25C22.5 13.8522 22.342 13.4706 22.0607 13.1893C21.7794 12.908 21.3978 12.75 21 12.75ZM10.5 21V14.25H21V21H10.5Z"
            fill={fill}
          />
        </g>
        <defs>
          <clipPath id="clip0_1501_19808">
            <rect width={24} height={24} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    [fill, height, width]
  )
  return (
    <div className={classNames('flex items-center justify-center', className)} onClick={onClick}>
      <Icon rev component={() => iconSvg} />
    </div>
  )
}
