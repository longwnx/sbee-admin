import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {}

export const Icon2DotsMark: React.FC<Props> = () => {
  const iconSvg = useMemo(
    () => (
      <svg width={3} height={10} viewBox="0 0 3 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width={3} height={3} rx="1.5" fill="#D0D5DD" />
        <rect y={7} width={3} height={3} rx="1.5" fill="#D0D5DD" />
      </svg>
    ),
    []
  )
  return <Icon rev component={() => iconSvg} />
}
