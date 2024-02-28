'use client'

import { Space, Typography } from 'antd'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { IconDownload, IconPlay, IconTrash, IconUpload, VideosLibrary } from '@/components'
import { MediaLibrary } from '@/types'

type Props = {
  src?: string
  onUpload?: (selectedMedia: MediaLibrary[]) => void
  onRemoveThumb?: () => void
  className?: string
  isShowDownload?: boolean
  typeVideo?: string
}

export const OpenVideoLibrary: React.FC<Props> = ({
  src,
  onUpload,
  onRemoveThumb,
  className = 'h-[198px]',
  isShowDownload,
  typeVideo = 'MP4, WEBM, FLV or AVI',
}) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={className}>
      {!isEmpty(src) ? (
        <div className="relative flex items-center justify-center rounded-lg bg-black h-full group">
          <ReactPlayer url={`${src}/variants/original`} className="w-full h-full object-cover border rounded-lg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-30">
            <IconPlay stroke="#f1f1f1" />
          </div>
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
          className="flex flex-col items-center justify-center border-dashed border border-gray500 rounded-lg bg-gray25 h-full cursor-pointer"
          onClick={() => setIsVisible(true)}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray200">
            <IconUpload width={20} height={20} />
          </div>
          <Typography.Text className="font-medium text-blueDark600 my-1">Upload a video</Typography.Text>
          <Typography.Text className="text-xs text-gray500">{typeVideo}</Typography.Text>
        </div>
      )}
      <VideosLibrary typeVideo={typeVideo} isVisible={isVisible} setIsVisible={setIsVisible} onOk={onUpload} />
    </div>
  )
}
