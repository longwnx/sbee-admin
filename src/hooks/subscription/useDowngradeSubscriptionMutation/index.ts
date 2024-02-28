import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'

type Arg = {
  planCode?: string
  subscriptionId?: string
}

export const useDowngradeSubscriptionMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { api } = useApi()
  const queryClient = useQueryClient()

  const fetcher = async (arg: Arg) => {
    const rs = await api.put(`/app/v1/subscriptions/downgrade`, {
      ...arg,
    })
    return rs.data
  }

  const fn = useMutation({
    mutationKey: ['useDowngradeSubscriptionMutation'],
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
