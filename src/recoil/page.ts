import { atom } from 'recoil'

export const appPageState = atom<AppPage | undefined | null>({
  key: 'appPage',
  default: undefined,
})

export const currentIndexPageState = atom<number | undefined | null>({
  key: 'currentIndexPage',
  default: 0,
})

export const currentIndexBlockState = atom<number | undefined | null>({
  key: 'currentIndexBlock',
  default: undefined,
})
