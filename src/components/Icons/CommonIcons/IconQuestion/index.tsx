import { useMemo } from 'react'
import Icon from '@ant-design/icons'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export const IconQuestion: React.FC<Props> = ({ width = 24, height = 24, stroke = '#667085' }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 12.711L13.327 11.974C13.6523 11.7933 13.9233 11.5289 14.112 11.2082C14.3006 10.8874 14.4001 10.5221 14.4 10.15C14.3621 9.54476 14.0864 8.97905 13.6331 8.57627C13.1797 8.1735 12.5855 7.96635 11.98 8C11.4343 7.97747 10.8979 8.14619 10.4634 8.47701C10.0289 8.80784 9.72349 9.28001 9.60001 9.812"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.1 15.9C12.1 15.9198 12.0941 15.9392 12.0831 15.9556C12.0722 15.9721 12.0565 15.9849 12.0383 15.9924C12.02 16 11.9999 16.002 11.9805 15.9981C11.9611 15.9943 11.9433 15.9847 11.9293 15.9708C11.9153 15.9568 11.9058 15.939 11.9019 15.9196C11.8981 15.9002 11.9 15.8801 11.9076 15.8618C11.9152 15.8435 11.928 15.8279 11.9444 15.8169C11.9609 15.8059 11.9802 15.8 12 15.8C12.0265 15.8 12.052 15.8106 12.0707 15.8293C12.0895 15.8481 12.1 15.8735 12.1 15.9Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 3"
        />
      </svg>
    ),
    [height, stroke, width]
  )
  return <Icon rev component={() => iconSvg} />
}
