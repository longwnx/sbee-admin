import { App } from 'antd'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState } from '@/recoil'

type Arg = {
  name?: string
  contents: {
    language?: string
    title: string
    body: string
  }[]
  data?: {}
  image?: string
  deliveryTime?: Date
  devices?: string
  segments?: string
}

export const useSendPushMessageMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { message } = App.useApp()
  const appKey = useRecoilValue(appKeyState)

  const callbackSusscess = useCallback(() => {
    message.success('Send push message successfully')
  }, [message])

  const { api } = useApi()

  const fetcher = async (arg: Arg) => {
    const rs = await api.post(`/app/v1/builder/${appKey}/notifications/message`, {
      ...arg,
      appKey,
    })
    return rs.data
  }
  const fn = useMutation(['useSendPushMessageMutation'], {
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
