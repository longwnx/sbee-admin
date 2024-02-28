import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

export const useGetPublishInfoQuery = () => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = useCallback(async () => {
    const rs = await api.get(`/app/v1/builder/${appKey}/publish/info`)
    return rs.data
  }, [api, appKey])

  const fn = useQuery(['useGetPublishInfoQuery', appKey], fetcher, {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!appKey,
  })
  return {
    ...fn,
  }
}
