import { App } from 'antd'
import { useRecoilValue } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  username?: string
  formdata?: any
}

export const useUploadMediaLibraryMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { api } = useApi()
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  const appKey = useRecoilValue(appKeyState)

  const fetcher = async (arg: Arg) => {
    const rs = await api.post(`/media/v1/files?username=${arg?.username}`, arg?.formdata, {
      headers: {
        JM360_APP_KEY: appKey,
        'Content-Type': 'multipart/form-data',
      },
    })
    return rs.data
  }

  const fn = useMutation({
    mutationKey: ['useUploadMediaLibraryMutation'],
    mutationFn: fetcher,
    onSuccess: (rs) => {
      message.destroy()
      queryClient.refetchQueries({ queryKey: ['useGetMediaLibraryQuery'] })
      onSuccess?.(rs)
    },
    onError: (err: any) => {
      onError?.(err)
    },
    retry: false,
  })
  return { ...fn }
}
