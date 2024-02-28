import { ACCESS_TOKEN, APP_KEY, CURRENCY_CODE, IMPERSONATED, REFRESH_TOKEN, STORE_CODE, THIRT_PARTY } from '@/utils'

export const setItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value)
  }
}

export const getItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key) || ''
  }
  return ''
}

export const setAccessToken = (value: string) => {
  setItem(ACCESS_TOKEN, value)
}

export const getAccessToken = () => getItem(ACCESS_TOKEN)
export const getAppKey = () => getItem(APP_KEY)

export const setRefreshToken = (value: string) => {
  setItem(REFRESH_TOKEN, value)
}

export const getRefreshToken = () => getItem(REFRESH_TOKEN)

export const setThirtParty = (value: string) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(THIRT_PARTY, value)
  }
}

export const getThirtParty = () => {
  if (typeof window !== 'undefined') {
    return window.sessionStorage.getItem(THIRT_PARTY) || ''
  }
  return ''
}

export const setImpersonated = (value: string) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(IMPERSONATED, value)
  }
}

export const getImpersonated = () => {
  if (typeof window !== 'undefined') {
    return window.sessionStorage.getItem(IMPERSONATED) || ''
  }
  return ''
}

export const getStoreCode = () => getItem(STORE_CODE)
export const setStoreCode = (value: string) => setItem(STORE_CODE, value)

export const getCurrencyCode = () => getItem(CURRENCY_CODE)
export const setCurrencyCode = (value: string) => setItem(CURRENCY_CODE, value)

export const clearAll = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(ACCESS_TOKEN)
    window.localStorage.removeItem(REFRESH_TOKEN)
    window.localStorage.removeItem(APP_KEY)
    window.sessionStorage.removeItem(THIRT_PARTY)
  }
}
