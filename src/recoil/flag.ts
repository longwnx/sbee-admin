import { atom } from 'recoil'

export const flagChangeAppPageState = atom({
  key: 'flagChangeAppPage',
  default: false,
})

export const flagChangeLayoutState = atom({
  key: 'flagChangeLayout',
  default: false,
})

export const flagChangeAppSettingsState = atom({
  key: 'flagChangeAppSettings',
  default: false,
})

export const flagChangeAppStoreInfoState = atom({
  key: 'flagChangeAppStoreInfo',
  default: false,
})
