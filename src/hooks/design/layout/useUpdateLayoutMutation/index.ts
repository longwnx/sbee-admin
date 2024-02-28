import { App } from 'antd'
import { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState, flagChangeLayoutState, layoutState } from '@/recoil'

export const useUpdateLayoutMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { message } = App.useApp()
  const appKey = useRecoilValue(appKeyState)
  const layout = useRecoilValue(layoutState)
  const setFlagChangeLayout = useSetRecoilState(flagChangeLayoutState)

  const callbackSusscess = useCallback(() => {
    setFlagChangeLayout(false)
    message.success('Your changes have been saved successfully')
  }, [message, setFlagChangeLayout])

  const { api } = useApi()

  const fetcher = async () => {
    const rs = await api.put(`/app/v1/builder/${appKey}/layouts/${layout?.id}`, {
      data: {
        ...layout,
      },
    })
    return rs.data
  }

  const fn = useMutation(['useUpdateLayoutMutation'], {
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
