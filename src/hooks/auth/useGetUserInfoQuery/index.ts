import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { env } from '@/config'
import { useApi } from '@/hooks'

export const useGetUserInfoQuery = () => {
  const { api } = useApi(env.APP_KEYCLOAK_API)

  const fetcher = useCallback(async () => {
    const {
      data,
    }: {
      data: {
        sub: string
        email_verified: boolean
        name: string
        preferred_username: string
        locale: string
        given_name: string
        family_name: string
        email: string
      }
    } = await api.get(`/realms/bigcommerce/protocol/openid-connect/userinfo`)
    return data
  }, [api])

  const fn = useQuery(['useGetUserInfoQuery'], fetcher, {
    refetchOnWindowFocus: false,
    retry: false,
  })
  return {
    ...fn,
  }
}
