'use client'

import { Button, Col, Form, Input, InputNumber, Row, Switch, Typography } from 'antd'
import classNames from 'classnames'
import { filter, find, findIndex, map, times } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { ColorBox, OpenImageLibrary, SettingActionBlock } from '@/components'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { ActionType, BlockType, MediaLibrary } from '@/types'
import { removeItemInArray, replaceItemInArray } from '@/utils'

type Props = {
  setIsVisible?: (value: boolean) => void
}

const DEFAULT_COLUMNS = 4
const MAX_IMAGE_SLIDE = 8

export const SettingBlockImageSlide: React.FC<Props> = ({ setIsVisible }) => {
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [slotsImage, setSlotsImage] = useState<
    {
      image?: Asset
      isSelected?: boolean
    }[]
  >(
    times(MAX_IMAGE_SLIDE, () => ({
      isSelected: false,
    }))
  )
  const [columns, setColumns] = useState<number | null>()
  const [spacing, setSpacing] = useState(false)
  const [bgColor, setBgColor] = useState<string | undefined>('#FFFFFF')

  useEffect(() => {
    setColumns(selectedBlock?.columns || DEFAULT_COLUMNS)
    setSpacing(!!selectedBlock?.spacing?.inner)
    setBgColor(selectedBlock?.backgroundColor)
  }, [selectedBlock?.backgroundColor, selectedBlock?.columns, selectedBlock?.spacing?.inner])

  useEffect(() => {
    const newImages = map(selectedBlock?.images, (image, index: number) => ({
      image,
      isSelected: false,
      ...(index === 0 && { isSelected: true }),
    }))
    const newData = [
      ...newImages,
      ...times(MAX_IMAGE_SLIDE - newImages?.length, () => ({
        image: {},
        isSelected: false,
      })),
    ]
    setSlotsImage(newData as any)
  }, [selectedBlock?.images])

  const action = useMemo(() => {
    const findImage: any = find(slotsImage, (i) => i?.isSelected)
    return findImage?.image?.action
  }, [slotsImage])

  const setAction = useCallback(
    (action: Action) => {
      const newImage = map(slotsImage, (i) => ({
        ...i,
        ...(i?.isSelected && {
          image: {
            ...i?.image,
            action,
          },
        }),
      }))
      setSlotsImage(newImage)
    },
    [slotsImage]
  )

  const onSelectMedia = useCallback(
    (data: MediaLibrary[], index?: number) => {
      const findSrcIndex = index ?? findIndex(slotsImage, (i) => !i?.image?.src)
      if (findSrcIndex === -1) return
      const newData = replaceItemInArray(
        map(slotsImage, (i) => ({ ...i, isSelected: false })),
        {
          image: {
            src: data?.[0]?.url,
            ratio: data?.[0]?.ratio,
            width: data?.[0]?.width,
            height: data?.[0]?.height,
            thumbnail: data?.[0]?.thumbnailUrl,
            action: {
              type: ActionType.OpenCategory,
            },
          },
          isSelected: true,
        },
        findSrcIndex
      )
      setSlotsImage(newData)
    },
    [slotsImage]
  )

  const onRemoveMedia = useCallback(
    (index: number) => {
      const newData = removeItemInArray(slotsImage, index)
      setSlotsImage([
        ...newData,
        {
          image: {},
          isSelected: false,
        },
      ])
    },
    [slotsImage]
  )

  const onSave = useCallback(() => {
    const newData = map(
      filter(slotsImage, (img) => img?.image?.src),
      (i: { image?: Asset; isSelected?: boolean }) => i?.image
    )
    onUpdateBlockItem({
      images: newData,
      columns,
      spacing: {
        top: spacing ? 16 : 0,
        bottom: spacing ? 16 : 0,
        left: spacing ? 16 : 0,
        right: spacing ? 16 : 0,
        inner: spacing ? 8 : 0,
      },
      backgroundColor: bgColor,
    })
    setIsVisible?.(false)
    setCurrentIndexBlock(undefined)
  }, [bgColor, columns, onUpdateBlockItem, setCurrentIndexBlock, setIsVisible, slotsImage, spacing])

  return (
    <div className="h-full flex flex-col">
      <Form layout="vertical" className="h-full flex flex-col">
        <Scrollbars className="h-full flex-1">
          <div className="h-full flex flex-col px-4">
            {selectedBlock?.type === BlockType.Grid && (
              <>
                <div className="mb-4">
                  <Form.Item
                    className="mb-0"
                    label="Columns"
                    tooltip="Specify the desired number of columns within the range of 2 to 6"
                  >
                    <InputNumber className="w-full" size="large" value={columns} onChange={setColumns} min={2} max={6} />
                  </Form.Item>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <Typography.Paragraph className="font-semibold text-gray800 mb-0">Spacing</Typography.Paragraph>
                  <Switch checked={spacing} onChange={setSpacing} />
                </div>
                <div className="mb-4">
                  <Form.Item className="mb-0" label="Background color">
                    <div className="flex items-center justify-between">
                      <Input
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        size="large"
                        className="mr-2 flex-1"
                      />
                      <ColorBox color={bgColor} onChange={(color) => setBgColor(color)} />
                    </div>
                  </Form.Item>
                </div>
              </>
            )}
            <Typography.Paragraph className="font-semibold text-gray800 mb-2">Image</Typography.Paragraph>
            <Row gutter={[16, 16]}>
              {map(slotsImage, (i, index) => (
                <Col span={12} key={index}>
                  <div
                    className={classNames(
                      'rounded-lg',
                      i?.isSelected ? 'border border-gray500' : 'border border-transparent'
                    )}
                    onClick={() => {
                      if (!i?.image?.src) return
                      setSlotsImage(map(slotsImage, (i, idx) => ({ ...i, isSelected: idx === index })))
                    }}
                  >
                    <OpenImageLibrary
                      src={i?.image?.src}
                      showTitle={false}
                      className="h-20"
                      onUpload={(selectedMedia) => {
                        if (i?.image?.src) {
                          onSelectMedia(selectedMedia, index)
                        } else {
                          onSelectMedia(selectedMedia)
                        }
                      }}
                      onRemoveThumb={() => onRemoveMedia(index)}
                    />
                  </div>
                </Col>
              ))}
            </Row>
            {find(slotsImage, (i) => i?.isSelected) && <SettingActionBlock action={action} setAction={setAction} />}
          </div>
        </Scrollbars>
        <div className="p-4">
          <Button size="large" type="primary" block className="text-gray800 font-semibold text-sm" onClick={onSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}
