'use client'

import { App, Spin, Upload } from 'antd'
import { useMemo } from 'react'
import { useGetUserInfoQuery, useUploadMediaLibraryMutation } from '@/hooks'
import { UploadMediaMode } from '@/types'

type Props = {
  uploadMode?: UploadMediaMode
  multiple?: boolean
  children?: React.ReactNode
  accept?: string
  maxSize?: number
}

export const UploadMedia: React.FC<Props> = ({ uploadMode, multiple = true, children, accept, maxSize = 15 }) => {
  const { message } = App.useApp()
  const { data: userInfo } = useGetUserInfoQuery()
  const { mutate: onUpload, isLoading } = useUploadMediaLibraryMutation()

  const acceptUpload = useMemo(() => {
    switch (uploadMode) {
      case UploadMediaMode.Image:
        return '.png, .jpg, .jpeg, .gif, .svg, .webp'
      case UploadMediaMode.Video:
        return '.mp4, .mov, .webm, .flv, .avi'
      case UploadMediaMode.Icon:
        return '.svg'
      default:
        return '*'
    }
  }, [uploadMode])

  return (
    <Upload.Dragger
      accept={accept || acceptUpload}
      showUploadList={false}
      beforeUpload={() => false}
      fileList={[]}
      multiple={multiple}
      onChange={async (info) => {
        if (uploadMode === UploadMediaMode.Image && info.file.size && info.file.size / 1024 > maxSize * 1024) {
          message.error(`You can only upload photos up to ${maxSize} mb`)
          return
        }
        if (uploadMode === UploadMediaMode.Video && info.file.size && info.file.size / 1024 > maxSize * 1024) {
          message.error(`You can only upload video up to ${maxSize} mb`)
          return
        }
        const formdata = new FormData()
        formdata.append('files', info.file as any, info.file?.name)
        onUpload({
          username: userInfo?.preferred_username,
          formdata,
        })
      }}
    >
      <Spin spinning={isLoading}>{children}</Spin>
    </Upload.Dragger>
  )
}
