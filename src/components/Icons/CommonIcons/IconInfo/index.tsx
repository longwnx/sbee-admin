import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export const IconInfo: React.FC<Props> = ({ width = 24, height = 24, stroke = '#F04438' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_717_7150)">
          <path
            d="M8 14C6.4087 14 4.88258 13.3679 3.75736 12.2426C2.63214 11.1174 2 9.5913 2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.5913 2 11.1174 2.63214 12.2426 3.75736C13.3679 4.88258 14 6.4087 14 8C14 9.5913 13.3679 11.1174 12.2426 12.2426C11.1174 13.3679 9.5913 14 8 14Z"
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8.00004 11.3333V8H7.33337" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M7.83263 5.33333C7.79969 5.33346 7.76753 5.34335 7.74021 5.36174C7.71289 5.38013 7.69163 5.40621 7.67912 5.43668C7.66661 5.46714 7.6634 5.50063 7.66991 5.53292C7.67642 5.5652 7.69234 5.59484 7.71568 5.61808C7.73901 5.64132 7.76871 5.65713 7.80102 5.66351C7.83333 5.66988 7.86681 5.66655 7.89723 5.65391C7.92764 5.64128 7.95363 5.61992 7.97192 5.59252C7.9902 5.56513 7.99996 5.53293 7.99996 5.5C7.99996 5.47805 7.99563 5.45633 7.98721 5.43606C7.97879 5.4158 7.96645 5.39739 7.95091 5.38191C7.93536 5.36642 7.91691 5.35416 7.89661 5.34582C7.87631 5.33749 7.85457 5.33324 7.83263 5.33333Z"
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="3 3"
          />
        </g>
        <defs>
          <clipPath id="clip0_717_7150">
            <rect width={16} height={16} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    [height, stroke, width]
  )
  return <Icon rev component={() => iconSvg} />
}
