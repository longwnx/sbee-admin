import { App } from 'antd'
import { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState, flagChangeAppStoreInfoState } from '@/recoil'

type Arg = {
  data?: any
}

export const useUpdatePublishInfoMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { message } = App.useApp()
  const appKey = useRecoilValue(appKeyState)
  const queryClient = useQueryClient()
  const setFlagChangeAppStoreInfo = useSetRecoilState(flagChangeAppStoreInfoState)

  const callbackSusscess = useCallback(() => {
    setFlagChangeAppStoreInfo(false)
    message.success('Your changes have been saved successfully')
    queryClient.refetchQueries(['useGetDetailIntegrationQuery', appKey])
  }, [appKey, message, queryClient, setFlagChangeAppStoreInfo])

  const { api } = useApi()

  const fetcher = async (arg: Arg) => {
    const rs = await api.put(`/app/v1/builder/${appKey}/publish/info`, {
      ...arg?.data,
    })
    return rs.data
  }

  const fn = useMutation(['useUpdatePublishInfoMutation'], {
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
