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

export const IconPenEdit: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_692_6095)">
          <path
            d="M8.523 20H4V15.477C4 15.013 4.184 14.568 4.512 14.241L15.24 3.51301C15.4023 3.35043 15.595 3.22145 15.8072 3.13344C16.0194 3.04544 16.2468 3.00014 16.4765 3.00014C16.7062 3.00014 16.9336 3.04544 17.1458 3.13344C17.358 3.22145 17.5507 3.35043 17.713 3.51301L20.487 6.28701C20.6496 6.44928 20.7786 6.64201 20.8666 6.85419C20.9546 7.06636 20.9999 7.29381 20.9999 7.52351C20.9999 7.75321 20.9546 7.98066 20.8666 8.19283C20.7786 8.405 20.6496 8.59774 20.487 8.76001L9.759 19.488C9.43101 19.8155 8.98653 19.9997 8.523 20Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M13 6L18 11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 15L12 12" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_692_6095">
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
