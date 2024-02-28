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

export const IconCustomFields: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.2797 20.9834H16.9997C19.7597 20.9834 21.9997 18.7434 21.9997 15.9834V9.4834C21.9997 6.7234 19.7597 4.4834 16.9997 4.4834H10.2797C8.86969 4.4834 7.52969 5.0734 6.57969 6.1234L3.04969 10.0034C1.63969 11.5534 1.63969 13.9134 3.04969 15.4634L6.57969 19.3434C7.52969 20.3934 8.86969 20.9834 10.2797 20.9834Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13 8.4834V13.7334" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 16.9336V17.0336" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
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
