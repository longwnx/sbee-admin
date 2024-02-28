import { useCallback } from 'react'
import { clearAll } from '@/utils'

export const useLogout = () => {
  const onLogout = useCallback(() => {
    clearAll()
    setTimeout(() => {
      // signOut({
      //   callbackUrl: '/auth/login',
      // })
    }, 100)
  }, [])
  return { onLogout }
}
