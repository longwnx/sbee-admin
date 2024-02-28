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

export const IconIntegrations: React.FC<Props> = ({ className, width = 24, height = 24, stroke = '#1D2939', onClick }) => {
  const iconSvg = useMemo(
    () => (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21.1667 8.58075V4.87742C21.1667 3.41992 20.58 2.83325 19.1225 2.83325H15.4192C13.9617 2.83325 13.375 3.41992 13.375 4.87742V8.58075C13.375 10.0383 13.9617 10.6249 15.4192 10.6249H19.1225C20.58 10.6249 21.1667 10.0383 21.1667 8.58075Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.625 8.80992V4.64825C10.625 3.35575 10.0384 2.83325 8.58087 2.83325H4.87754C3.42004 2.83325 2.83337 3.35575 2.83337 4.64825V8.80075C2.83337 10.1024 3.42004 10.6158 4.87754 10.6158H8.58087C10.0384 10.6249 10.625 10.1024 10.625 8.80992Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.625 19.1225V15.4192C10.625 13.9617 10.0384 13.375 8.58087 13.375H4.87754C3.42004 13.375 2.83337 13.9617 2.83337 15.4192V19.1225C2.83337 20.58 3.42004 21.1667 4.87754 21.1667H8.58087C10.0384 21.1667 10.625 20.58 10.625 19.1225Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M14.2916 17.0417H19.7916" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17.0416 19.7917V14.2917" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
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
