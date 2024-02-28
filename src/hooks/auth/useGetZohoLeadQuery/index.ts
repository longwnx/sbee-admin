import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { useApi, useGetUserInfoQuery } from '@/hooks'
import { appKeyState } from '@/recoil'

export const useGetZohoLeadQuery = () => {
  const { api } = useApi()
  const { data } = useGetUserInfoQuery()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = useCallback(async () => {
    const rs = await api.get(`/app/v1/lead/${appKey}`, {
      params: {
        email: data?.email,
      },
    })
    return rs.data
  }, [api, appKey, data?.email])

  const fn = useQuery({
    queryKey: ['useGetZohoLeadQuery', data, appKey],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!data?.email && !!appKey,
  })
  return {
    ...fn,
  }
}
