import { App } from 'antd'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  data?: any
  id?: string
}

export const useUpdateUserMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { message } = App.useApp()
  const appKey = useRecoilValue(appKeyState)
  const queryClient = useQueryClient()

  const callbackSusscess = useCallback(() => {
    message.success('User updated successfully')
    queryClient.refetchQueries(['useGetListAppUserQuery'])
  }, [message, queryClient])

  const { api } = useApi()

  const fetcher = async (arg: Arg) => {
    const rs = await api.put(`/app/v1/builder/${appKey}/users/${arg?.id}/permissions`, {
      ...arg?.data,
    })
    return rs.data
  }

  const fn = useMutation(['useUpdateUserMutation'], {
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
