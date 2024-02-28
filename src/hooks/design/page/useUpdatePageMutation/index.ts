import { App } from 'antd'
import { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState, appPageState, flagChangeAppPageState } from '@/recoil'

export const useUpdatePageMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { message } = App.useApp()
  const appKey = useRecoilValue(appKeyState)
  const queryClient = useQueryClient()
  const appPage = useRecoilValue(appPageState)
  const setFlagChangeAppPage = useSetRecoilState(flagChangeAppPageState)

  const callbackSuccess = useCallback(() => {
    setFlagChangeAppPage(false)
    queryClient.refetchQueries({ queryKey: ['useGetAllPageQuery'] })
    message.success('Your changes have been saved successfully')
  }, [message, queryClient, setFlagChangeAppPage])

  const { api } = useApi()

  const fetcher = async () => {
    const rs = await api.put(`/app/v1/builder/${appKey}/pages/${appPage?.id}`, {
      data: {
        ...appPage,
      },
    })
    return rs.data
  }

  const fn = useMutation({
    mutationKey: ['useUpdatePageMutation'],
    mutationFn: fetcher,
    onSuccess: (rs) => {
      callbackSuccess()
      onSuccess?.(rs)
    },
    onError: (err: any) => {
      onError?.(err)
    },
    retry: false,
  })
  return { ...fn }
}
