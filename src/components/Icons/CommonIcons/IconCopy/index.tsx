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

export const IconCopy: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1_3326_46629" fill="white">
          <rect x="3.25" y="3.25" width="12.375" height="15.75" rx={1} />
        </mask>
        <rect
          x="3.25"
          y="3.25"
          width="12.375"
          height="15.75"
          rx={1}
          stroke={stroke}
          strokeWidth={3}
          mask="url(#path-1-inside-1_3326_46629)"
        />
        <path d="M13.375 1H2C1.44772 1 1 1.44772 1 2V15.0625" stroke="#1D2939" strokeWidth="1.5" />
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
