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

export const IconSocial: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_117_87)">
          <path
            d="M13.2153 21H10.3271C9.84466 21 9.45223 20.6076 9.45223 20.1252V13.6107H7.76721C7.28479 13.6107 6.89236 13.2182 6.89236 12.7359V9.94443C6.89236 9.46201 7.28479 9.06958 7.76721 9.06958H9.45223V7.67172C9.45223 6.2857 9.88746 5.10649 10.7107 4.26177C11.5377 3.41321 12.6934 2.96478 14.0528 2.96478L16.2555 2.96835C16.7371 2.96918 17.1288 3.36161 17.1288 3.8432V6.43499C17.1288 6.91741 16.7365 7.30984 16.2542 7.30984L14.7712 7.31039C14.3189 7.31039 14.2038 7.40107 14.1791 7.42886C14.1385 7.47496 14.0902 7.60526 14.0902 7.96508V9.06944H16.1428C16.2973 9.06944 16.447 9.10756 16.5757 9.17938C16.8532 9.33445 17.0258 9.62768 17.0258 9.94456L17.0247 12.736C17.0247 13.2182 16.6322 13.6106 16.1498 13.6106H14.0902V20.1252C14.0902 20.6076 13.6977 21 13.2153 21ZM10.5095 19.9427H13.0328V13.1374C13.0328 12.8153 13.2949 12.5533 13.6169 12.5533H15.9674L15.9683 10.1269H13.6168C13.2948 10.1269 13.0328 9.86489 13.0328 9.54278V7.96508C13.0328 7.55201 13.0748 7.08225 13.3866 6.72918C13.7633 6.30235 14.357 6.25309 14.7709 6.25309L16.0715 6.25254V4.02538L14.052 4.02208C11.8672 4.02208 10.5095 5.42062 10.5095 7.67172V9.54278C10.5095 9.86476 10.2476 10.1269 9.92557 10.1269H7.94967V12.5533H9.92557C10.2476 12.5533 10.5095 12.8153 10.5095 13.1374V19.9427Z"
            fill={stroke}
          />
        </g>
        <defs>
          <clipPath id="clip0_117_87">
            <rect width={18} height="18.0352" fill="white" transform="translate(3 3)" />
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
