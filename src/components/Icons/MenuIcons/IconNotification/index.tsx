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

export const IconNotification: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.66001 18.18V18.66H9.65901C9.64901 19.94 10.699 20.99 11.989 20.99V20.989L11.979 20.988C12.5979 20.9853 13.1905 20.7376 13.6272 20.2991C14.0639 19.8605 14.309 19.2668 14.309 18.648V18.158"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5699 18.18H17.5599C18.6199 18.18 19.4799 17.31 19.4799 16.25V16.249C19.4718 15.7069 19.2572 15.1884 18.8799 14.799L17.5999 13.519V9.72303C17.5999 6.61303 15.0799 4.09303 11.9749 4.09303H11.9639C11.2251 4.09171 10.4932 4.23611 9.81019 4.51795C9.12719 4.79979 8.50646 5.21355 7.98354 5.73555C7.46061 6.25754 7.04575 6.87753 6.76269 7.56003C6.47964 8.24254 6.33394 8.97416 6.33394 9.71303V13.5L5.05394 14.77V14.76C4.66394 15.14 4.45394 15.66 4.45394 16.2V16.19C4.44394 17.25 5.31394 18.11 6.37394 18.11H17.5239L17.5699 18.18Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M22.02 3L20.02 4.33" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 9H21.02" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.97998 3L3.97998 4.33" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1 9H2.98" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
