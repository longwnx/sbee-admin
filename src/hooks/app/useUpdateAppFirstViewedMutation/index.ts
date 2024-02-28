import { useRecoilValue } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

export const useUpdateAppFirstViewedMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)
  const queryClient = useQueryClient()

  const fetcher = async () => {
    const rs = await api.put(`/app/v1/builder/${appKey}/viewed`)
    return rs.data
  }

  const fn = useMutation(['useUpdateAppFirstViewedMutation'], {
    mutationFn: fetcher,
    onSuccess: (rs) => {
      queryClient.refetchQueries(['useGetDetailAppByUserQuery'])
      onSuccess?.(rs)
    },
    onError: (err: any) => {
      onError?.(err)
    },
    retry: false,
  })
  return { ...fn }
}
