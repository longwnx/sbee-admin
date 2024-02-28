'use client'

import { Typography } from 'antd'
import { isEmpty, map } from 'lodash'
import { useRecoilValue } from 'recoil'
import { css } from '@emotion/css'
import { BLANK_IMAGE } from '@public'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { IconImageSlide } from '@/components'
import { layoutState } from '@/recoil'

type Props = {
  block: Slider
}

export const BlockImageSlide: React.FC<Props> = ({ block }) => {
  const layout = useRecoilValue(layoutState)
  const classNameSplide = css({
    '.splide__pagination__page': {
      backgroundColor: '#ffffff',
      '&.is-active': {
        backgroundColor: layout?.theme?.colour?.primary || '#1F2128',
      },
    },
  })
  return (
    <div>
      {!isEmpty(block?.images?.[0]?.src) ? (
        <Splide className={classNameSplide} options={{ arrows: false, pagination: block?.pagination?.visible, drag: false }}>
          {map(block?.images, (img, indexImg) => (
            <SplideSlide key={indexImg}>
              <div>
                <img src={img?.src || BLANK_IMAGE} className="max-w-full w-full h-auto" />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <div className="p-4">
          <PreviewBlockImageSlide />
        </div>
      )}
    </div>
  )
}

export const PreviewBlockImageSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray100 border border-gray300 px-4 py-20">
      <IconImageSlide className="mb-2" />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Image slider</Typography.Paragraph>
      <Typography.Paragraph className="mb-0 text-gray400 text-xs">Upload your design here</Typography.Paragraph>
      <div className="flex items-center justify-center mt-2">
        <div className="w-2 h-2 rounded-full bg-gray500" />
        <div className="w-2 h-2 rounded-full bg-gray300 mx-1" />
        <div className="w-2 h-2 rounded-full bg-gray300" />
      </div>
    </div>
  )
}
