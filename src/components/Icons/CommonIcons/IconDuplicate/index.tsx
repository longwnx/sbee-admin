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

export const IconDuplicate: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#667085', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1000_18109)">
          <path
            d="M5.83325 5V11.6667C5.83325 12.3297 6.09664 12.9656 6.56549 13.4344C7.03433 13.9033 7.67021 14.1667 8.33325 14.1667H14.9999C15.663 14.1667 16.2988 13.9033 16.7677 13.4344C17.2365 12.9656 17.4999 12.3297 17.4999 11.6667V5C17.4999 4.33696 17.2365 3.70107 16.7677 3.23223C16.2988 2.76339 15.663 2.5 14.9999 2.5H8.33325C7.67021 2.5 7.03433 2.76339 6.56549 3.23223C6.09664 3.70107 5.83325 4.33696 5.83325 5Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.1667 14.1673V15.0007C14.1667 15.6637 13.9033 16.2996 13.4344 16.7684C12.9656 17.2373 12.3297 17.5007 11.6667 17.5007H5C4.33696 17.5007 3.70107 17.2373 3.23223 16.7684C2.76339 16.2996 2.5 15.6637 2.5 15.0007V8.33398C2.5 7.67094 2.76339 7.03506 3.23223 6.56622C3.70107 6.09738 4.33696 5.83398 5 5.83398H5.83333"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.6667 9.99935V6.66602"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 8.33398H13.3333" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1000_18109">
            <rect width={20} height={20} fill="white" />
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
