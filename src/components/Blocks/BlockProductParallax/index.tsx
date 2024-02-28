'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import { isEmpty, map, times } from 'lodash'
import { useMemo } from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BLANK_IMAGE } from '@public'
import { useTheme } from '@/hooks'

type Props = {
  block: ProductGrid
}

export const BlockProductParallax: React.FC<Props> = ({ block }) => {
  const { imgRatio, corner } = useTheme()
  const height = 119 / imgRatio

  const products = useMemo(() => (!isEmpty(block?.products) ? block?.products : map(times(3))), [block?.products])

  return (
    <div className={classNames('bg-white')}>
      {!isEmpty(block?.products) ? (
        <div className="py-4">
          <div className="mb-3 px-4 flex items-center justify-between">
            <Typography.Paragraph className="mb-0 text-base font-[500] text-neutral08">
              {block?.title?.text || 'Category'}
            </Typography.Paragraph>
            <Typography.Paragraph className="mb-0 text-neutral05 flex items-center">
              View all <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
            </Typography.Paragraph>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {map(
              products,
              (product: any, index: number) =>
                index < 3 && (
                  <div key={index} className="flex flex-col items-center justify-center">
                    <img
                      src={product?.image || BLANK_IMAGE}
                      className={classNames('w-full object-cover', corner)}
                      style={{ height: index === 1 ? height : height - 32 }}
                      alt=""
                    />
                    <Typography.Paragraph className="mb-0 mt-2 text-gray700 w-full text-center" ellipsis={{ rows: 2 }}>
                      {product?.name || 'Product Name'}
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      className="mb-0 text-base text-neutral08 w-full text-center"
                      ellipsis={{ rows: 1 }}
                    >
                      €{product?.price || '100.00'}
                    </Typography.Paragraph>
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <div className="w-full p-4">
          <PreviewBlockProductParallax />
        </div>
      )}
    </div>
  )
}

export const PreviewBlockProductParallax: React.FC = () => {
  const { imgRatio, corner } = useTheme()
  const height = 97 / imgRatio

  return (
    <div className="rounded-lg bg-gray100 border border-gray300 p-4">
      <div className="mb-3 flex items-center justify-between">
        <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">
          Product swipeable cards
        </Typography.Paragraph>
        <Typography.Paragraph className="mb-0 text-gray700 text-xs">
          View all <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
        </Typography.Paragraph>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center">
          <div className={classNames('w-full bg-white', corner)} style={{ height: height - 32 }} />
          <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold mt-2">Product name</Typography.Paragraph>
          <Typography.Paragraph className="mb-0 text-gray400 text-xs">$100.00</Typography.Paragraph>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className={classNames('w-full bg-white', corner)} style={{ height }} />
          <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold mt-2">Product name</Typography.Paragraph>
          <Typography.Paragraph className="mb-0 text-gray400 text-xs">$100.00</Typography.Paragraph>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className={classNames('w-full bg-white', corner)} style={{ height: height - 32 }} />
          <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold mt-2">Product name</Typography.Paragraph>
          <Typography.Paragraph className="mb-0 text-gray400 text-xs">$100.00</Typography.Paragraph>
        </div>
      </div>
    </div>
  )
}
