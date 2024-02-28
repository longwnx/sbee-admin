'use client'

import { Typography } from 'antd'
import { isEmpty } from 'lodash'
import { useRecoilValue } from 'recoil'
import { css } from '@emotion/css'
import { IconCode } from '@/components'
import { layoutState } from '@/recoil'

type Props = {
  block: InlineHtmlContent
}

export const BlockContentHtml: React.FC<Props> = ({ block }) => {
  const layout = useRecoilValue(layoutState)
  const className = css({
    height: layout?.theme?.logo?.src ? 571 : 607,
  })
  return (
    <div className={className}>
      {!isEmpty(block?.content) ? (
        <div className="w-full h-full px-4 overflow-hidden">
          <div dangerouslySetInnerHTML={{ __html: block?.content || '' }} />
        </div>
      ) : (
        <div className="p-4 h-full">
          <div className="bg-gray100 border border-gray300 rounded-lg p-4 flex flex-col items-center justify-center h-full">
            <IconCode className="mb-2" />
            <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Content HTML</Typography.Paragraph>
          </div>
        </div>
      )}
    </div>
  )
}

export const PreviewBlockContentHtml: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray100 border border-gray300 p-4">
      <IconCode className="mb-2" />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Content HTML</Typography.Paragraph>
    </div>
  )
}
