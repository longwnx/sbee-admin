import { useParams } from 'next/navigation'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

export const useGetDetailIntegrationQuery = () => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)
  const params = useParams()

  const fetcher = useCallback(async () => {
    const rs = await api.get(`/app/v1/builder/${appKey}/integrations/${params?.slug}`)
    return rs.data
  }, [api, appKey, params?.slug])

  const fn = useQuery({
    queryKey: ['useGetDetailIntegrationQuery', appKey, params?.slug],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!appKey && !!params?.slug,
  })
  return {
    ...fn,
  }
}
