import { App } from 'antd'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  id?: string
}

export const useDeletePageMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { message } = App.useApp()
  const appKey = useRecoilValue(appKeyState)
  const queryClient = useQueryClient()

  const callbackSusscess = useCallback(() => {
    message.success('Delete page successfully')
    queryClient.refetchQueries({ queryKey: ['useGetAllPageQuery'] })
  }, [message, queryClient])

  const { api } = useApi()

  const fetcher = async (arg: Arg) => {
    const rs = await api.delete(`/app/v1/builder/${appKey}/pages/${arg?.id}`)
    return rs.data
  }

  const fn = useMutation({
    mutationKey: ['useDeletePageMutation'],
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
