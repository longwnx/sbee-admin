'use client'

// import { usePathname } from 'next/navigation'
// import { useEffect } from 'react'
// import { useLogout } from '@/hooks'
// import { getAccessToken } from '@/utils'

type Props = {
  children?: React.ReactNode
}

// const authRoutes = ['/auth/login', '/auth/token/[slug]', '/auth/impersonated-token/[appKey]/[slug]']

export const PrivateRouter: React.FC<Props> = ({ children }) => {
  // const pathname = usePathname()
  // const token = getAccessToken()
  // const { onLogout } = useLogout()

  // useEffect(() => {
  //   if (authRoutes[0] !== pathname && authRoutes[1] !== pathname && authRoutes[2] !== pathname) {
  //     if (!token) {
  //       onLogout()
  //     }
  //   }
  // }, [onLogout, pathname, token])

  return <>{children}</>
}
