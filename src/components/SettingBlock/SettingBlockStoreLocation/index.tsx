'use client'

import { Button, Form, Input, Modal, Switch, Typography } from 'antd'
import dayjs from 'dayjs'
import { find, isEmpty, map } from 'lodash'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSetRecoilState } from 'recoil'
import { v4 } from 'uuid'
import { Autocomplete, useLoadScript } from '@react-google-maps/api'
import { OpenImageLibrary } from '@/components'
import { env } from '@/config'
import { useModifyUiPages, useSelectedPageBlock } from '@/hooks'
import { currentIndexBlockState } from '@/recoil'
import { MediaLibrary } from '@/types'

type Props = {
  setIsVisible?: (value: boolean) => void
}

const TextEditor = dynamic(() => import('@/components/Dynamic/TextEditor'), { ssr: false })

const initOpenDays = [
  {
    id: v4(),
    label: 'Monday',
    type: 'monday',
    time: '',
  },
  {
    id: v4(),
    label: 'Tuesday',
    type: 'tuesday',
    time: '',
  },
  {
    id: v4(),
    label: 'Wednesday',
    type: 'wednesday',
    time: '',
  },
  {
    id: v4(),
    label: 'Thursday',
    type: 'thursday',
    time: '',
  },
  {
    id: v4(),
    label: 'Friday',
    type: 'friday',
    time: '',
  },
  {
    id: v4(),
    label: 'Saturday',
    type: 'saturday',
    time: '',
  },
  {
    id: v4(),
    label: 'Sunday',
    type: 'sunday',
    time: '',
  },
]

export const SettingBlockStoreLocation: React.FC<Props> = ({ setIsVisible }) => {
  const [form] = Form.useForm()
  const setCurrentIndexBlock = useSetRecoilState(currentIndexBlockState)
  const { selectedBlock } = useSelectedPageBlock()
  const { onUpdateBlockItem } = useModifyUiPages()
  const [images, setImages] = useState<Asset[]>()
  const [showImage, setShowImage] = useState(false)
  const [phone, setPhone] = useState<string>()
  const [mail, setMail] = useState<string>()
  const [website, setWebsite] = useState<string>()
  const [descriptions, setDescriptions] = useState<string>()
  const [coordinates, setCoordinates] = useState<{
    lat?: number
    lng?: number
  }>()

  const [openDays, setOpenDays] = useState<
    {
      id: string
      label: string
      type: string
      time: string
    }[]
  >()
  const [openDaysDraft, setOpenDaysDraft] = useState<
    {
      id: string
      label: string
      type: string
      time: string
    }[]
  >()
  const [openOpeningHours, setOpenOpeningHours] = useState(false)

  const [searchResult, setSearchResult] = useState<any>()

  useEffect(() => {
    form.setFieldsValue({
      store: {
        address: selectedBlock?.store?.address,
        name: selectedBlock?.store?.name,
      },
    })
    setImages(selectedBlock?.images)
    setShowImage(selectedBlock?.images?.[0]?.visible)
    setPhone(selectedBlock?.store?.phone)
    setMail(selectedBlock?.store?.mail)
    setWebsite(selectedBlock?.store?.website)
    setDescriptions(selectedBlock?.descriptions)
    setCoordinates(selectedBlock?.coordinates)
    setOpenDays(selectedBlock?.openDays || initOpenDays)
    setOpenDaysDraft(selectedBlock?.openDays || initOpenDays)
  }, [
    form,
    selectedBlock?.coordinates,
    selectedBlock?.descriptions,
    selectedBlock?.images,
    selectedBlock?.openDays,
    selectedBlock?.store?.address,
    selectedBlock?.store?.mail,
    selectedBlock?.store?.name,
    selectedBlock?.store?.phone,
    selectedBlock?.store?.website,
  ])

  const onSelectMedia = useCallback((data: MediaLibrary[]) => {
    setImages([
      {
        src: data?.[0]?.url,
        ratio: data?.[0]?.ratio,
        width: data?.[0]?.width,
        height: data?.[0]?.height,
        thumbnail: data?.[0]?.thumbnailUrl,
      },
    ])
  }, [])

  const onRemoveThumb = useCallback(() => {
    setImages([])
  }, [])

  const onSave = useCallback(
    (values: any) => {
      onUpdateBlockItem({
        images: map(images, (i) => ({
          ...i,
          visible: showImage,
        })),
        store: {
          ...values?.store,
          phone,
          mail,
          website,
        },
        descriptions,
        coordinates,
        openDays,
      })
      setIsVisible?.(false)
      setCurrentIndexBlock(undefined)
    },
    [
      coordinates,
      descriptions,
      images,
      mail,
      onUpdateBlockItem,
      openDays,
      phone,
      setCurrentIndexBlock,
      setIsVisible,
      showImage,
      website,
    ]
  )

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.APP_GOOGLE_API_KEY,
    libraries: ['places'],
  })

  const onLoad = (autocomplete: any) => {
    setSearchResult(autocomplete)
  }

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const placeDetails = searchResult.getPlace()
      const lat = placeDetails?.geometry?.location?.lat()
      const lng = placeDetails?.geometry?.location?.lng()
      const src = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=1125x750&markers=color:red|label:S|${lat},${lng}&key=${env.APP_GOOGLE_API_KEY}`
      setImages([
        {
          src,
          ratio: 1.5,
          width: 1125,
          height: 750,
        },
      ])
      setCoordinates({
        lat,
        lng,
      })
      form.setFieldsValue({
        store: {
          address: placeDetails?.formatted_address,
        },
      })
    } else {
      alert('Please enter text')
    }
  }

  const getCurrenDay = dayjs().format('dddd').toLowerCase()
  const findCurrenDay = find(openDays, (item) => item.type === getCurrenDay)
  const isShowOpenDay = !isEmpty(findCurrenDay?.time)

  return (
    <div className="h-full flex flex-col">
      <Form form={form} onFinish={onSave} requiredMark={false} className="h-full flex flex-col" layout="vertical">
        <Scrollbars className="h-full flex-1">
          <div className="h-full flex flex-col px-4">
            <Form.Item
              label="Store name"
              className="mb-4"
              rules={[
                {
                  required: true,
                  message: 'Required!',
                },
              ]}
              name={['store', 'name']}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Store address"
              className="mb-4"
              rules={[
                {
                  required: true,
                  message: 'Required!',
                },
              ]}
              name={['store', 'address']}
            >
              <div className="flex items-center w-full relative">
                {isLoaded && (
                  <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad} className="w-full">
                    <input
                      defaultValue={form.getFieldValue(['store', 'address'])}
                      className="border border-[#d9d9d9] w-full h-[37px] rounded-lg pl-[11px] pr-10 py-[7px] outline-none"
                    />
                  </Autocomplete>
                )}
                {/* <IconStoreLocation className="absolute right-3 cursor-pointer" /> */}
              </div>
            </Form.Item>
            <div className="mb-4 flex items-center justify-between">
              <Typography.Paragraph className="font-medium text-gray800 mb-0">Show store image</Typography.Paragraph>
              <Switch checked={showImage} onChange={setShowImage} />
            </div>
            <div className="mb-4">
              <OpenImageLibrary src={images?.[0]?.src} onUpload={onSelectMedia} onRemoveThumb={onRemoveThumb} />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <Typography.Paragraph className="font-medium text-gray800 mb-0">Contact information</Typography.Paragraph>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <Typography.Paragraph className="font-medium text-gray800 mb-0">Phone</Typography.Paragraph>
            </div>
            <div className="mb-4">
              <Input size="large" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <Typography.Paragraph className="font-medium text-gray800 mb-0">Email</Typography.Paragraph>
            </div>
            <div className="mb-4">
              <Input size="large" value={mail} onChange={(e) => setMail(e.target.value)} />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <Typography.Paragraph className="font-medium text-gray800 mb-0">Website</Typography.Paragraph>
            </div>
            <div className="mb-4">
              <Input size="large" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <Typography.Paragraph className="font-medium text-gray800 mb-0">Opening hours</Typography.Paragraph>
            </div>
            <div className="mb-4">
              <Input
                size="large"
                value={isShowOpenDay ? `${findCurrenDay?.label} ${findCurrenDay?.time}` : ''}
                onChange={(e) => setWebsite(e.target.value)}
                readOnly
                className="cursor-pointer"
                onClick={() => setOpenOpeningHours(true)}
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <Typography.Paragraph className="font-medium text-gray800 mb-0">Description</Typography.Paragraph>
            </div>
            <div className="mb-4">
              <TextEditor content={descriptions} setContent={setDescriptions} />
            </div>
          </div>
        </Scrollbars>
        <div className="p-4">
          <Button size="large" type="primary" block className="text-gray800 font-semibold text-sm" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
      <Modal
        title="Opening hours"
        open={openOpeningHours}
        onCancel={() => setOpenOpeningHours(false)}
        onOk={() => {
          setOpenOpeningHours(false)
          setOpenDays(openDaysDraft)
        }}
      >
        {map(openDaysDraft, (day) => (
          <div className="mb-4 flex items-center justify-between" key={day?.type}>
            <Typography.Paragraph className="font-medium text-gray800 mb-0 w-40">{day?.label}</Typography.Paragraph>
            <Input
              size="large"
              value={day?.time}
              onChange={(e) => {
                const newOpenDays = map(openDaysDraft, (d) => ({
                  ...d,
                  ...(d?.type === day?.type && { time: e.target.value }),
                }))
                setOpenDaysDraft(newOpenDays)
              }}
              placeholder="08:00 AM - 09:00 PM"
            />
          </div>
        ))}
      </Modal>
    </div>
  )
}
