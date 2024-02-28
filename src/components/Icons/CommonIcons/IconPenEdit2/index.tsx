import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export const IconPenEdit2: React.FC<Props> = ({ width = 24, height = 24, stroke = '#1D2939' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_913_14542)">
          <path
            d="M17.5 10V13.3333C17.5 14.4384 17.061 15.4982 16.2796 16.2796C15.4982 17.061 14.4384 17.5 13.3333 17.5H6.66667C5.5616 17.5 4.50179 17.061 3.72039 16.2796C2.93899 15.4982 2.5 14.4384 2.5 13.3333V6.66667C2.5 5.5616 2.93899 4.50179 3.72039 3.72039C4.50179 2.93899 5.5616 2.5 6.66667 2.5H10"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.4833 3.01656C14.6475 2.85256 14.8424 2.72253 15.0569 2.6339C15.2714 2.54527 15.5013 2.49977 15.7334 2.5C15.9655 2.50023 16.1952 2.54619 16.4096 2.63525C16.6239 2.72432 16.8185 2.85473 16.9824 3.01906C17.1467 3.18314 17.2771 3.37799 17.366 3.59247C17.4549 3.80696 17.5007 4.03687 17.5007 4.26906C17.5007 4.50124 17.4549 4.73115 17.366 4.94564C17.2771 5.16013 17.1467 5.35498 16.9824 5.51906C16.9816 5.51906 13.5016 8.99739 12.2991 10.2007C12.0368 10.4631 11.6941 10.6301 11.3258 10.6749L10.0941 10.8266C9.96817 10.842 9.84036 10.8283 9.72058 10.7864C9.60079 10.7445 9.49226 10.6756 9.40339 10.5851C9.31451 10.4945 9.24768 10.3847 9.20806 10.2641C9.16845 10.1436 9.15712 10.0155 9.17495 9.88989L9.35745 8.61406C9.40679 8.2586 9.57062 7.9289 9.82412 7.67489L14.4833 3.01656Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_913_14542">
            <rect width={20} height={20} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    [height, stroke, width]
  )
  return <Icon rev component={() => iconSvg} />
}
