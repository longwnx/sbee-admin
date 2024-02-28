'use client'

import { Space, Typography } from 'antd'
import classNames from 'classnames'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import { css } from '@emotion/css'
import { DEFAULT_IMAGE } from '@public'
import { IconsLibrary, IconTrash, IconUpload } from '@/components'

type Props = {
  src?: string
  onUpload?: (selectedMedia: any[]) => void
  onRemoveThumb?: () => void
  className?: string
}

export const OpenIconLibrary: React.FC<Props> = ({ src, onUpload, onRemoveThumb, className = 'h-[198px]' }) => {
  const [isVisible, setIsVisible] = useState(false)

  const classNameImg = css({
    '.__action': {
      display: 'none',
    },
    '&:hover': {
      '.__action': {
        display: 'block',
      },
    },
  })

  return (
    <div className={className}>
      {!isEmpty(src) ? (
        <div
          className={classNames(
            'relative flex h-full items-center justify-center rounded-lg overflow-hidden bg-white border border-gray100',
            classNameImg
          )}
        >
          <img src={src || DEFAULT_IMAGE} className="w-full h-full object-contain" />
          <div className="absolute top-2 right-2 __action">
            <Space>
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white cursor-pointer"
                onClick={() => setIsVisible(true)}
              >
                <IconUpload width={20} height={20} />
              </div>
              {onRemoveThumb && (
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveThumb()
                  }}
                >
                  <IconTrash width={20} height={20} />
                </div>
              )}
            </Space>
          </div>
        </div>
      ) : (
        <div
          className="flex h-full flex-col items-center justify-center border-dashed border border-gray500 rounded-lg bg-gray25 cursor-pointer"
          onClick={() => setIsVisible(true)}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray200">
            <IconUpload width={20} height={20} />
          </div>
          <Typography.Text className="font-medium text-blueDark600 my-1">Upload an icon</Typography.Text>
        </div>
      )}
      <IconsLibrary isVisible={isVisible} setIsVisible={setIsVisible} onOk={onUpload} />
    </div>
  )
}
