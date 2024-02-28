import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export const IconBottomBarSearch: React.FC<Props> = ({ width = 24, height = 24, stroke = '#1D2939' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_738_15841)">
          <path
            d="M16.6666 16.6667L13.6466 13.6467"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.33337 9.37492C3.33337 10.5698 3.68771 11.7379 4.35158 12.7315C5.01545 13.725 5.95902 14.4994 7.06299 14.9567C8.16697 15.414 9.38174 15.5336 10.5537 15.3005C11.7257 15.0674 12.8022 14.492 13.6471 13.647C14.4921 12.8021 15.0675 11.7256 15.3006 10.5536C15.5337 9.38162 15.4141 8.16684 14.9568 7.06287C14.4995 5.9589 13.7252 5.01532 12.7316 4.35146C11.7381 3.68759 10.57 3.33325 9.37504 3.33325C7.77269 3.33325 6.23597 3.96978 5.10294 5.10282C3.96991 6.23585 3.33337 7.77257 3.33337 9.37492Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_738_15841">
            <rect width={20} height={20} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    [stroke, height, width]
  )
  return <Icon rev component={() => iconSvg} />
}
