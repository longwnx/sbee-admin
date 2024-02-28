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

export const IconVideo: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 8.28813C2 5.12812 3.05 4.07812 6.21 4.07812H12.53C15.69 4.07812 16.74 5.12812 16.74 8.28813V16.7081C16.74 19.8681 15.69 20.9181 12.53 20.9181H6.21C3.05 20.9181 2 18.8181 2 16.7081V12.6181"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.518 17.6001L16.738 15.6501V9.34013L19.518 7.39013C20.878 6.44013 21.998 7.02013 21.998 8.69013V16.3101C21.998 17.9801 20.878 18.5601 19.518 17.6001Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 10C13 9.17 12.33 8.5 11.5 8.5C10.67 8.5 10 9.17 10 10C10 10.83 10.67 11.5 11.5 11.5"
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
