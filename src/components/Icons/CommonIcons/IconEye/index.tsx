import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export const IconEye: React.FC<Props> = ({ width = 24, height = 24, stroke = '#1D2939' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_913_14801)">
          <path
            d="M2.59836 10.3895C2.53396 10.2697 2.50024 10.1359 2.50024 9.99991C2.50024 9.86393 2.53396 9.73008 2.59836 9.61033C4.17503 6.69449 7.08753 4.16699 10 4.16699C12.9125 4.16699 15.825 6.69449 17.4017 9.61116C17.4661 9.73091 17.4998 9.86477 17.4998 10.0007C17.4998 10.1367 17.4661 10.2706 17.4017 10.3903C15.825 13.3062 12.9125 15.8337 10 15.8337C7.08753 15.8337 4.17503 13.3062 2.59836 10.3895Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.7674 8.23264C12.0102 8.46226 12.2044 8.73822 12.3387 9.04421C12.473 9.35019 12.5446 9.67999 12.5492 10.0141C12.5539 10.3482 12.4915 10.6799 12.3658 10.9895C12.24 11.2991 12.0535 11.5804 11.8172 11.8166C11.581 12.0529 11.2997 12.2394 10.9901 12.3652C10.6805 12.4909 10.3488 12.5533 10.0147 12.5486C9.68058 12.544 9.35078 12.4724 9.0448 12.3381C8.73881 12.2038 8.46285 12.0096 8.23323 11.7668C7.79163 11.2929 7.55122 10.6661 7.56265 10.0184C7.57407 9.37073 7.83645 8.75278 8.29449 8.29473C8.75253 7.83669 9.37048 7.57432 10.0182 7.56289C10.6658 7.55146 11.2926 7.79187 11.7666 8.23347"
            stroke={stroke}
            strokeWidth="1.429"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_913_14801">
            <rect width={20} height={20} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    [height, stroke, width]
  )
  return <Icon component={() => iconSvg} />
}
