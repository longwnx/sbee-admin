'use client'

import { SessionProvider } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { ReactNode, useState } from 'react'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Props = {
  children?: ReactNode
}

const AntdProvider = dynamic(() => import('@/providers/AntdProvider'), { ssr: false })

export const AppProvider: React.FC<Props> = ({ children }) => {
  console.info('v3.0.0')

  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <AntdProvider>
            {/*<PrivateRouter>{children}</PrivateRouter>*/}
            {children}
          </AntdProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </SessionProvider>
  )
}
