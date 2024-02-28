'use client'

import { Col, Row } from 'antd'
import classNames from 'classnames'
import { find, map } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/css'
import { IconPlus } from '@/components'

type Props = {}

const DEFAULT_COLORS = [
  {
    color: '#F04438',
    isSelected: true,
  },
  {
    color: '#EF6820',
    isSelected: false,
  },
  {
    color: '#F79009',
    isSelected: false,
  },
  {
    color: '#EAAA08',
    isSelected: false,
  },
  {
    color: '#EE46BC',
    isSelected: false,
  },
  {
    color: '#2970FF',
    isSelected: false,
  },
  {
    color: '#0BA5EC',
    isSelected: false,
  },
  {
    color: '#06AED4',
    isSelected: false,
  },
  {
    color: '#12B76A',
    isSelected: false,
  },
  {
    color: '#875BF7',
    isSelected: false,
  },
  {
    color: '#66C61C',
    isSelected: false,
  },
]

export const SettingListColorPicker: React.FC<Props> = () => {
  const [colors, setColors] = useState(DEFAULT_COLORS)
  const findSelectedColor = useMemo(() => find(colors, (color) => color.isSelected), [colors])
  const className = css({
    '&:before': {
      content: '""',
      position: 'absolute',
      top: -3,
      left: -3,
      width: 38,
      height: 38,
      zIndex: 10,
      borderRadius: '50%',
      opacity: 0.6,
      border: `2px solid ${findSelectedColor?.color}`,
    },
  })

  const onSelecteColor = useCallback(
    (val: string) => {
      setColors(
        map(colors, (color) => {
          return {
            ...color,
            isSelected: false,
            ...(color.color === val && { isSelected: true }),
          }
        })
      )
    },
    [colors]
  )

  return (
    <Row gutter={[16, 16]} justify="space-between">
      {map(colors, (color, index) => (
        <Col key={index}>
          <div
            className={classNames('w-8 h-8 rounded-full cursor-pointer relative', color.isSelected && className)}
            style={{ backgroundColor: color.color }}
            onClick={() => onSelecteColor(color.color)}
          />
        </Col>
      ))}
      <Col>
        <div
          className={classNames(
            'w-8 h-8 rounded-full flex items-center justify-center border border-gray400 bg-gray200 cursor-pointer'
          )}
        >
          <IconPlus width={20} height={20} />
        </div>
      </Col>
    </Row>
  )
}
