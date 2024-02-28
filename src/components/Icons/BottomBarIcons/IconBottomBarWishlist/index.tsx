import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export const IconBottomBarWishlist: React.FC<Props> = ({ width = 24, height = 24, stroke = '#1D2939' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.8333 13.6667C19.075 12.45 20.3333 10.9917 20.3333 9.08333C20.3333 7.86776 19.8504 6.70197 18.9909 5.84243C18.1314 4.98289 16.9656 4.5 15.75 4.5C14.2833 4.5 13.25 4.91667 12 6.16667C10.75 4.91667 9.71666 4.5 8.24999 4.5C7.03441 4.5 5.86863 4.98289 5.00908 5.84243C4.14954 6.70197 3.66666 7.86776 3.66666 9.08333C3.66666 11 4.91666 12.4583 6.16666 13.6667L12 19.5L17.8333 13.6667Z"
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
