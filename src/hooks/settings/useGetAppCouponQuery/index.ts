import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

export const useGetAppCouponQuery = () => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = useCallback(async () => {
    const rs = await api.get(`/app/v1/coupons/${appKey}/app-exclusive-codes`)
    return rs.data
  }, [api, appKey])

  const fn = useQuery(['useGetAppCouponQuery', appKey], fetcher, {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!appKey,
  })
  return {
    ...fn,
  }
}
