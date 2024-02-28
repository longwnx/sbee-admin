import { useRecoilValue } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  annualOnlineRevenue?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
}

export const useCreateZohoUserMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = async (arg: Arg) => {
    const rs = await api.post(`/app/v1/lead/${appKey}`, {
      ...arg,
    })
    return rs.data
  }

  const fn = useMutation(['useCreateZohoUserMutation'], {
    mutationFn: fetcher,
    onSuccess: (rs) => {
      onSuccess?.(rs)
    },
    onError: (err: any) => {
      onError?.(err)
    },
    retry: false,
  })
  return { ...fn }
}
