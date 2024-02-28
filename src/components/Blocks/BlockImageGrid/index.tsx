'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import { isEmpty, map } from 'lodash'
import Masonry from 'react-responsive-masonry'
import { css } from '@emotion/css'
import { DEFAULT_IMAGE } from '@public'
import '@splidejs/react-splide/css'
import { IconImageGrid } from '@/components'

type Props = {
  block: Grid
}

export const BlockImageGrid: React.FC<Props> = ({ block }) => {
  const className = css({
    paddingTop: block?.spacing?.top ?? 0,
    paddingBottom: block?.spacing?.bottom ?? 0,
    paddingLeft: block?.spacing?.left ?? 0,
    paddingRight: block?.spacing?.right ?? 0,
    backgroundColor: block?.backgroundColor,
  })

  return (
    <div>
      {!isEmpty(block?.images?.[0]?.src) ? (
        <div className={className}>
          <Masonry columnsCount={block?.columns} gutter={`${block?.spacing?.inner ?? 0}px`}>
            {map(block?.images, (image, index) => (
              <img
                key={index}
                src={image?.src || DEFAULT_IMAGE}
                className={classNames(
                  'w-full object-contain bg-[#F4F4F4] inline-block',
                  block?.spacing?.inner !== 0 ? 'rounded-lg' : ''
                )}
                alt=""
              />
            ))}
          </Masonry>
        </div>
      ) : (
        <div className="p-4">
          <PreviewBlockImageGrid />
        </div>
      )}
    </div>
  )
}

export const PreviewBlockImageGrid: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray100 border border-gray300 px-4 py-20">
      <IconImageGrid className="mb-2" />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Image grid</Typography.Paragraph>
      <Typography.Paragraph className="mb-0 text-gray400 text-xs">Upload your design here</Typography.Paragraph>
    </div>
  )
}
