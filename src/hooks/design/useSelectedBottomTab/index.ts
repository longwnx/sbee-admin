import { find } from 'lodash'
import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { currentIndexBottomTabState, layoutState } from '@/recoil'

export const useSelectedBottomTab = () => {
  const layout = useRecoilValue(layoutState)
  const currentIndexBottomTab = useRecoilValue(currentIndexBottomTabState)
  const bottomTabs = useMemo(() => layout?.bottomTabs || [], [layout])
  const selectedBottomTab = useMemo(
    () => find(layout?.bottomTabs, (_, idx) => idx === currentIndexBottomTab),
    [currentIndexBottomTab, layout]
  )

  return {
    bottomTabs,
    selectedBottomTab,
  }
}
