'use client'

import { Typography } from 'antd'
import classNames from 'classnames'
import { isEmpty, map, times } from 'lodash'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BLANK_IMAGE } from '@public'
import { useTheme } from '@/hooks'

type Props = {
  block: ProductGrid
}

export const BlockProductCarousel: React.FC<Props> = ({ block }) => {
  const { imgRatio, corner } = useTheme()
  const height = 152 / imgRatio

  return (
    <div className={classNames('bg-white')}>
      {!isEmpty(block?.products) ? (
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <Typography.Paragraph className="mb-0 text-base font-[500] text-neutral08">
              {block?.title?.text || 'Category'}
            </Typography.Paragraph>
            <Typography.Paragraph className="mb-0 text-neutral05 flex items-center">
              View all <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
            </Typography.Paragraph>
          </div>
          <div className="flex flex-nowrap overflow-x-auto pb-4">
            {map(block?.products, (product, index) => (
              <div
                key={index}
                className={classNames('w-[152px]', index === (block?.products?.length || 0) - 1 ? 'mr-0' : 'mr-4')}
                style={{ flex: '0 0 auto' }}
              >
                <img
                  src={product?.image || BLANK_IMAGE}
                  className={classNames('w-full object-cover', corner)}
                  style={{ height }}
                  alt=""
                />
                <Typography.Paragraph className="mb-0 mt-2 text-gray700 w-full" ellipsis={{ rows: 1 }}>
                  {product?.name}
                </Typography.Paragraph>
                <Typography.Paragraph className="mb-0 text-base text-neutral08 w-full" ellipsis={{ rows: 1 }}>
                  €{product?.price}
                </Typography.Paragraph>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full p-4">
          <PreviewBlockProductCarousel />
        </div>
      )}
    </div>
  )
}

export const PreviewBlockProductCarousel: React.FC = () => {
  const { imgRatio, corner } = useTheme()
  const height = 104 / imgRatio

  return (
    <div className="rounded-lg bg-gray100 border border-gray300 p-4">
      <div className="mb-3 flex items-center justify-between">
        <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Product carousel</Typography.Paragraph>
        <Typography.Paragraph className="mb-0 text-gray700 text-xs">
          View all <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
        </Typography.Paragraph>
      </div>
      <div className="flex flex-nowrap overflow-hidden pb-4">
        {map(times(4), (item) => (
          <div key={item} className="mr-4" style={{ flex: '0 0 auto' }}>
            <div className={classNames('w-[104px] bg-white', corner)} style={{ height }} />
            <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold mt-2">
              Product name
            </Typography.Paragraph>
            <Typography.Paragraph className="mb-0 text-gray400 text-xs">$100.00</Typography.Paragraph>
          </div>
        ))}
      </div>
    </div>
  )
}
