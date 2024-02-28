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

export const IconImageAdd: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_738_24643)">
          <path
            d="M21 13.5V17.5C21 18.5609 20.5786 19.5783 19.8284 20.3284C19.0783 21.0786 18.0609 21.5 17 21.5H7C5.93913 21.5 4.92172 21.0786 4.17157 20.3284C3.42143 19.5783 3 18.5609 3 17.5V7.5C3 6.43913 3.42143 5.42172 4.17157 4.67157C4.92172 3.92143 5.93913 3.5 7 3.5H11"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 10.5C20.2091 10.5 22 8.70914 22 6.5C22 4.29086 20.2091 2.5 18 2.5C15.7909 2.5 14 4.29086 14 6.5C14 8.70914 15.7909 10.5 18 10.5Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M19.25 6.5H16.75" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 5.25V7.75" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M3 13.5011L4.295 12.2061C4.51889 11.9822 4.7847 11.8045 5.07724 11.6833C5.36979 11.5621 5.68334 11.4998 6 11.4998C6.31666 11.4998 6.63021 11.5621 6.92276 11.6833C7.2153 11.8045 7.48111 11.9822 7.705 12.2061L12 16.5011"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.00403 21.5001L13.298 15.2061C13.5219 14.9822 13.7877 14.8045 14.0803 14.6833C14.3728 14.5621 14.6864 14.4998 15.003 14.4998C15.3197 14.4998 15.6332 14.5621 15.9258 14.6833C16.2183 14.8045 16.4841 14.9822 16.708 15.2061L20.647 19.1461"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_738_24643">
            <rect width={24} height={24} fill="white" transform="translate(0 0.5)" />
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
