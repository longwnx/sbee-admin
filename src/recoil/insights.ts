import dayjs, { Dayjs } from 'dayjs'
import { atom } from 'recoil'

export const dateRangeState = atom<[Dayjs, Dayjs]>({
  key: 'dateRange',
  // default: [dayjs().subtract(30, 'days'), dayjs()],
  default: [dayjs().add(-30, 'd'), dayjs().add(-1, 'd')],
})
