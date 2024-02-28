'use client'

import { Typography } from 'antd'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { IconVideo } from '@/components'

type Props = {
  block: Video
}

export const BlockVideo: React.FC<Props> = ({ block }) => {
  const [playing, setPlaying] = useState(false)
  return (
    <div>
      {!isEmpty(block?.videos?.[0]?.src) ? (
        <div className="w-full h-auto" onClick={() => setPlaying(!playing)}>
          <ReactPlayer
            playing={playing}
            className="flex"
            url={`${block?.videos?.[0]?.src}/variants/original`}
            width="100%"
            height="100%"
          />
          <div className="absolute top-0 left-0 w-full h-full z-10" />
        </div>
      ) : (
        <div className="p-4">
          <PreviewBlockVideo />
        </div>
      )}
    </div>
  )
}

export const PreviewBlockVideo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray100 border border-gray300 px-4 py-20">
      <IconVideo className="mb-2" />
      <Typography.Paragraph className="mb-0 text-gray700 text-xs font-semibold">Video</Typography.Paragraph>
      <Typography.Paragraph className="mb-0 text-gray400 text-xs">Upload your design here</Typography.Paragraph>
    </div>
  )
}
