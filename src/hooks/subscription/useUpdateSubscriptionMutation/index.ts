import { useMutation } from '@tanstack/react-query'
import { useApi } from '@/hooks'

type Arg = {
  planCode?: string
  subscriptionId?: string
}

export const useUpdateSubscriptionMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { api } = useApi()

  const fetcher = async (arg: Arg) => {
    const rs = await api.put(`/app/v1/subscriptions`, {
      ...arg,
      redirectUrl: `${window.location.origin}/pricing`,
    })
    return rs.data
  }

  const fn = useMutation(['useUpdateSubscriptionMutation'], {
    mutationFn: fetcher,
    onSuccess: (rs) => {
      window.location.href = rs?.data?.url
      onSuccess?.(rs)
    },
    onError: (err: any) => {
      onError?.(err)
    },
    retry: false,
  })
  return { ...fn }
}
