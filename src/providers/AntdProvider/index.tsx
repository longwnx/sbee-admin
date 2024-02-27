'use client'

import { App, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import { useServerInsertedHTML } from 'next/navigation'
import { useMemo } from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import Entity from '@ant-design/cssinjs/lib/Cache'

type Props = {
  children?: React.ReactNode
  colorPrimary?: string
}

export default function AntdProvider({ children, colorPrimary = '#C5AE8F' }: Props) {
  const cache = useMemo<Entity>(() => createCache(), [])

  useServerInsertedHTML(() => <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />)

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        locale={enUS}
        theme={{
          hashed: false,
          token: {
            colorPrimary,
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </StyleProvider>
  )
}
