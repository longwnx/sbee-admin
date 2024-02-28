import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

export const useGetListAppUserQuery = () => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = useCallback(async () => {
    const rs = await api.get(`/app/v1/builder/${appKey}/users`)
    return rs.data
  }, [api, appKey])

  const fn = useQuery(['useGetListAppUserQuery', appKey], fetcher, {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!appKey,
  })
  return {
    ...fn,
  }
}
