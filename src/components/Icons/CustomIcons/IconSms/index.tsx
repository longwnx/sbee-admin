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

export const IconSms: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.83333 5.125C5.87732 5.125 4.29166 6.71066 4.29166 8.66667V19.4328C4.29166 19.6075 4.49373 19.7046 4.63014 19.5955L6.98637 17.7105C7.39271 17.3854 7.8976 17.2083 8.41796 17.2083H16.1667C18.1227 17.2083 19.7083 15.6227 19.7083 13.6667V8.66667C19.7083 6.71066 18.1227 5.125 16.1667 5.125H7.83333ZM3.04166 8.66667C3.04166 6.0203 5.18696 3.875 7.83333 3.875H16.1667C18.813 3.875 20.9583 6.0203 20.9583 8.66667V13.6667C20.9583 16.313 18.813 18.4583 16.1667 18.4583H8.41796C8.18143 18.4583 7.95194 18.5388 7.76724 18.6866L5.41101 20.5716C4.45615 21.3355 3.04166 20.6557 3.04166 19.4328V8.66667Z"
          fill={stroke}
        />
        <path
          d="M8.91671 11.2082C8.91671 11.7835 8.45033 12.2498 7.87504 12.2498C7.29974 12.2498 6.83337 11.7835 6.83337 11.2082C6.83337 10.6328 7.29974 10.1665 7.87504 10.1665C8.45033 10.1665 8.91671 10.6328 8.91671 11.2082Z"
          fill={stroke}
        />
        <path
          d="M13.0833 11.2082C13.0833 11.7835 12.617 12.2498 12.0417 12.2498C11.4664 12.2498 11 11.7835 11 11.2082C11 10.6328 11.4664 10.1665 12.0417 10.1665C12.617 10.1665 13.0833 10.6328 13.0833 11.2082Z"
          fill={stroke}
        />
        <path
          d="M17.25 11.2082C17.25 11.7835 16.7837 12.2498 16.2083 12.2498C15.6331 12.2498 15.1667 11.7835 15.1667 11.2082C15.1667 10.6328 15.6331 10.1665 16.2083 10.1665C16.7837 10.1665 17.25 10.6328 17.25 11.2082Z"
          fill={stroke}
        />
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
