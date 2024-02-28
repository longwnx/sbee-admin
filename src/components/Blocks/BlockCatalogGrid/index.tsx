'use client'

import { Col, Row, Typography } from 'antd'
import classNames from 'classnames'
import { isEmpty, map } from 'lodash'
import { DEFAULT_IMAGE } from '@public'
import { useTheme } from '@/hooks'

type Props = {
  block: CatalogGrid
}

const DEFAULT_COLUMNS = 4

export const BlockCatalogGrid: React.FC<Props> = ({ block }) => {
  const { corner } = useTheme()
  return (
    <div>
      {!isEmpty(block?.categories) ? (
        <Row gutter={[16, 16]} className="p-4">
          {map(block?.categories, (category, index) => (
            <Col style={{ width: `${100 / (block?.columns || DEFAULT_COLUMNS)}%` }} key={index}>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={category?.image?.src || DEFAULT_IMAGE}
                  className={classNames('w-full aspect-square object-cover bg-[#F4F4F4]', corner)}
                  alt=""
                />
                <Typography.Paragraph className="text-center mb-0 mt-1 text-[13px] text-[#344054]" ellipsis={{ rows: 2 }}>
                  {category?.name}
                </Typography.Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="w-full p-4">
          <PreviewBlockCatalogGrid />
        </div>
      )}
    </div>
  )
}

export const PreviewBlockCatalogGrid: React.FC<{ isVisibleTitle?: boolean }> = ({ isVisibleTitle }) => {
  const { corner } = useTheme()
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray100 border border-gray300 p-4">
      {isVisibleTitle && (
        <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Category grid</Typography.Paragraph>
      )}
      <div className="flex items-center justify-between w-full mt-4">
        <div className="flex flex-col items-center justify-center w-full mr-4">
          <div className={classNames('w-full aspect-square bg-white', corner)} />
          <Typography.Paragraph className="mb-0 mt-2 text-xs whitespace-nowrap">Category</Typography.Paragraph>
        </div>
        <div className="flex flex-col items-center justify-center w-full mr-4">
          <div className={classNames('w-full aspect-square bg-white', corner)} />
          <Typography.Paragraph className="mb-0 mt-2 text-xs whitespace-nowrap">Category</Typography.Paragraph>
        </div>
        <div className="flex flex-col items-center justify-center w-full mr-4">
          <div className={classNames('w-full aspect-square bg-white', corner)} />
          <Typography.Paragraph className="mb-0 mt-2 text-xs whitespace-nowrap">Category</Typography.Paragraph>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <div className={classNames('w-full aspect-square bg-white', corner)} />
          <Typography.Paragraph className="mb-0 mt-2 text-xs whitespace-nowrap">Category</Typography.Paragraph>
        </div>
      </div>
    </div>
  )
}
