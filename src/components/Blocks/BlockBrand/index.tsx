'use client'

import classNames from 'classnames'
import { useSelectedPageBlock } from '@/hooks'

type Props = {
  block: Brand
}

export const BlockBrand: React.FC<Props> = ({ block }) => {
  const { appPage } = useSelectedPageBlock()

  return (
    <>
      <div className={classNames('bg-white hover:ring-2 hover:ring-primary')}>
        <div className="bg-white text-gray800 h-14 flex items-center gap-[10px] py-1 px-6">
          {block?.brand?.image?.src && appPage?.options?.imageEnabled && (
            <img src={block?.brand?.image?.src} alt="" className="w-[30px] h-[30px] rounded" />
          )}
          <span>{block?.brand?.name ? block?.brand?.name : ''}</span>
        </div>
      </div>
      {appPage?.options?.itemSeparator?.visible && (
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
