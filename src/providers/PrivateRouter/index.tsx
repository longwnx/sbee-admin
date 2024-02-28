'use client'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useLogout } from '@/hooks'
import { getAccessToken } from '@/utils'

type Props = {
  children?: React.ReactNode
}

const authRoutes = ['/auth/login', '/auth/token/[slug]', '/auth/impersonated-token/[appKey]/[slug]']

export const PrivateRouter: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const token = getAccessToken()
  const { onLogout } = useLogout()

  const { data: session, status } = useSession()

  console.log('statys', status)

  useEffect(() => {
    if (authRoutes[0] !== pathname && authRoutes[1] !== pathname && authRoutes[2] !== pathname) {
      if (!token) {
        // onLogout()
        router.push('/auth/login')
      }
    }
  }, [onLogout, pathname, token])

  return <>{children}</>
}
