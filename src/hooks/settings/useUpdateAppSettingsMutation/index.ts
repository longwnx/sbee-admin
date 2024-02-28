import { App } from 'antd'
import { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/hooks'
import { appKeyState, flagChangeAppSettingsState } from '@/recoil'

type Arg = {
  settings?: {
    deleteAccountRequestReceiver?: string
    allowGuestCheckout?: boolean
    showColorIndicator?: boolean
    l2sp?: {
      enabled?: boolean
      title?: string
      description?: string
      ctaButton?: {
        text?: string
      }
    }
    appName?: string
    appIcon?: string
    profileFormSettings?: {
      type?: 0 | 1
      createUrl?: string
      editUrl?: string
    }
    addressFormSettings?: {
      type?: 0 | 1
      createUrl?: string
      editUrl?: string
    }
    quickAddSettings?: {
      enabled?: boolean
      label?: string
    }
    customerGroup: {
      // New setting
      targetGroup: 1 // Customer Group Id mà Merchant muốn assign
      ignoredGroups: [2, 3, 4] // Customer Group Ids mà Merchant muốn bỏ qua
    }
  }
  coupon?: {
    appCode?: string
    generatedCode?: string
  }
}

export const useUpdateAppSettingsMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const { message } = App.useApp()
  const appKey = useRecoilValue(appKeyState)
  const queryClient = useQueryClient()
  const setFlagChangeAppSettings = useSetRecoilState(flagChangeAppSettingsState)

  const callbackSusscess = useCallback(() => {
    setFlagChangeAppSettings(false)
    message.success('Update settings successfully')
    queryClient.refetchQueries(['useGetAppSettingsQuery', appKey])
    queryClient.refetchQueries(['useGetAppCouponQuery', appKey])
  }, [appKey, message, queryClient, setFlagChangeAppSettings])

  const { api } = useApi()

  const fetcher = async (arg: Arg) => {
    const rs1 = await api.put(`/app/v1/builder/settings/${appKey}`, {
      ...arg?.settings,
    })
    const rs2 = await api.post(`/app/v1/coupons/${appKey}/app-exclusive-codes`, {
      ...arg?.coupon,
    })
    return {
      ...rs1.data,
      ...rs2.data,
    }
  }

  const fn = useMutation(['useUpdateAppSettingsMutation'], {
    mutationFn: fetcher,
    onSuccess: (rs) => {
      callbackSusscess()
      onSuccess?.(rs)
    },
    onError: (err: any) => {
      onError?.(err)
      message.error(err?.response?.data?.error?.message)
    },
    retry: false,
  })
  return { ...fn }
}
