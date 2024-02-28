import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export const IconBottomBarCatalog: React.FC<Props> = ({ width = 24, height = 24, stroke = '#1D2939' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.75 9.75H5C4.46957 9.75 3.96086 9.53929 3.58579 9.16421C3.21071 8.78914 3 8.28043 3 7.75V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H7.75C8.28043 3 8.78914 3.21071 9.16421 3.58579C9.53929 3.96086 9.75 4.46957 9.75 5V7.75C9.75 8.28043 9.53929 8.78914 9.16421 9.16421C8.78914 9.53929 8.28043 9.75 7.75 9.75Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 9.75H16.25C15.7196 9.75 15.2109 9.53929 14.8358 9.16421C14.4607 8.78914 14.25 8.28043 14.25 7.75V5C14.25 4.46957 14.4607 3.96086 14.8358 3.58579C15.2109 3.21071 15.7196 3 16.25 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V7.75C21 8.28043 20.7893 8.78914 20.4142 9.16421C20.0391 9.53929 19.5304 9.75 19 9.75Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.75 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V16.25C3 15.7196 3.21071 15.2109 3.58579 14.8358C3.96086 14.4607 4.46957 14.25 5 14.25H7.75C8.28043 14.25 8.78914 14.4607 9.16421 14.8358C9.53929 15.2109 9.75 15.7196 9.75 16.25V19C9.75 19.5304 9.53929 20.0391 9.16421 20.4142C8.78914 20.7893 8.28043 21 7.75 21Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 21H16.25C15.7196 21 15.2109 20.7893 14.8358 20.4142C14.4607 20.0391 14.25 19.5304 14.25 19V16.25C14.25 15.7196 14.4607 15.2109 14.8358 14.8358C15.2109 14.4607 15.7196 14.25 16.25 14.25H19C19.5304 14.25 20.0391 14.4607 20.4142 14.8358C20.7893 15.2109 21 15.7196 21 16.25V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    [stroke, height, width]
  )
  return <Icon rev component={() => iconSvg} />
}
