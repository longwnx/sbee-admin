import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

export const useGetAllBrandQuery = () => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = useCallback(async () => {
    const rs = await api.get(`/catalog/v1/app/${appKey}/all-brands`)
    return rs.data
  }, [api, appKey])

  const fn = useQuery({
    queryKey: ['useGetAllBrandQuery', appKey],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!appKey,
  })
  return {
    ...fn,
  }
}
