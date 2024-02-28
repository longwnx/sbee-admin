import { useParams } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  formFields?: {
    label?: string
    key?: string
    value?: string
  }[]
  active?: boolean
}

export const useUpdateIntegrationMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { api } = useApi()
  const appKey = useRecoilValue(appKeyState)
  const params = useParams()
  const queryClient = useQueryClient()

  const fetcher = async (arg: Arg) => {
    const rs = await api.put(`/app/v1/builder/${appKey}/integrations/${params?.slug}`, {
      ...arg,
    })
    return rs.data
  }

  const fn = useMutation(['useUpdateIntegrationMutation'], {
    mutationFn: fetcher,
    onSuccess: (rs) => {
      queryClient.refetchQueries(['useGetDetailIntegrationQuery', appKey, params?.slug])
      onSuccess?.(rs)
    },
    onError: (err: any) => {
      if (err?.response) {
        // message.error(err?.response?.data?.error?.message)
      }
      onError?.(err)
    },
    retry: false,
  })
  return { ...fn }
}
