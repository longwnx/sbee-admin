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

export const IconImageSlide: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#475467', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.58102 17C7.55186 17.461 7.68314 17.9178 7.95255 18.2929C8.22197 18.6681 8.61292 18.9384 9.05902 19.058L16.049 20.931C16.5613 21.0682 17.107 20.9963 17.5663 20.7311C18.0255 20.4659 18.3607 20.0292 18.498 19.517L20.931 10.437C20.9991 10.1833 21.0165 9.91867 20.9823 9.65823C20.948 9.39778 20.8628 9.14663 20.7315 8.91912C20.6002 8.69161 20.4254 8.4922 20.217 8.33226C20.0086 8.17233 19.7707 8.05502 19.517 7.98702L14.237 6.57202"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 5V15C3 15.5304 3.21071 16.0391 3.58579 16.4142C3.96086 16.7893 4.46957 17 5 17H12.237C12.7674 17 13.2761 16.7893 13.6512 16.4142C14.0263 16.0391 14.237 15.5304 14.237 15V5C14.237 4.46957 14.0263 3.96086 13.6512 3.58579C13.2761 3.21071 12.7674 3 12.237 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
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
