import { filter, map } from 'lodash'
import { useCallback } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { appPageState, currentIndexBlockState, currentIndexPageState, flagChangeAppPageState } from '@/recoil'

export const useModifyUiPages = () => {
  const setFlagChangeAppPage = useSetRecoilState(flagChangeAppPageState)
  const currentIndexPage = useRecoilValue(currentIndexPageState)
  const currentIndexBlock = useRecoilValue(currentIndexBlockState)
  const [appPage, setAppPage] = useRecoilState(appPageState)

  const onUpdatePages = useCallback(
    (newPage?: AppPageLayout[], data?: AppPage) => {
      const newUiPage = {
        ...(appPage || {}),
        pages: newPage,
        ...data,
      }
      setAppPage(newUiPage)
      setFlagChangeAppPage(true)
    },
    [appPage, setAppPage, setFlagChangeAppPage]
  )

  const onUpdateBlockItem = useCallback(
    (newData: any, idxBlock?: number) => {
      const newPage = map(appPage?.pages, (page, index) => ({
        ...page,
        ...(index === currentIndexPage && {
          blocks: map(page?.blocks, (block, indexBlock) => ({
            ...block,
            ...(indexBlock === (idxBlock ?? currentIndexBlock) && {
              ...newData,
            }),
          })),
        }),
      }))
      onUpdatePages(newPage)
    },
    [currentIndexBlock, currentIndexPage, onUpdatePages, appPage?.pages]
  )

  const onUpdateCurrentPage = useCallback(
    (settings: { spacerHeight?: number; spacerBackgroundColor?: string }) => {
      const newPage = map(appPage?.pages, (page, index) => ({
        ...page,
        ...(index === currentIndexPage && {
          ...settings,
        }),
      }))
      onUpdatePages(newPage)
    },
    [appPage?.pages, currentIndexPage, onUpdatePages]
  )

  const onRemoveBlockItem = useCallback(
    (index?: number) => {
      const newPage = map(appPage?.pages, (page, indexPage) => ({
        ...page,
        ...(indexPage === currentIndexPage && {
          blocks: filter(page?.blocks, (_, indexBlock) => indexBlock !== (index ?? currentIndexBlock)),
        }),
      }))
      onUpdatePages(newPage)
    },
    [currentIndexBlock, currentIndexPage, onUpdatePages, appPage?.pages]
  )

  return {
    onUpdatePages,
    onUpdateCurrentPage,
    onUpdateBlockItem,
    onRemoveBlockItem,
  }
}
