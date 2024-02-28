import { App } from 'antd'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useSetRecoilState } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { env } from '@/config'
import { appKeyState } from '@/recoil'
import { APP_KEY, clearAll, setAccessToken, setImpersonated, setThirtParty } from '@/utils'

export const useGetImpersonatedTokenMutation = (
  onSuccess?: ((arg: any) => void) | undefined,
  onError?: ((arg: any) => void) | undefined
) => {
  const router = useRouter()
  const params = useParams()
  const { message } = App.useApp()
  const setAppKey = useSetRecoilState(appKeyState)

  const fetcher = async () => {
    const rs = await axios.get(`${env.APP_API}/app/v1/builder/exchange-token?jmToken=${params?.slug}`)
    return rs.data
  }

  const fn = useMutation(['useGetImpersonatedTokenMutation'], {
    mutationFn: fetcher,
    onSuccess: (rs) => {
      setAccessToken(rs?.data)
      setAppKey(params?.appKey as string)
      localStorage.setItem(APP_KEY, params?.appKey as string)
      setThirtParty('true')
      setImpersonated('true')
      onSuccess?.(rs)
      setTimeout(() => {
        window.location.href = `/`
      }, 1000)
    },
    onError: (err: any) => {
      if (err?.response) {
        clearAll()
        router.push('/auth/login')
        message.destroy()
      }
      onError?.(err)
    },
    retry: false,
  })
  return { ...fn }
}
