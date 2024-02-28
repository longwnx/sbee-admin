import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useApi, useGetUserInfoQuery } from '@/hooks'

type Arg = {
  storeCode?: string
}

export const useGetListAppByUserQuery = (arg?: Arg) => {
  const { api } = useApi()
  const { data } = useGetUserInfoQuery()

  const fetcher = useCallback(async () => {
    const rs = await api.get(`/app/v1/builder/list/${data?.sub}`, {
      params: {
        ...(arg?.storeCode && { storeCode: arg?.storeCode }),
      },
    })
    return rs.data
  }, [api, arg?.storeCode, data?.sub])

  const fn = useQuery(['useGetListAppByUserQuery', data], fetcher, {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!data?.sub,
  })
  return {
    ...fn,
  }
}
