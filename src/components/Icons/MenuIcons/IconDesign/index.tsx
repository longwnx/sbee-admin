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

export const IconDesign: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5039_120615)">
          <path
            d="M16.72 7.92997C17.1548 7.78657 17.6257 7.7967 18.0539 7.95869C18.4822 8.12067 18.8419 8.42469 19.073 8.81997L20.726 11.647C20.8595 11.8753 20.9464 12.1278 20.9816 12.39C21.0169 12.6521 20.9998 12.9186 20.9313 13.1741C20.8629 13.4296 20.7444 13.6689 20.5828 13.8783C20.4213 14.0877 20.2197 14.263 19.99 14.394L9.93798 20.124C8.92884 20.6988 7.78734 21.0007 6.62598 21"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 3H8C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5V17.5C10 18.4283 9.63125 19.3185 8.97487 19.9749C8.3185 20.6313 7.42826 21 6.5 21C5.57174 21 4.6815 20.6313 4.02513 19.9749C3.36875 19.3185 3 18.4283 3 17.5V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3V3Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 20.9999C7.31986 21.0004 8.12554 20.7861 8.83682 20.3784C9.54809 19.9706 10.1401 19.3836 10.554 18.6759L16.504 8.5019C16.6375 8.27358 16.7244 8.02104 16.7596 7.75891C16.7949 7.49678 16.7778 7.23027 16.7093 6.97479C16.6409 6.71931 16.5224 6.47995 16.3609 6.27055C16.1993 6.06116 15.9978 5.88589 15.768 5.7549L12.88 4.1099C12.4225 3.8491 11.8806 3.77926 11.3719 3.91556C10.8632 4.05186 10.4288 4.38329 10.163 4.8379L9.999 5.1179"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 9H3" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 15H3" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_5039_120615">
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
