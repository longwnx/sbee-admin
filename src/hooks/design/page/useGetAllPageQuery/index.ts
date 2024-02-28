import pages from '../pages.json'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  appKey?: string
}

export const useGetAllPageQuery = (arg?: Arg) => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = useCallback(async () => {
    const rs = await api.get(`/app/v1/builder/${arg?.appKey || appKey}/pages`)
    return rs.data
  }, [api, appKey, arg?.appKey])

  const fn = useQuery({
    queryKey: ['useGetAllPageQuery', appKey],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!appKey || !!arg?.appKey,
  })
  return {
    ...fn,
    data: { data: pages },
  }
}
