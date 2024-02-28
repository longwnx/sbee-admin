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

export const IconClose: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.707 7.29301C16.316 6.90201 15.684 6.90201 15.293 7.29301L12 10.586L8.70701 7.29301C8.31601 6.90201 7.68401 6.90201 7.29301 7.29301C6.90201 7.68401 6.90201 8.31601 7.29301 8.70701L10.586 12L7.29301 15.293C6.90201 15.684 6.90201 16.316 7.29301 16.707C7.48801 16.902 7.74401 17 8.00001 17C8.25601 17 8.51201 16.902 8.70701 16.707L12 13.414L15.293 16.707C15.488 16.902 15.744 17 16 17C16.256 17 16.512 16.902 16.707 16.707C17.098 16.316 17.098 15.684 16.707 15.293L13.414 12L16.707 8.70701C17.098 8.31601 17.098 7.68401 16.707 7.29301Z"
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
