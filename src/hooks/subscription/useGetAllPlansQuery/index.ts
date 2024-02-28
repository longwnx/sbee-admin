import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'

export const useGetAllPlansQuery = () => {
  const { api } = useApi()
  const fetcher = useCallback(async () => {
    const rs = await api.get(`/app/v1/subscriptions/plans?page=0&size=100`)
    return rs.data
  }, [api])

  const fn = useQuery(['useGetAllPlansQuery'], fetcher, {
    refetchOnWindowFocus: false,
    retry: false,
  })
  return {
    ...fn,
  }
}
