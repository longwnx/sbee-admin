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

export const IconEmail: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.2422 4.96875H3.75781C2.7866 4.96875 2 5.76023 2 6.72656V17.2734C2 18.2455 2.79238 19.0312 3.75781 19.0312H20.2422C21.2053 19.0312 22 18.2488 22 17.2734V6.72656C22 5.76195 21.2165 4.96875 20.2422 4.96875ZM19.996 6.14062C19.6369 6.49785 13.4564 12.6458 13.243 12.8581C12.9109 13.1901 12.4695 13.3729 12 13.3729C11.5305 13.3729 11.0891 13.1901 10.7559 12.857C10.6124 12.7142 4.50012 6.63414 4.00398 6.14062H19.996ZM3.17188 17.0349V6.96582L8.23586 12.0031L3.17188 17.0349ZM4.00473 17.8594L9.06672 12.8296L9.9284 13.6867C10.4818 14.2401 11.2175 14.5448 12 14.5448C12.7825 14.5448 13.5182 14.2401 14.0705 13.6878L14.9333 12.8296L19.9953 17.8594H4.00473ZM20.8281 17.0349L15.7641 12.0031L20.8281 6.96582V17.0349Z"
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
