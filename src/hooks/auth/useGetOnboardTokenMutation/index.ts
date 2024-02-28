import { App } from 'antd'
import axios from 'axios'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { useMutation } from '@tanstack/react-query'
import { env } from '@/config'
import { clearAll, setAccessToken, setRefreshToken, setStoreCode, setThirtParty } from '@/utils'

export const useGetOnboardTokenMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const storeCode = searchParams?.get('storeCode')

  const { message } = App.useApp()
  const token = useMemo(() => params?.slug, [params?.slug])

  const fetcher = async () => {
    const rs = await axios.post(`${env.APP_API}/onboard/v1/token/exchange`, {
      token,
    })
    return rs.data
  }

  const fn = useMutation({
    mutationKey: ['useGetOnboardTokenMutation'],
    mutationFn: fetcher,
    onSuccess: (rs) => {
      setAccessToken(rs?.data?.access_token)
      setRefreshToken(rs?.data?.refresh_token)
      setThirtParty('true')
      storeCode && setStoreCode(storeCode as string)
      onSuccess?.(rs)
      setTimeout(() => {
        window.location.href = `/auth/applications?storeCode=${storeCode}`
      }, 1000)
    },
    onError: (err: any) => {
      if (err?.response) {
        clearAll()
        router.push('/auth/login')
        message.destroy()
        // message.error(err?.response?.data?.error?.message)
      }
      onError?.(err)
    },
    retry: false,
  })
  return { ...fn }
}
