import classNames from 'classnames'
import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  className?: string
  width?: number
  height?: number
  stroke?: string
}

export const IconArrowLeft: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#344054' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.8334 9.99935H4.16675M4.16675 9.99935L10.0001 15.8327M4.16675 9.99935L10.0001 4.16602"
          stroke={stroke}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    [height, stroke, width]
  )
  return (
    <div className={classNames('flex items-center justify-center', className)}>
      <Icon rev component={() => iconSvg} />
    </div>
  )
}
