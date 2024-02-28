'use client'

import { App, Col, Modal, Pagination, Row, Spin, Typography } from 'antd'
import { filter, includes, map } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getImageSize } from 'react-image-size'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { css } from '@emotion/css'
import { IconImageAdd, IconTrash, UploadMedia } from '@/components'
import { useDeleteMediaLibraryMutation, useGetMediaLibraryQuery, useGetUserInfoQuery } from '@/hooks'
import { MediaLibrary, MediaLibraryMode, UploadMediaMode } from '@/types'

type Props = {
  mode?: MediaLibraryMode
  isVisible?: boolean
  setIsVisible?: (isVisible: boolean) => void
  onOk?: (selectedMedia: MediaLibrary[]) => void
  typeImage?: string
  accept?: string
  maxSize?: number
}

export const ImagesLibrary: React.FC<Props> = ({
  mode = MediaLibraryMode.Single,
  isVisible,
  setIsVisible,
  onOk,
  typeImage,
  accept,
  maxSize = 15,
}) => {
  const { modal } = App.useApp()
  const [page, setPage] = useState(1)
  const { data: dataMediaLibrary } = useGetMediaLibraryQuery({
    page: 0,
    size: 1000,
  })
  const { data: userInfo } = useGetUserInfoQuery()
  const { mutate: onDelete, isLoading } = useDeleteMediaLibraryMutation()
  const [images, setImages] = useState<MediaLibrary[]>([])

  const dataImages = useMemo(
    () => ({
      data: filter(dataMediaLibrary?.data, (i) => includes(i?.type, 'image')),
      totalRecords: dataMediaLibrary?.totalRecords,
    }),
    [dataMediaLibrary?.data, dataMediaLibrary?.totalRecords]
  )

  useEffect(() => {
    setImages(
      map(
        filter(dataImages?.data, (_, index) => index >= (page - 1) * 12 && index < page * 12),
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
  }, [dataImages?.data, page])

  const onSelectImages = useCallback(
    (id?: string) => {
      const newImages = map(images, (img) => ({
        ...img,
        ...(mode === MediaLibraryMode.Single && {
          isSelected: false,
        }),
        ...(img?.id === id && {
          isSelected: !img?.isSelected,
        }),
      }))
      setImages(newImages)
    },
    [images, mode]
  )

  const onReset = useCallback(() => {
    const newImages = map(images, (img) => ({
      ...img,
      isSelected: false,
    }))
    setImages(newImages)
    setIsVisible && setIsVisible(false)
  }, [images, setIsVisible])

  const onClickOk = useCallback(async () => {
    const selectedImages = filter(images, (img) => img?.isSelected)
    let newSelectedImages: MediaLibrary[] = []
    for (let index = 0; index < selectedImages.length; index++) {
      const element = selectedImages[index]
      const { width, height } = await getImageSize(element?.url)
      const ratio = width / height
      newSelectedImages = [
        ...newSelectedImages,
        {
          ...element,
          ratio,
          width,
          height,
        },
      ]
    }
    onOk && onOk(newSelectedImages)
    onReset()
  }, [images, onOk, onReset])

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
      title="Images Library"
      width={768}
      destroyOnClose
      open={isVisible}
      okButtonProps={{
        disabled: !filter(images, (img) => img?.isSelected).length,
      }}
      onOk={onClickOk}
      onCancel={onReset}
    >
      <UploadMedia uploadMode={UploadMediaMode.Image} accept={accept} maxSize={maxSize}>
        <>
          <IconImageAdd width={48} height={48} />
          <Typography.Paragraph className="mt-4 mb-2">
            <span className="text-blueDark600 font-medium">Upload an image</span> or drag and drop
          </Typography.Paragraph>
          <Typography.Paragraph className="text-sm">
            {typeImage} up to {maxSize}MB
          </Typography.Paragraph>
        </>
      </UploadMedia>
      <Spin spinning={isLoading}>
        <div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {map(images, (img) => (
              <div key={img?.id} className={classNameImg}>
                <div
                  className="cursor-pointer h-40 rounded-lg relative bg-[#00000009]"
                  onClick={() => onSelectImages(img?.id)}
                >
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
                            id: img?.id,
                            fileName: img?.fileName,
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
                  <img src={img?.url} className="object-contain w-full h-full rounded-lg" />
                  {img?.isSelected && (
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
            total={dataImages?.data?.length}
          />
        </Col>
      </Row>
    </Modal>
  )
}
