import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import layout from '@/hooks/design/layout/layout.json'
import { appKeyState } from '@/recoil'

export const useGetAllLayoutQuery = () => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = useCallback(async () => {
    const rs = await api.get(`/app/v1/builder/${appKey}/layouts`)
    return rs.data
  }, [api, appKey])

  const fn = useQuery({
    queryKey: ['useGetAllLayoutQuery', appKey],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!appKey,
  })
  return {
    ...fn,
    data: { data: layout },
  }
}
