'use client'

import { Dropdown, Space } from 'antd'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { DEFAULT_IMAGE } from '@public'
import { IconDownload, IconPlay, IconTrash, IconUpload, ImagesLibrary, VideosLibrary } from '@/components'
import { MediaLibrary } from '@/types'

type Props = {
  src?: string
  type?: 'image' | 'video'
  onUploadImage?: (selectedMedia: MediaLibrary[]) => void
  onUploadVideo?: (selectedMedia: MediaLibrary[]) => void
  onRemoveThumb?: () => void
  className?: string
  objectFit?: 'contain' | 'cover'
  isShowDownload?: boolean
  typeImage?: string
  typeVideo?: string
}

export const OpenImageOrVideoLibrary: React.FC<Props> = ({
  src,
  type,
  onUploadImage,
  onUploadVideo,
  onRemoveThumb,
  className = 'h-[198px]',
  objectFit = 'cover',
  isShowDownload = true,
  typeImage = 'SVG, PNG, JPG, GIF or WEBP',
  typeVideo = 'MP4, WEBM, FLV or AVI',
}) => {
  const [isVisibleImage, setIsVisibleImage] = useState(false)
  const [isVisibleVideo, setIsVisibleVideo] = useState(false)

  return (
    <div className={className}>
      {!isEmpty(src) ? (
        <div className="relative flex h-full items-center justify-center rounded-lg overflow-hidden bg-white border border-gray100 group">
          {type === 'image' ? (
            <img
              src={src || DEFAULT_IMAGE}
              className="w-full h-full"
              style={{
                objectFit,
              }}
            />
          ) : (
            <>
              <ReactPlayer url={`${src}/variants/original`} className="w-full h-full object-cover border rounded-lg" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-30">
                <IconPlay stroke="#f1f1f1" />
              </div>
            </>
          )}
          <div className="absolute top-2 right-2 hidden group-hover:block">
            <Space>
              {isShowDownload && (
                <a href={src} download target="_blank">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white cursor-pointer">
                    <IconDownload width={24} height={24} />
                  </div>
                </a>
              )}
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'image',
                      label: 'Upload image',
                      onClick: () => setIsVisibleImage(true),
                    },
                    {
                      key: 'video',
                      label: 'Upload video',
                      onClick: () => setIsVisibleVideo(true),
                    },
                  ],
                }}
                arrow
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white cursor-pointer">
                  <IconUpload width={20} height={20} />
                </div>
              </Dropdown>
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
        <Dropdown
          menu={{
            items: [
              {
                key: 'image',
                label: 'Upload image',
                onClick: () => setIsVisibleImage(true),
              },
              {
                key: 'video',
                label: 'Upload video',
                onClick: () => setIsVisibleVideo(true),
              },
            ],
          }}
          arrow
        >
          <div className="flex h-full flex-col items-center justify-center border-dashed border border-gray500 rounded-lg bg-gray25">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray200">
              <IconUpload width={20} height={20} />
            </div>
          </div>
        </Dropdown>
      )}
      <ImagesLibrary
        typeImage={typeImage}
        isVisible={isVisibleImage}
        setIsVisible={setIsVisibleImage}
        onOk={onUploadImage}
      />
      <VideosLibrary
        typeVideo={typeVideo}
        isVisible={isVisibleVideo}
        setIsVisible={setIsVisibleVideo}
        onOk={onUploadVideo}
      />
    </div>
  )
}
