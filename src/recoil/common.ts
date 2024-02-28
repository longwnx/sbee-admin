import { atom } from 'recoil'

export const appKeyState = atom({
  key: 'appKey',
  default: '',
})

export const collapsedState = atom({
  key: 'collapsed',
  default: false,
})

export const isVisibleLeftContentState = atom({
  key: 'isVisibleLeftContent',
  default: false,
})
