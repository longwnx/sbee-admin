import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  fill?: string
}

export const IconDrag: React.FC<Props> = ({ width = 24, height = 24, fill = '#1D2939' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x={6} y={2} width={4} height={4} rx={2} fill={fill} />
        <rect x={6} y={10} width={4} height={4} rx={2} fill={fill} />
        <rect x={6} y={18} width={4} height={4} rx={2} fill={fill} />
        <rect x={14} y={2} width={4} height={4} rx={2} fill={fill} />
        <rect x={14} y={10} width={4} height={4} rx={2} fill={fill} />
        <rect x={14} y={18} width={4} height={4} rx={2} fill={fill} />
      </svg>
    ),
    [height, fill, width]
  )
  return <Icon rev component={() => iconSvg} />
}
