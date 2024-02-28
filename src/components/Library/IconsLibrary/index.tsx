'use client'

import { Modal, Spin, Tabs } from 'antd'
import { find, map } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetListIconQuery } from '@/hooks'

type Props = {
  isVisible?: boolean
  setIsVisible?: (isVisible: boolean) => void
  onOk?: (iconset?: any) => void
}

export const IconsLibrary: React.FC<Props> = ({ isVisible, setIsVisible, onOk }) => {
  const { data: dataMediaLibrary, isLoading } = useGetListIconQuery()
  const [iconset, setIconset] = useState<any>()

  useEffect(() => {
    setIconset(dataMediaLibrary?.data)
  }, [dataMediaLibrary?.data])

  const onSelectImages = useCallback(
    (code?: string, name?: string) => {
      const newImages = map(iconset, (icon) => ({
        ...icon,
        ...(icon?.name === name && {
          icons: map(icon?.icons, (i) => ({
            ...i,
            isSelected: false,
            ...(i?.code === code && {
              isSelected: !i?.isSelected,
            }),
          })),
        }),
      }))
      setIconset(newImages)
    },
    [iconset]
  )

  const onReset = useCallback(() => {
    const newImages = map(iconset, (icon) => ({
      ...icon,
      icons: map(icon?.icons, (i) => ({
        ...i,
        isSelected: false,
      })),
    }))
    setIconset(newImages)
    setIsVisible?.(false)
  }, [iconset, setIsVisible])

  const findSelectedIconSet = useMemo(() => find(iconset, (icon) => find(icon?.icons, (i) => i?.isSelected)), [iconset])

  const onClickOk = useCallback(async () => {
    const findIcon: any = find(findSelectedIconSet?.icons, (icon) => icon?.isSelected)
    onOk?.({
      source: {
        uri: findIcon?.src,
      },
      name: findSelectedIconSet?.name,
      color: '#1D2939',
      selectedColor: '#C5AE8F',
    })
    onReset()
  }, [findSelectedIconSet?.icons, findSelectedIconSet?.name, onOk, onReset])

  return (
    <Modal
      title="Icons Library"
      width="80%"
      destroyOnClose
      open={isVisible}
      okButtonProps={{
        disabled: !findSelectedIconSet,
      }}
      onOk={onClickOk}
      onCancel={onReset}
    >
      <Spin spinning={isLoading}>
        <Tabs
          tabPosition="left"
          items={map(iconset, (i) => ({
            key: i?._id,
            label: i?.label,
            children: (
              <div className="grid grid-cols-12 gap-4">
                {map(i?.icons, (icon, index) => (
                  <div
                    key={index}
                    className="cursor-pointer rounded-lg relative flex items-center justify-center"
                    onClick={() => onSelectImages(icon?.code, i?.name)}
                  >
                    <img src={icon?.src} className="object-contain w-8 h-8 rounded-lg p-1" />
                    {icon?.isSelected && (
                      <div className="border-2 border-primary absolute top-0 left-0 w-full h-full z-10 rounded-lg" />
                    )}
                  </div>
                ))}
              </div>
            ),
          }))}
        />
      </Spin>
    </Modal>
  )
}
