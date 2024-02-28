'use client'

import { Spin } from 'antd'

type Props = {
  isLoading?: boolean
  children?: React.ReactNode
}

export const Loading: React.FC<Props> = ({ isLoading, children }) => {
  return !isLoading ? (
    <>{children}</>
  ) : (
    <div className="flex items-center justify-center w-full py-6">
      <Spin spinning />
    </div>
  )
}
