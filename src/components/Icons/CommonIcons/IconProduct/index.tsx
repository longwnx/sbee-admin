import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export const IconProduct: React.FC<Props> = ({ width = 24, height = 24, stroke = '#667085' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_778_9897)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 18H19C19.5304 18 20.0391 17.7893 20.4142 17.4142C20.7893 17.0391 21 16.5304 21 16V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H8C7.46957 3 6.96086 3.21071 6.58579 3.58579C6.21071 3.96086 6 4.46957 6 5V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 13H17.566C17.3933 12.9998 17.2235 13.0446 17.0733 13.1297C16.923 13.2149 16.7975 13.3377 16.709 13.486L16.292 14.182C16.2033 14.3301 16.0777 14.4527 15.9275 14.5379C15.7773 14.623 15.6076 14.6679 15.435 14.668H11.567C11.3943 14.6682 11.2245 14.6234 11.0743 14.5383C10.924 14.4531 10.7985 14.3303 10.71 14.182L10.293 13.486C10.2039 13.3378 10.0779 13.2152 9.92741 13.13C9.7769 13.0449 9.60693 13.0001 9.434 13H6"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 7V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H17"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_778_9897">
            <rect width={24} height={24} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    [height, stroke, width]
  )
  return <Icon rev component={() => iconSvg} />
}
