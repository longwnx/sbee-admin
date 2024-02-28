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

export const IconManageUser: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1293_27032)">
          <path
            d="M12 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V20"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.958 20.95H15.5C15.3674 20.95 15.2402 20.8973 15.1464 20.8035C15.0527 20.7098 15 20.5826 15 20.45V18.991C15.0001 18.7258 15.1055 18.4715 15.293 18.284L18.334 15.243C18.4269 15.15 18.5372 15.0763 18.6586 15.0259C18.78 14.9756 18.9101 14.9497 19.0415 14.9497C19.1729 14.9497 19.303 14.9756 19.4244 15.0259C19.5458 15.0763 19.6561 15.15 19.749 15.243L20.707 16.201C20.8 16.2939 20.8737 16.4042 20.9241 16.5256C20.9744 16.647 21.0003 16.7771 21.0003 16.9085C21.0003 17.0399 20.9744 17.17 20.9241 17.2914C20.8737 17.4128 20.8 17.5231 20.707 17.616L17.666 20.657C17.573 20.75 17.4627 20.8237 17.3412 20.874C17.2197 20.9243 17.0895 20.9501 16.958 20.95Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1293_27032">
            <rect width={24} height={24} fill="white" />
          </clipPath>
        </defs>
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
