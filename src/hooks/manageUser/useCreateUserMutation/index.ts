import { App } from 'antd'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  data?: any
}

export const useCreateUserMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const router = useRouter()
  const { message } = App.useApp()
  const appKey = useRecoilValue(appKeyState)
  const queryClient = useQueryClient()

  const callbackSusscess = useCallback(() => {
    message.success('User created successfully')
    queryClient.refetchQueries(['useGetListAppUserQuery'])
    router.push(`/manage-user`)
  }, [message, queryClient, router])

  const { api } = useApi()

  const fetcher = async (arg: Arg) => {
    const rs = await api.post(`/app/v1/builder/${appKey}/users`, {
      ...arg?.data,
    })
    return rs.data
  }

  const fn = useMutation(['useCreateUserMutation'], {
    mutationFn: fetcher,
    onSuccess: (rs) => {
      callbackSusscess()
      onSuccess?.(rs)
    },
    onError: (err: any) => {
      onError?.(err)
    },
    retry: false,
  })
  return { ...fn }
}
