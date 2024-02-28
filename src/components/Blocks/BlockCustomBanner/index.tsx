'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { BLANK_IMAGE } from '@public'
import { IconChevronRight, IconImageAdd } from '@/components'
import { useSelectedPageBlock } from '@/hooks'

type Props = {
  block: CustomBanner
}

export const BlockCustomBanner: React.FC<Props> = ({ block }) => {
  const { appPage } = useSelectedPageBlock()
  const pathname = usePathname()

  return (
    <>
      <div className={classNames('bg-white hover:ring-2 hover:ring-primary')}>
        {block?.images?.[0]?.src && block?.images?.[0]?.visible ? (
          <div
            className={classNames(
              'relative z-[1] w-full flex flex-col',
              block?.images?.[0]?.src && block?.images?.[0]?.visible ? 'h-[100px]' : ''
            )}
          >
            {block?.images?.[0]?.src && block?.images?.[0]?.visible && (
              <div
                className="w-full flex-1 bg-center bg-cover"
                style={{
                  backgroundImage: `url(${block?.images?.[0]?.src || BLANK_IMAGE})`,
                }}
              />
            )}
            {block?.title?.text && block?.title?.visible && (
              <div className="bg-white text-gray800 py-1 px-2 flex items-center justify-between rounded-full absolute top-1/2 left-4 -translate-y-1/2">
                <span>{block?.title?.text}</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="bg-white text-gray800 h-14 flex items-center justify-between py-1 px-6">
              <span>{block?.title?.text && block?.title?.visible ? block?.title?.text : ''}</span>
              {pathname !== '/design/brands' && (
                <div>
                  <IconChevronRight />
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {appPage?.options?.itemSeparator?.visible && pathname === '/design/brands' && (
        <div
          className="mt-[2px]"
          style={{
            height: appPage?.options?.itemSeparator?.height ?? 0,
            backgroundColor: appPage?.options?.itemSeparator?.backgroundColor || '#ffffff',
          }}
        />
      )}
    </>
  )
}

export const PreviewBlockCustomBanner: React.FC = () => {
  return (
    <div className="flex items-center justify-center rounded-lg bg-gray100 border border-gray300 p-4 gap-2">
      <IconImageAdd />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Custom banner</Typography.Paragraph>
    </div>
  )
}
