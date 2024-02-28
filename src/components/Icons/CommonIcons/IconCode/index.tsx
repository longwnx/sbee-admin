import classNames from 'classnames'
import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  className?: string
  width?: number
  height?: number
  fill?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const IconCode: React.FC<Props> = ({ className, width = 24, height = 24, fill = '#475467', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.038 4.72502L9.03801 18.725C8.88701 19.256 9.19501 19.81 9.72501 19.962C10.256 20.113 10.81 19.805 10.962 19.275L14.962 5.27502C15.113 4.74402 14.805 4.19002 14.275 4.03802C13.744 3.88702 13.19 4.19502 13.038 4.72502ZM4.41401 12L7.70701 15.293C8.09701 15.683 8.09701 16.317 7.70701 16.707C7.31701 17.097 6.68301 17.097 6.29301 16.707L2.29301 12.707C1.90201 12.317 1.90201 11.683 2.29301 11.293L6.29301 7.29302C6.68301 6.90302 7.31701 6.90302 7.70701 7.29302C8.09701 7.68302 8.09701 8.31702 7.70701 8.70702L4.41401 12ZM19.586 12L16.293 8.70702C15.903 8.31702 15.903 7.68302 16.293 7.29302C16.683 6.90302 17.317 6.90302 17.707 7.29302L21.707 11.293C22.098 11.683 22.098 12.317 21.707 12.707L17.707 16.707C17.317 17.097 16.683 17.097 16.293 16.707C15.903 16.317 15.903 15.683 16.293 15.293L19.586 12Z"
          fill={fill}
        />
      </svg>
    ),
    [height, fill, width]
  )
  return (
    <div className={classNames('flex items-center justify-center', className)} onClick={onClick}>
      <Icon rev component={() => iconSvg} />
    </div>
  )
}
