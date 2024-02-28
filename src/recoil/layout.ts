import { atom } from 'recoil'

export const layoutState = atom<UiLayout | undefined | null>({
  key: 'layout',
  default: undefined,
})

export const currentIndexBottomTabState = atom<number | undefined | null>({
  key: 'currentIndexBottomTab',
  default: undefined,
})
