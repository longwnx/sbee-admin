'use client'

import { Button, Modal, Select } from 'antd'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { css } from '@emotion/css'
import { IconClose } from '@/components/Icons'
import { env } from '@/config'
import { appKeyState, isVisiblePreviewAppState } from '@/recoil'

type Props = {}

const APP_PARAMS: any = {
  [env.APP_APPETIZER_IOS]: {
    device: 'iphone14promax',
    scale: '75',
    osVersion: '16.2',
    proxy: 'intercept',
  },
  [env.APP_APPETIZER_ANDROID]: {
    device: 'pixel6pro',
    scale: '65',
    osVersion: '13.0',
    proxy: 'intercept',
  },
}

export const ModalPreviewApp: React.FC<Props> = () => {
  const [isVisiblePreviewApp, setIsVisiblePreviewApp] = useRecoilState(isVisiblePreviewAppState)
  const appKey = useRecoilValue(appKeyState)
  const [type, setType] = useState(env.APP_APPETIZER_IOS)

  const className = css({
    '.ant-modal-content': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      padding: 0,
    },
  })

  return (
    <Modal
      width={414}
      className={className}
      closable={false}
      maskClosable={false}
      open={isVisiblePreviewApp}
      footer={false}
      onCancel={() => setIsVisiblePreviewApp(false)}
      destroyOnClose
      style={{ top: 20 }}
    >
      <div className="flex justify-center mb-4">
        <Select
          className="w-[70%]"
          value={type}
          onChange={setType}
          options={[
            {
              value: env.APP_APPETIZER_IOS,
              label: 'iOS',
            },
            {
              value: env.APP_APPETIZER_ANDROID,
              label: 'Android',
            },
          ]}
        />
        <Button icon={<IconClose />} className="ml-4" onClick={() => setIsVisiblePreviewApp(false)} />
      </div>
      <div className="w-full h-[830px]">
        <iframe
          src={`https://appetize.io/embed/${type}?device=${APP_PARAMS[type].device}&centered=horizontal&scale=${APP_PARAMS[type].scale}&proxy=${APP_PARAMS[type].proxy}&params=%7B%22app_key%22%3A%22${appKey}%22%7D`}
          className="border-0 w-full h-full m-auto"
        ></iframe>
      </div>
    </Modal>
  )
}
