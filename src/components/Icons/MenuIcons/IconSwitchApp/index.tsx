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

export const IconSwitchApp: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.21 9.5V14.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.5801 9.5V14.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M10.5791 9.5H12.8061C13.2204 9.5 13.6177 9.66457 13.9106 9.9575C14.2035 10.2504 14.3681 10.6477 14.3681 11.062C14.3681 11.4763 14.2035 11.8736 13.9106 12.1665C13.6177 12.4594 13.2204 12.624 12.8061 12.624H10.5791"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.737 14.5L5.369 9.5L3 14.5"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.1119 6.50002C18.8816 6.19608 18.6318 5.90747 18.3639 5.63602C17.5282 4.80028 16.5361 4.13733 15.4441 3.68503C14.3522 3.23273 13.1818 2.99994 11.9999 2.99994C10.818 2.99994 9.6477 3.23273 8.55576 3.68503C7.46383 4.13733 6.47167 4.80028 5.63594 5.63602C5.36839 5.90773 5.11854 6.19632 4.88794 6.50002"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.88794 17.5C5.11794 17.799 5.36194 18.09 5.63594 18.364C6.47167 19.1997 7.46383 19.8627 8.55576 20.315C9.6477 20.7673 10.818 21.0001 11.9999 21.0001C13.1818 21.0001 14.3522 20.7673 15.4441 20.315C16.5361 19.8627 17.5282 19.1997 18.3639 18.364C18.6379 18.09 18.8809 17.799 19.1119 17.5"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.2109 9.5H19.4379C19.8522 9.5 20.2495 9.66457 20.5424 9.9575C20.8354 10.2504 20.9999 10.6477 20.9999 11.062C20.9999 11.4763 20.8354 11.8736 20.5424 12.1665C20.2495 12.4594 19.8522 12.624 19.4379 12.624H17.2109"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3.47412 13.5H7.26312" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
