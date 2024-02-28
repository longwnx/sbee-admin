import { App } from 'antd'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  username?: string
  id?: string
  fileName?: string
}

export const useDeleteMediaLibraryMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const appKey = useRecoilValue(appKeyState)

  const callbackSusscess = useCallback(() => {
    message.destroy()
    message.success('Delete successfully')
    queryClient.refetchQueries(['useGetMediaLibraryQuery'])
  }, [message, queryClient])

  const { api } = useApi()

  const fetcher = async (arg: Arg) => {
    const rs = await api.delete(`/media/v1/files?username=${arg?.username}`, {
      data: {
        id: arg?.id,
        fileName: arg?.fileName,
      },
      headers: {
        JM360_APP_KEY: appKey,
      },
    })
    return rs.data
  }
  const fn = useMutation(['useDeleteMediaLibraryMutation'], {
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
