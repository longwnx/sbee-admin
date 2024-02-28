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

export const IconDashboard: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5039_120617)">
          <path
            d="M16.5 3.5H19.5C19.8978 3.5 20.2794 3.65804 20.5607 3.93934C20.842 4.22064 21 4.60218 21 5V19C21 19.3978 20.842 19.7794 20.5607 20.0607C20.2794 20.342 19.8978 20.5 19.5 20.5H15V5C15 4.60218 15.158 4.22064 15.4393 3.93934C15.7206 3.65804 16.1022 3.5 16.5 3.5Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 20.5H9V10.5C9 10.1022 9.15804 9.72064 9.43934 9.43934C9.72064 9.15804 10.1022 9 10.5 9H15"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 15H9V20.5H4.5C4.10218 20.5 3.72064 20.342 3.43934 20.0607C3.15804 19.7794 3 19.3978 3 19V16.5C3 16.1022 3.15804 15.7206 3.43934 15.4393C3.72064 15.158 4.10218 15 4.5 15Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_5039_120617">
            <rect width={24} height={24} fill="white" transform="translate(0 24) rotate(-90)" />
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
