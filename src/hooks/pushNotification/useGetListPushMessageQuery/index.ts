import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  size: number
  page: number
  scheduled?: boolean
  query?: string
}

export const useGetListPushMessageQuery = (arg: Arg) => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = useCallback(async () => {
    const rs = await api.get(`/app/v1/builder/${appKey}/notifications/message`, {
      params: {
        ...arg,
        query: arg.query || '',
        scheduled: arg.scheduled ? true : false,
      },
    })
    return rs.data
  }, [api, appKey, arg])

  const fn = useQuery({
    queryKey: ['useGetListPushMessageQuery', appKey, arg],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!appKey,
  })
  return {
    ...fn,
  }
}
