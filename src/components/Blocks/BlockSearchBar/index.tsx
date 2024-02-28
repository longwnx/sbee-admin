'use client'

import { Typography } from 'antd'
import { find } from 'lodash'
import { useMemo } from 'react'
import { css } from '@emotion/css'
import { IconBarCode, IconSearch } from '@/components'
import { useGetIntegrationsByAppKeyQuery } from '@/hooks'

type Props = {
  block: SearchBar
}

export const BlockSearchBar: React.FC<Props> = ({ block }) => {
  const className = css({
    padding: 16,
    backgroundColor: block?.backgroundColor || '#FFFFFF',
  })

  const { data: integerations } = useGetIntegrationsByAppKeyQuery()

  const isActiveBarcodeQR = useMemo(() => find(integerations?.data, (i) => i?.code === 'barcodeQR')?.active, [integerations])

  return (
    <div className={className}>
      <div className="flex items-center h-10 rounded-lg py-[10px] border border-[#E4E7EE] bg-white relative">
        <IconSearch width={20} height={20} stroke="#7F8596" className="ml-5 mr-2" />
        <Typography.Paragraph className="mb-0 text-[#7F8596]">{block.placeholder || ''}</Typography.Paragraph>
        {isActiveBarcodeQR && <IconBarCode className="absolute top-1/2 -translate-y-1/2 right-4" />}
      </div>
    </div>
  )
}

export const PreviewBlockSearchBar: React.FC = () => {
  return (
    <div className="flex items-center justify-center rounded-lg bg-gray100 border border-gray300 p-4">
      <IconSearch className="mr-2" />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Search bar</Typography.Paragraph>
    </div>
  )
}
