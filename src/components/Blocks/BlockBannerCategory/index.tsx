'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import { isEmpty, map } from 'lodash'
import { BLANK_IMAGE } from '@public'
import { IconChevronRight } from '@/components'
import { useSelectedPageBlock } from '@/hooks'

type Props = {
  block: BannerCategories
}

export const BlockBannerCategory: React.FC<Props> = ({ block }) => {
  const { selectedPage } = useSelectedPageBlock()

  return (
    <>
      <div className={classNames('bg-white hover:ring-2 hover:ring-primary')}>
        {block?.category?.image?.src && block?.category?.image?.visible ? (
          <div
            className={classNames(
              'relative z-[1] w-full flex flex-col',
              block?.category?.image?.src && block?.category?.image?.visible ? 'h-[100px]' : ''
            )}
          >
            {block?.category?.image?.src && block?.category?.image?.visible && (
              <div
                className="w-full flex-1 bg-center bg-cover"
                style={{
                  backgroundImage: `url(${block?.category?.image?.src || BLANK_IMAGE})`,
                }}
              />
            )}
            {block?.category?.name && block?.category?.visibleName && (
              <div className="bg-white text-gray800 py-1 px-2 flex items-center justify-between rounded-full absolute top-1/2 left-4 -translate-y-1/2">
                <span>{block?.category?.name}</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="bg-white text-gray800 h-14 flex items-center justify-between py-1 px-6">
              <span>{block?.category?.name && block?.category?.visibleName ? block?.category?.name : ''}</span>
              <div className={classNames(!isEmpty(block?.category?.children) ? 'rotate-90' : '')}>
                <IconChevronRight />
              </div>
            </div>
          </>
        )}
        {!isEmpty(block?.category?.children) && (
          <div>
            {map(
              block?.category?.children,
              (i) =>
                i?.selected && (
                  <div className="flex items-center pl-10 py-2" key={i?.id}>
                    <Typography.Paragraph className="mb-0" ellipsis={{ rows: 1 }}>
                      {i?.name}
                    </Typography.Paragraph>
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <div
        className="mt-[2px]"
        style={{
          height: selectedPage?.spacerHeight ?? 0,
          backgroundColor: selectedPage?.spacerBackgroundColor || '#ffffff',
        }}
      />
    </>
  )
}
