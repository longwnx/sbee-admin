'use client'

import axios from 'axios'
import qs from 'qs'
import { env } from '@/config'
import { useLogout } from '@/hooks'
import { getAccessToken, getAppKey, getRefreshToken, setAccessToken, setRefreshToken } from '@/utils'

export const useApi = (url?: string) => {
  const { onLogout } = useLogout()

  const token = getAccessToken()
  const appKey = getAppKey()

  const api = axios.create({
    baseURL: url || env.APP_API,
    headers: {
      authorization: `Bearer ${token}`,
      JM360_APP_KEY: appKey,
    },
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config
      const refreshToken = getRefreshToken()
      try {
        const res = await axios(`${env.APP_KEYCLOAK_API}/realms/bigcommerce/protocol/openid-connect/token`, {
          data: qs.stringify({
            grant_type: 'refresh_token',
            client_id: env.APP_KEYCLOAK_CLIENT_ID,
            client_secret: env.APP_KEYCLOAK_CLIENT_SECRET,
            refresh_token: refreshToken,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
        })
        setAccessToken(res.data?.access_token)
        setRefreshToken(res.data?.refresh_token)
        api.defaults.headers.common['authorization'] = `Bearer ${res.data?.access_token}`
        originalRequest.headers['authorization'] = `Bearer ${res.data?.access_token}`
        return axios(originalRequest)
      } catch (error) {
        console.log('error', error)
        onLogout()
      }
    }
  )

  return { api }
}
