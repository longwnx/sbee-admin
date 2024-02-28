import { filter } from 'lodash'
import { useCallback } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useSelectedBottomTab } from '@/hooks'
import { currentIndexBottomTabState, flagChangeLayoutState, layoutState } from '@/recoil'

export const useModifyUiLayout = () => {
  const setFlagChangeLayout = useSetRecoilState(flagChangeLayoutState)
  const [layout, setLayout] = useRecoilState(layoutState)
  const currentIndexBottomTab = useRecoilValue(currentIndexBottomTabState)
  const { bottomTabs, selectedBottomTab } = useSelectedBottomTab()

  const onUpdateBottomTab = useCallback(
    (bottomTabs: BottomTab[]) => {
      setLayout((prev) => ({
        ...prev,
        bottomTabs,
      }))
      setFlagChangeLayout(true)
    },
    [setLayout, setFlagChangeLayout]
  )

  const onUpdateTheme = useCallback(
    (theme: UiLayoutTheme) => {
      setLayout((prev) => ({
        ...prev,
        theme: {
          ...prev?.theme,
          ...theme,
        },
      }))
      setFlagChangeLayout(true)
    },
    [setLayout, setFlagChangeLayout]
  )

  const onUpdateOptions = useCallback(
    (options: UiLayoutOptions) => {
      setLayout((prev) => ({
        ...prev,
        options: {
          ...prev?.options,
          ...options,
        },
      }))
      setFlagChangeLayout(true)
    },
    [setLayout, setFlagChangeLayout]
  )

  const onRemoveBottomTab = useCallback(
    (currentIndex?: number) => {
      if (selectedBottomTab?.notDelete) {
        return
      }
      const newUiLayout = {
        ...layout,
        bottomTabs: filter(bottomTabs, (_, idx) => idx !== (currentIndex ?? currentIndexBottomTab)),
      }
      setLayout(newUiLayout)
      setFlagChangeLayout(true)
    },
    [selectedBottomTab?.notDelete, layout, bottomTabs, setLayout, setFlagChangeLayout, currentIndexBottomTab]
  )

  return {
    onUpdateBottomTab,
    onRemoveBottomTab,
    onUpdateTheme,
    onUpdateOptions,
  }
}
