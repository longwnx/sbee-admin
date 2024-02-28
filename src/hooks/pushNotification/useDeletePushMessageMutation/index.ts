import { App } from 'antd'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  id?: string
}

export const useDeletePushMessageMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const appKey = useRecoilValue(appKeyState)

  const callbackSusscess = useCallback(() => {
    message.success('Delete message successfully')
    queryClient.refetchQueries(['useGetListPushMessageQuery'])
  }, [message, queryClient])

  const { api } = useApi()

  const fetcher = async (arg: Arg) => {
    const rs = await api.delete(`/app/v1/builder/${appKey}/notifications/message/${arg?.id}`)
    return rs.data
  }
  const fn = useMutation(['useDeletePushMessageMutation'], {
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
