'use client'

import { App, Col, Modal, Pagination, Row, Spin, Typography } from 'antd'
import { filter, includes, map } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ReactPlayer from 'react-player'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { css } from '@emotion/css'
import { IconTrash, IconVideo, UploadMedia } from '@/components'
import { useDeleteMediaLibraryMutation, useGetMediaLibraryQuery, useGetUserInfoQuery } from '@/hooks'
import { MediaLibrary, MediaLibraryMode, UploadMediaMode } from '@/types'
import { getVideoDimensionsOf } from '@/utils'

type Props = {
  mode?: MediaLibraryMode
  isVisible?: boolean
  setIsVisible?: (isVisible: boolean) => void
  onOk?: (selectedVideos: MediaLibrary[]) => void
  typeVideo?: string
}

export const VideosLibrary: React.FC<Props> = ({
  mode = MediaLibraryMode.Single,
  isVisible,
  setIsVisible,
  onOk,
  typeVideo,
}) => {
  const { modal } = App.useApp()
  const [page, setPage] = useState(1)
  const { data: dataMediaLibrary } = useGetMediaLibraryQuery({
    page: 0,
    size: 1000,
  })
  const { data: userInfo } = useGetUserInfoQuery()
  const { mutate: onDelete, isLoading } = useDeleteMediaLibraryMutation()
  const [videos, setVideos] = useState<MediaLibrary[]>()

  const dataVideos = useMemo(
    () => ({
      data: filter(dataMediaLibrary?.data, (i) => includes(i?.type, 'video')),
    }),
    [dataMediaLibrary?.data]
  )

  useEffect(() => {
    setVideos(
      map(
        filter(dataVideos?.data, (_, index) => index >= (page - 1) * 12 && index < page * 12),
        (i) => ({
          id: i?.id,
          url: i?.url,
          fileName: i?.fileName,
          thumbnailUrl: i?.thumbnailUrl,
          originalUrl: i?.originalUrl,
          isSelected: false,
        })
      )
    )
  }, [dataVideos?.data, page])

  const onSelectVideos = useCallback(
    (id?: string) => {
      const newVideos = map(videos, (video) => ({
        ...video,
        ...(mode === MediaLibraryMode.Single && {
          isSelected: false,
        }),
        ...(video?.id === id && {
          isSelected: !video?.isSelected,
        }),
      }))
      setVideos(newVideos)
    },
    [mode, videos]
  )

  const onReset = useCallback(() => {
    const newVideos = map(videos, (video) => ({
      ...video,
      isSelected: false,
    }))
    setVideos(newVideos)
    setIsVisible && setIsVisible(false)
  }, [setIsVisible, videos])

  const onClickOk = useCallback(async () => {
    const selectedVideos = filter(videos, (video) => video?.isSelected)
    let newSelectedVideos: MediaLibrary[] = []
    for (let index = 0; index < selectedVideos.length; index++) {
      const element = selectedVideos[index]
      const { width, height }: any = await getVideoDimensionsOf(`${element?.url}/variants/original`)
      const ratio = width / height
      newSelectedVideos = [
        ...newSelectedVideos,
        {
          ...element,
          ratio,
          width,
          height,
        },
      ]
    }
    onOk && onOk(newSelectedVideos)
    onReset()
  }, [onOk, onReset, videos])

  const classNameImg = css({
    '.__action': {
      display: 'none',
    },
    '&:hover': {
      '.__action': {
        display: 'flex',
      },
    },
  })

  return (
    <Modal
      title="Videos Library"
      width={768}
      destroyOnClose
      open={isVisible}
      okButtonProps={{
        disabled: !filter(videos, (video) => video?.isSelected).length,
      }}
      onOk={onClickOk}
      onCancel={onReset}
    >
      <UploadMedia uploadMode={UploadMediaMode.Video} multiple={false}>
        <>
          <IconVideo width={48} height={48} />
          <Typography.Paragraph className="mt-4 mb-2">
            <span className="text-blueDark600 font-medium">Upload a video</span> or drag and drop
          </Typography.Paragraph>
          <Typography.Paragraph className="text-sm">{typeVideo} up to 15MB</Typography.Paragraph>
        </>
      </UploadMedia>
      <Spin spinning={isLoading}>
        <div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {map(videos, (video) => (
              <div key={video?.id} className={classNameImg}>
                <div className="cursor-pointer h-40 relative" onClick={() => onSelectVideos(video?.id)}>
                  <div
                    className="w-8 h-8 items-center justify-center rounded-full bg-white cursor-pointer absolute z-50 top-2 right-2 __action"
                    onClick={(e) => {
                      e.stopPropagation()
                      modal.confirm({
                        icon: null,
                        content: (
                          <div>
                            <ExclamationCircleOutlined rev className="mr-2 text-[#faad14]" />
                            <span>Are you sure?</span>
                          </div>
                        ),
                        onOk: () => {
                          onDelete({
                            username: userInfo?.preferred_username,
                            id: video?.id,
                            fileName: video?.fileName,
                          })
                        },
                        cancelButtonProps: {
                          className: 'font-semibold text-gray800',
                        },
                        okButtonProps: {
                          className: 'bg-primary font-semibold text-gray800',
                        },
                      })
                    }}
                  >
                    <IconTrash width={20} height={20} />
                  </div>
                  <div className="h-full">
                    <div className="bg-[#00000009] h-full rounded-lg">
                      <ReactPlayer url={`${video?.url}/variants/original`} className="w-full h-full" />
                    </div>
                  </div>
                  {video?.isSelected && (
                    <div className="border-2 border-primary absolute top-0 left-0 w-full h-full z-10 rounded-lg" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Spin>
      <Row className="mt-6" justify="center">
        <Col>
          <Pagination
            showSizeChanger={false}
            current={page}
            pageSize={12}
            onChange={(page) => setPage(page)}
            total={dataVideos?.data?.length}
          />
        </Col>
      </Row>
    </Modal>
  )
}
