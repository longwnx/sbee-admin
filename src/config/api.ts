import { env } from './env'
import axios from 'axios'
import { getAccessToken, getAppKey } from '@/utils'

const token = getAccessToken()
const appKey = getAppKey()

const instance = axios.create({
  baseURL: env.APP_API,
  headers: {
    authorization: `Bearer ${token}`,
    JM360_APP_KEY: appKey,
  },
})

export const api = instance
