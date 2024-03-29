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

export const IconStoreLocation: React.FC<Props> = ({ className, width = 24, stroke = '#1D2939', height = 24, onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.9999 14.1704C9.86988 14.1704 8.12988 12.4404 8.12988 10.3004C8.12988 8.16043 9.86988 6.44043 11.9999 6.44043C14.1299 6.44043 15.8699 8.17043 15.8699 10.3104C15.8699 12.4504 14.1299 14.1704 11.9999 14.1704ZM11.9999 7.94043C10.6999 7.94043 9.62988 9.00043 9.62988 10.3104C9.62988 11.6204 10.6899 12.6804 11.9999 12.6804C13.3099 12.6804 14.3699 11.6204 14.3699 10.3104C14.3699 9.00043 13.2999 7.94043 11.9999 7.94043Z"
          fill={stroke}
        />
        <path
          d="M12.0002 22.76C10.5202 22.76 9.03018 22.2 7.87018 21.09C4.92018 18.25 1.66018 13.72 2.89018 8.33C4.00018 3.44 8.27018 1.25 12.0002 1.25C12.0002 1.25 12.0002 1.25 12.0102 1.25C15.7402 1.25 20.0102 3.44 21.1202 8.34C22.3402 13.73 19.0802 18.25 16.1302 21.09C14.9702 22.2 13.4802 22.76 12.0002 22.76ZM12.0002 2.75C9.09018 2.75 5.35018 4.3 4.36018 8.66C3.28018 13.37 6.24018 17.43 8.92018 20C10.6502 21.67 13.3602 21.67 15.0902 20C17.7602 17.43 20.7202 13.37 19.6602 8.66C18.6602 4.3 14.9102 2.75 12.0002 2.75Z"
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
