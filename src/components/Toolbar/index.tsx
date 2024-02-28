'use client'

import { Divider, Typography } from 'antd'
import { IconPenEdit, IconTrash } from '@/components'

type Props = {
  isVisibleDesign?: boolean
  isVisibleDelete?: boolean
  onDesign?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onDelete?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const Toolbar: React.FC<Props> = ({ isVisibleDesign = true, isVisibleDelete = true, onDesign, onDelete }) => {
  return (
    <div>
      {isVisibleDesign && (
        <>
          <div className="flex items-center cursor-pointer" onClick={onDesign}>
            <IconPenEdit stroke="#C5AE8F" />
            <Typography.Text className="text-primary text-base font-medium ml-2">Design</Typography.Text>
          </div>
        </>
      )}
      {isVisibleDelete && isVisibleDesign && <Divider className="my-2 border-t-gray200" />}
      {isVisibleDelete && (
        <div className="flex items-center cursor-pointer" onClick={onDelete}>
          <IconTrash />
          <Typography.Text className="text-base font-medium ml-2">Delete</Typography.Text>
        </div>
      )}
    </div>
  )
}
