'use client'

import { Col, Row, Typography } from 'antd'
import classNames from 'classnames'
import { isEmpty, map, times } from 'lodash'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BLANK_IMAGE } from '@public'
import { useTheme } from '@/hooks'

type Props = {
  block: ProductGrid
}

const DEFAULT_COLUMNS = 2
const MAX_SPAN = 24

export const BlockProductGrid: React.FC<Props> = ({ block }) => {
  const { imgRatio, corner } = useTheme()
  const height = 154 / imgRatio
  return (
    <div>
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
          <Row gutter={[16, 16]}>
            {map(block?.products, (product, index) => (
              <Col span={MAX_SPAN / (block?.columns || DEFAULT_COLUMNS)} key={index}>
                <div>
                  <img
                    src={product?.image || BLANK_IMAGE}
                    className={classNames('w-full object-cover', corner)}
                    alt=""
                    style={{ height }}
                  />
                  <Typography.Paragraph className="mb-0 mt-2 text-gray700 w-full" ellipsis={{ rows: 1 }}>
                    {product?.name}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="mb-0 text-base text-neutral08 w-full" ellipsis={{ rows: 1 }}>
                    €{product?.price}
                  </Typography.Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="w-full p-4">
          <PreviewBlockProductGrid />
        </div>
      )}
    </div>
  )
}

export const PreviewBlockProductGrid: React.FC = () => {
  const { imgRatio, corner } = useTheme()
  const height = 154 / imgRatio
  return (
    <div className="rounded-lg bg-gray100 border border-gray300 p-4">
      <div className="mb-3 flex items-center justify-between">
        <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Product grid</Typography.Paragraph>
        <Typography.Paragraph className="mb-0 text-gray700 text-xs">
          View all <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
        </Typography.Paragraph>
      </div>
      <Row gutter={[16, 16]}>
        {map(times(4), (item) => (
          <Col span={12} key={item}>
            <div className={classNames('bg-white', corner)} style={{ height }} />
            <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold mt-2">
              Product name
            </Typography.Paragraph>
            <Typography.Paragraph className="mb-0 text-gray400 text-xs">$100.00</Typography.Paragraph>
          </Col>
        ))}
      </Row>
    </div>
  )
}
