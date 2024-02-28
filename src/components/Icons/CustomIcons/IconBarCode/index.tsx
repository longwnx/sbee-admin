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

export const IconBarCode: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#7F8596', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.49013 15.9016H4.74959V3.61816H3.49013V15.9016ZM6.15199 15.9016H7.41144V3.61816H6.15199V15.9016ZM8.86989 15.9016H11.3888V3.61816H8.86989V15.9016ZM12.8693 15.9016H14.1287V3.61816H12.8693V15.9016ZM15.7427 15.9016H18.2616V3.61816H15.7427V15.9016ZM20.0967 19.4734H17.3114V18.214H20.0967C20.4512 18.214 20.7403 17.872 20.7403 17.4514V14.1661H21.9997V17.4514C21.9997 18.5666 21.1465 19.4734 20.0967 19.4734ZM5.30733 19.1641H2.02205C0.907436 19.1641 0 18.3102 0 17.2611V14.4751H1.25945V17.2611C1.25945 17.6162 1.60139 17.9046 2.02205 17.9046H5.30733V19.1641ZM1.25964 5.30733H0.000188918V2.02205C0.000188918 0.907436 0.853468 0 1.90322 0H4.6885V1.25945H1.90322C1.54869 1.25945 1.25964 1.60202 1.25964 2.02205V5.30733ZM22 4.99801H20.7405V2.21273C20.7405 1.85757 20.3986 1.56852 19.9779 1.56852H16.6927V0.30907H19.9779C21.0932 0.30907 22 1.16298 22 2.21273V4.99801Z"
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
