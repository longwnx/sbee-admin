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

export const IconDownload: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#475467', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19 16.4524C20.0179 15.6117 20.6667 14.3399 20.6667 12.9167C20.6667 10.3854 18.6146 8.33333 16.0833 8.33333C15.9012 8.33333 15.7309 8.23833 15.6384 8.08145C14.5517 6.23736 12.5454 5 10.25 5C6.79822 5 4 7.79822 4 11.25C4 12.9718 4.69621 14.5309 5.82246 15.6613"
          stroke={stroke}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.6667 15.6667L12.3333 19M12.3333 19L9.00001 15.6667M12.3333 19L12.3333 15.25L12.3333 11.5"
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
    <div className={classNames('flex items-center justify-center', className)} onClick={onClick}>
      <Icon rev component={() => iconSvg} />
    </div>
  )
}
