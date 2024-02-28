'use client'

import { Space, Typography } from 'antd'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import { DEFAULT_IMAGE } from '@public'
import { IconDownload, IconTrash, IconUpload, ImagesLibrary } from '@/components'
import { MediaLibrary } from '@/types'

type Props = {
  src?: string
  onUpload?: (selectedMedia: MediaLibrary[]) => void
  onRemoveThumb?: () => void
  showTitle?: boolean
  className?: string
  objectFit?: 'contain' | 'cover'
  isShowDownload?: boolean
  typeImage?: string
  accept?: string
  maxSize?: number
}

export const OpenImageLibrary: React.FC<Props> = ({
  src,
  onUpload,
  onRemoveThumb,
  showTitle = true,
  className = 'h-[198px]',
  objectFit = 'cover',
  isShowDownload = true,
  typeImage = 'SVG, PNG, JPG, GIF or WEBP',
  accept,
  maxSize = 15,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={className}>
      {!isEmpty(src) ? (
        <div className="relative flex h-full items-center justify-center rounded-lg overflow-hidden bg-white border border-gray100 group">
          <img
            src={src || DEFAULT_IMAGE}
            className="w-full h-full"
            style={{
              objectFit,
            }}
          />
          <div className="absolute top-2 right-2 hidden group-hover:block">
            <Space>
              {isShowDownload && (
                <a href={src} download target="_blank">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white cursor-pointer">
                    <IconDownload width={24} height={24} />
                  </div>
                </a>
              )}
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
          {showTitle && (
            <>
              <Typography.Text className="font-medium text-blueDark600 my-1">Upload an image</Typography.Text>
              <Typography.Text className="text-xs text-gray500">{typeImage}</Typography.Text>
            </>
          )}
        </div>
      )}
      <ImagesLibrary
        typeImage={typeImage}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onOk={onUpload}
        accept={accept}
        maxSize={maxSize}
      />
    </div>
  )
}
