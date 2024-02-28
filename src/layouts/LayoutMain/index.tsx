'use client'

import classNames from 'classnames'
import { useCallback, useEffect } from 'react'
import { css } from '@emotion/css'
import { Footer, Header } from '@/components'
import { useDevice, useWindowBeforeUnload } from '@/hooks'
import { LayoutWrapper } from '@/layouts'

type Props = {
  children?: React.ReactNode
  isVisibleFooter?: boolean
  isLoadingOnSave?: boolean
  disabledSave?: boolean
  onSave?: any
}

export const LayoutMain: React.FC<Props> = ({ children, isVisibleFooter, onSave, isLoadingOnSave, disabledSave }) => {
  const { isMobile } = useDevice()

  useWindowBeforeUnload()

  const onDiscard = useCallback(() => {
    window.location.reload()
  }, [])

  const detectKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        !disabledSave && onSave?.()
      }
    },
    [disabledSave, onSave]
  )

  useEffect(() => {
    window.addEventListener('keydown', detectKeyDown)

    return () => {
      window.removeEventListener('keydown', detectKeyDown)
    }
  }, [detectKeyDown])

  const classNameFooter = css({
    transform: isMobile ? 'unset' : `translateY(${isVisibleFooter ? 0 : 48}px)`,
    transitionDuration: '0.1s',
  })

  return (
    <LayoutWrapper>
      <div className="h-screen flex flex-col relative pt-[64px] overflow-hidden">
        <div className="h-[64px] absolute top-0 right-0 w-full">
          <Header />
        </div>
        <div className="h-[calc(100vh-64px)] overflow-y-auto">{children}</div>
        <div
          className={classNames(
            'h-[48px] border-t border-gray100 md:absolute w-full bottom-0 right-0 z-50',
            classNameFooter
          )}
        >
          <Footer onDiscard={onDiscard} onSave={onSave} isLoading={isLoadingOnSave} disabledSave={disabledSave} />
        </div>
      </div>
    </LayoutWrapper>
  )
}
