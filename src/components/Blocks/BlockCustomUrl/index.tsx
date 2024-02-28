'use client'

import { Typography } from 'antd'
import { isEmpty } from 'lodash'
import { useRecoilValue } from 'recoil'
import { css } from '@emotion/css'
import { IconUrl } from '@/components'
import { layoutState } from '@/recoil'

type Props = {
  block: Webpage
}

export const BlockCustomUrl: React.FC<Props> = ({ block }) => {
  const layout = useRecoilValue(layoutState)
  const className = css({
    height: layout?.theme?.logo?.src ? 571 : 607,
  })
  return (
    <div className={className}>
      {!isEmpty(block?.source?.url) ? (
        <div className="w-full h-full">
          <iframe src={block?.source?.url} width="100%" height="100%" className="flex" />
        </div>
      ) : (
        <div className="p-4 h-full">
          <div className="bg-gray100 border border-gray300 rounded-lg p-4 flex flex-col items-center justify-center h-full">
            <IconUrl className="mb-2" />
            <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Custom URL</Typography.Paragraph>
          </div>
        </div>
      )}
    </div>
  )
}

export const PreviewBlockCustomUrl: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray100 border border-gray300 p-4">
      <IconUrl className="mb-2" />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Custom URL</Typography.Paragraph>
    </div>
  )
}
