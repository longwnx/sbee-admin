import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { layoutState } from '@/recoil'
import { CornerStyle, ImageStyle } from '@/types'

export const useTheme = () => {
  const layout = useRecoilValue(layoutState)
  const corner = useMemo(
    () => layout?.theme?.corner?.style === CornerStyle.Round && 'rounded-lg',
    [layout?.theme?.corner?.style]
  )

  const imgRatio = useMemo(() => {
    if (layout?.theme?.image?.style === ImageStyle['1:1']) {
      return 1
    }
    if (layout?.theme?.image?.style === ImageStyle['2:3']) {
      return 2 / 3
    }
    if (layout?.theme?.image?.style === ImageStyle['3:4']) {
      return 3 / 4
    }
    return 3 / 4
  }, [layout?.theme?.image?.style])

  return {
    imgRatio,
    corner,
  }
}
