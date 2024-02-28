import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'

export const useGetListIconQuery = () => {
  const { api } = useApi()
  const fetcher = useCallback(async () => {
    const rs = await api.get('/app/v1/builder/icon-templates')
    return rs.data
  }, [api])

  const fn = useQuery({
    queryKey: ['useGetListIconQuery'],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: false,
  })
  return {
    ...fn,
  }
}
