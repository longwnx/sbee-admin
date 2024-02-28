import { useRecoilValue } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

export const useReactiveSubscriptionMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { api } = useApi()
  const queryClient = useQueryClient()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = async () => {
    const rs = await api.put(`/app/v1/subscriptions/${appKey}/reactivate`)
    return rs.data
  }

  const fn = useMutation({
    mutationKey: ['useReactiveSubscriptionMutation'],
    mutationFn: fetcher,
    onSuccess: (rs) => {
      queryClient.refetchQueries({ queryKey: ['useGetSubscriptionByAppQuery'] })
      onSuccess?.(rs)
    },
    onError: (err: any) => {
      onError?.(err)
    },
    retry: false,
  })
  return { ...fn }
}
