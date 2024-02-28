import { App } from 'antd'
import { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState, appPageState, flagChangeAppPageState, flagChangeLayoutState, layoutState } from '@/recoil'

export const usePublishAppMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { message } = App.useApp()
  const appKey = useRecoilValue(appKeyState)
  const appPage = useRecoilValue(appPageState)
  const layout = useRecoilValue(layoutState)
  const setFlagChangeAppPage = useSetRecoilState(flagChangeAppPageState)
  const setFlagChangeLayout = useSetRecoilState(flagChangeLayoutState)

  const callbackSusscess = useCallback(() => {
    setFlagChangeAppPage(false)
    setFlagChangeLayout(false)
    message.success('Published successfully! Please refresh your app to see the latest design.')
  }, [message, setFlagChangeAppPage, setFlagChangeLayout])

  const { api } = useApi()

  const fetcher = async () => {
    appKey &&
      appPage &&
      (await api.put(`/app/v1/builder/${appKey}/pages/${appPage?.id}`, {
        data: {
          ...appPage,
        },
      }))

    appKey &&
      layout &&
      (await api.put(`/app/v1/builder/${appKey}/layouts/${layout?.id}`, {
        data: {
          ...layout,
        },
      }))

    const rs = await api.post(`/app/v1/builder/publish`, {
      appKey,
    })
    return rs.data
  }

  const fn = useMutation({
    mutationKey: ['usePublishAppMutation'],
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
