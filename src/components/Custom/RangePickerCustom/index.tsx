'use client'

import { Button, Col, ConfigProvider, DatePicker, Row, Space } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import dayjs, { Dayjs } from 'dayjs'
import { map } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

type PropsCustom = {
  onSubmit: (value: [Dayjs, Dayjs]) => void
}

type Props = RangePickerProps & PropsCustom

const rangePresets: {
  label: string
  value: [Dayjs, Dayjs]
}[] = [
  { label: 'Today', value: [dayjs(), dayjs()] },
  { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')] },
  { label: 'Last week', value: [dayjs().add(-1, 'w').startOf('w'), dayjs().add(-1, 'w').endOf('w')] },
  { label: 'Last month', value: [dayjs().add(-1, 'M').startOf('M'), dayjs().add(-1, 'M').endOf('M')] },
  { label: 'Last 7 days', value: [dayjs().add(-7, 'd'), dayjs().add(-1, 'd')] },
  { label: 'Last 30 days', value: [dayjs().add(-30, 'd'), dayjs().add(-1, 'd')] },
  { label: 'Last 90 days', value: [dayjs().add(-90, 'd'), dayjs().add(-1, 'd')] },
  { label: 'Last 12 months', value: [dayjs().add(-12, 'M').add(-1, 'd'), dayjs().add(-1, 'd')] },
  { label: 'This year', value: [dayjs().startOf('y'), dayjs().add(-1, 'd')] },
]

export const RangePickerCustom: React.FC<Props> = (props) => {
  const [initialValue, setInitialValue] = useState(props?.value)
  const [value, setValue] = useState(props?.value)
  const [open, setOpen] = useState(false)
  const [presetSelected, setPresetSelected] = useState('Last 30 days')

  //update presetSelected when value change
  useEffect(() => {
    const preset = rangePresets.find((item) => {
      return value && item.value[0].isSame(value[0] as any, 'd') && item.value[1].isSame(value[1] as any, 'd')
    })
    if (preset) {
      setPresetSelected(preset.label)
    } else {
      setPresetSelected('')
    }
  }, [value])

  const ref = useRef(null)

  useOnClickOutside(ref, (event: any) => {
    const pickers = document.getElementsByClassName('ant-picker-dropdown')
    if (pickers.length > 0) {
      const picker = pickers[0]
      if (!picker.contains(event.target as Node)) {
        setValue(initialValue)
        setOpen(false)
      }
    }
  })

  return (
    <div ref={ref}>
      <ConfigProvider theme={{ token: { colorPrimary: '#714000' } }}>
        <DatePicker.RangePicker
          popupClassName="custom-range-picker"
          {...props}
          presets={map(rangePresets, (item) => {
            return {
              label:
                presetSelected === item.label ? (
                  <span className="block px-2 bg-[#edeadf]">{item.label}</span>
                ) : (
                  <span className="block px-2">{item.label}</span>
                ),
              value: item.value,
            }
          })}
          value={value}
          onCalendarChange={(dates) => {
            setValue(dates as [Dayjs, Dayjs])
          }}
          open={open}
          onOpenChange={(open: boolean) => {
            if (open) {
              setOpen(open)
            }
          }}
          inputReadOnly={false}
          renderExtraFooter={() => (
            <ConfigProvider theme={{ token: { colorPrimary: '#C5AE8F' } }}>
              <Row justify="end" className="py-2 px-3">
                <Col>
                  <Space>
                    <Button
                      onClick={() => {
                        setValue(initialValue)
                        setOpen(false)
                        if (props?.onSubmit) {
                          props?.onSubmit(initialValue as [Dayjs, Dayjs])
                        }
                      }}
                      className="font-semibold text-gray800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        setInitialValue(value)
                        setOpen(false)
                        if (props?.onSubmit) {
                          props?.onSubmit(value as [Dayjs, Dayjs])
                        }
                      }}
                      className="font-semibold text-gray800"
                    >
                      Apply
                    </Button>
                  </Space>
                </Col>
              </Row>
            </ConfigProvider>
          )}
        />
      </ConfigProvider>
    </div>
  )
}
