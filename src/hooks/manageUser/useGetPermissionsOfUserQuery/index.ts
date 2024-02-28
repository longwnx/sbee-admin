import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  id?: string
}

export const useGetPermissionsOfUserQuery = (arg: Arg) => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = useCallback(async () => {
    const rs = await api.get(`/app/v1/builder/${appKey}/users/${arg?.id}`)
    return rs.data
  }, [api, appKey, arg?.id])

  const fn = useQuery({
    queryKey: ['useGetPermissionsOfUserQuery', appKey, arg?.id],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!appKey && !!arg?.id,
  })
  return {
    ...fn,
  }
}
