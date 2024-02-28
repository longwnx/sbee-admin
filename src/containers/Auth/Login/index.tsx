'use client'

import { Spin } from 'antd'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export const Login = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      signIn('google', {
        // redirect: false,
        // phone: formValues.phone,
        // password: formValues.password,
        // callbackUrl,
      })
      // setAccessToken(session?.accessToken || '')
      // setRefreshToken(session?.refreshToken || '')
      // setTimeout(() => {
      //   window.location.href = '/auth/applications'
      // }, 2000)
      return
    }
    if (status === 'unauthenticated') {
      signIn('google', {
        // redirect: false,
        // phone: formValues.phone,
        // password: formValues.password,
        // callbackUrl,
      })
    }
  }, [session, status])

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spin spinning />
    </div>
  )
}
