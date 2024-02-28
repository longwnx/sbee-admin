import { find } from 'lodash'
import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { appPageState, currentIndexBlockState, currentIndexPageState } from '@/recoil'

export const useSelectedPageBlock = () => {
  const appPage = useRecoilValue(appPageState)
  const currentIndexPage = useRecoilValue(currentIndexPageState)
  const currentIndexBlock = useRecoilValue(currentIndexBlockState)
  const selectedPage = useMemo(
    () => find(appPage?.pages, (_, idx) => idx === currentIndexPage),
    [currentIndexPage, appPage?.pages]
  )

  const blocks = useMemo(() => selectedPage?.blocks, [selectedPage?.blocks])

  const selectedBlock = useMemo(() => find(blocks, (_, idx) => idx === currentIndexBlock), [blocks, currentIndexBlock])

  return {
    selectedPage,
    selectedBlock,
    blocks,
    appPage,
  }
}
