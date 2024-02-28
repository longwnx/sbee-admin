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

export const IconUrl: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_109_12)">
          <path
            d="M13.5908 15.7095C13.8627 15.9814 13.8821 16.4102 13.649 16.7046L10.9395 19.4212C9.18241 21.1783 6.3336 21.1783 4.57651 19.4212C2.85935 17.7041 2.82032 14.9443 4.45943 13.1797L7.22776 10.407C7.5206 10.1142 7.99541 10.1142 8.28826 10.407C8.56019 10.6789 8.57961 11.1077 8.34653 11.4021L5.63701 14.1187C4.46561 15.2901 4.46561 17.1894 5.63701 18.3607C6.7729 19.4966 8.59317 19.5311 9.77055 18.464L12.5303 15.7095C12.8231 15.4167 13.2979 15.4167 13.5908 15.7095ZM19.4235 4.57425C21.1407 6.29141 21.1797 9.05123 19.5406 10.8158L16.7723 13.5885C16.4794 13.8813 16.0046 13.8813 15.7118 13.5885C15.4398 13.3166 15.4204 12.8877 15.6535 12.5934L18.363 9.87675C19.5344 8.70535 19.5344 6.80615 18.363 5.63475C17.2271 4.49885 15.4068 4.46443 14.2295 5.53149L11.4698 8.286C11.1769 8.57885 10.7021 8.57885 10.4093 8.286C10.1373 8.01407 10.1179 7.58525 10.351 7.29091L13.0605 4.57425C14.8176 2.81716 17.6664 2.81716 19.4235 4.57425Z"
            fill={stroke}
          />
          <path
            d="M15.7118 8.286C15.9837 8.55793 16.0031 8.98675 15.77 9.28109L9.34875 15.7095C9.0559 16.0023 8.5811 16.0023 8.28825 15.7095C8.01632 15.4376 7.9969 15.0087 8.22998 14.7144L14.6513 8.286C14.9441 7.99315 15.4189 7.99315 15.7118 8.286Z"
            fill={stroke}
          />
        </g>
        <defs>
          <clipPath id="clip0_109_12">
            <rect width={24} height={24} fill="white" />
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
