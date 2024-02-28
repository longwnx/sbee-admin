import { isEmpty } from 'lodash'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  size: number
  page: number
}

export const useGetMediaLibraryQuery = (arg: Arg) => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)
  const fetcher = useCallback(async () => {
    const rs = await api.get(`/media/v1/files/list?size=${arg.size}&page=${arg.page}`, {
      headers: {
        JM360_APP_KEY: appKey,
      },
    })
    return rs.data
  }, [api, appKey, arg.page, arg.size])

  const fn = useQuery(['useGetMediaLibraryQuery', arg, appKey], fetcher, {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !isEmpty(appKey),
  })
  return {
    ...fn,
  }
}
