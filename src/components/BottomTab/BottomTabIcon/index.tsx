'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { css } from '@emotion/css'
import { useDevice } from '@/hooks'
import { layoutState } from '@/recoil'

type Props = {
  bottomTab: BottomTab
}

export const BottomTabIcon: React.FC<Props> = ({ bottomTab }) => {
  const { isMobile } = useDevice()
  const [isHover, setIsHover] = useState(false)

  const isDesktopAndIsHover = useMemo(() => !isMobile && isHover, [isMobile, isHover])
  const layout = useRecoilValue(layoutState)

  const isValidHex = (color: string) => /^#([A-Fa-f0-9]{3}){1,2}$/.test(color)

  const color = isDesktopAndIsHover
    ? isValidHex(layout?.bottomTabs?.[0]?.title?.selectedTextColor as string)
      ? layout?.bottomTabs?.[0]?.title?.selectedTextColor
      : '#1F2128'
    : isValidHex(layout?.bottomTabs?.[0]?.title?.textColor as string)
      ? layout?.bottomTabs?.[0]?.title?.textColor
      : '#7F8596'

  const cssFilter = hexToCSSFilter(color || '#7F8596')

  const className = css({
    color: `${color} !important`,
  })

  const classNameIcon = css({
    img: {
      filter: cssFilter?.filter,
    },
  })

  return (
    <div className="w-full cursor-pointer" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <div className={classNames('flex flex-col items-center justify-center')}>
        {bottomTab?.iconset?.source?.uri && (
          <div className={classNames('w-6 h-6 flex items-center justify-center', classNameIcon)}>
            <img src={bottomTab?.iconset?.source?.uri} alt="" className="object-contain" />
          </div>
        )}
        {bottomTab?.title?.visible && (
          <Typography.Paragraph ellipsis className={classNames('text-xs mb-0 w-full text-center', className)}>
            {bottomTab?.title?.text}
          </Typography.Paragraph>
        )}
      </div>
    </div>
  )
}
