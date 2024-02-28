import dayjs from 'dayjs'
import { includes, isNumber, isString, remove, round } from 'lodash'
import { getCurrencyCode } from '@/utils/storage'

export const reorderItemInArray = (list: any, startIndex: number, endIndex?: number) => {
  const result: any = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const insertItemToArr = (arr?: any, item?: any, index?: number) => {
  return [...arr.slice(0, index), item, ...arr.slice(index)]
}

export const replaceItemInArray = (arr: any, newValue: any, index: number) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

export const removeItemInArray = (arr?: any, index?: number) => {
  const newArr = [...arr]
  remove(newArr, (_, idx) => idx === index)
  return newArr
}

export const invertColor = (color: string) => {
  let hex = includes(color, '#') ? color : RGBAToHexA(color)
  if (hex?.indexOf('#') === 0) {
    hex = hex?.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex?.length === 3) {
    hex = hex?.[0] + hex?.[0] + hex?.[1] + hex?.[1] + hex?.[2] + hex?.[2]
  }
  if (hex?.length !== 6) {
    return 'dark'
  }
  const r = parseInt(hex?.slice(0, 2), 16),
    g = parseInt(hex?.slice(2, 4), 16),
    b = parseInt(hex?.slice(4, 6), 16)

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'light' : 'dark'
}

export const genCode = () => {
  const length = 10
  const date = Date.now().toString()

  let charset = ''
  charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  charset += 'abcdefghijklmnopqrstuvwxyz'
  charset += date

  let code = ''
  for (let i = 0; i < length; i++) {
    code += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return code.toLocaleUpperCase()
}

export const RGBAToHexA = (rgba?: string, forceRemoveAlpha = false) => {
  return (
    '#' +
    rgba
      ?.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
      ?.split(',') // splits them at ","
      ?.filter((_, index) => !forceRemoveAlpha || index !== 3)
      ?.map((string) => parseFloat(string)) // Converts them to numbers
      ?.map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
      ?.map((number) => number.toString(16)) // Converts numbers to hex
      ?.map((string) => (string.length === 1 ? '0' + string : string)) // Adds 0 when length of one number is 1
      ?.join('')
  ) // Puts the array to tog to a string
}

export const countObjKey = (obj: any) => Object.keys(obj)?.length

export const getVideoDimensionsOf = (url: string) => {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.addEventListener(
      'loadedmetadata',
      function () {
        const height = this.videoHeight
        const width = this.videoWidth
        resolve({ height, width })
      },
      false
    )
    video.src = url
  })
}

export const formatCurrency = (x: number, precision?: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: getCurrencyCode() || 'USD',
    maximumFractionDigits: precision || 0,
  }).format(x)
}

export const formatCurrencyOrNumber = (x?: number) => {
  if (isNumber(x) || isString(x)) {
    return x
      ?.toFixed(2)
      ?.replaceAll('.00', '')
      ?.toString()
      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return ''
}

export const formatPercent: any = (x?: number) => {
  return x
    ?.toFixed(2)
    ?.replaceAll('.00', '')
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const findById: any = (key: string, data: any, value: any) => {
  const iter = (a: any) => {
    if (a?.[key] === value) {
      result = a
      return true
    }
    return Array.isArray(a.children) && a.children.some(iter)
  }

  let result
  data.some(iter)
  return result
}

export const searchInTree: any = (key: string, data: any, value: any) => {
  const iter = (a: any) => {
    if (a?.[key]?.includes(value)) {
      result = [...result, a]
    }
    return Array.isArray(a.children) && a.children.some(iter)
  }

  let result: any = []
  data?.some(iter)
  return result
}

export const updatePropertyInTree: any = (data: any, property: any, value: any) => {
  data[property] = value
  if (data.children !== undefined && data.children.length > 0) {
    for (let i = 0; i < data.children.length; i++) {
      data.children[i] = updatePropertyInTree(data.children[i], property, value)
    }
  }

  return data
}

export const fancyTimeFormat = (duration: number) => {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600)
  const mins = ~~((duration % 3600) / 60)
  const secs = ~~duration % 60

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = ''

  if (hrs > 0) {
    ret += '' + hrs + 'h ' + (mins < 10 ? '0' : '')
  }

  ret += '' + mins + 'm ' + (secs < 10 ? '0' : '')
  ret += '' + secs + 's'

  return ret
}

export const isDay = (timestamp: string, day: string) =>
  new Date(timestamp).toLocaleDateString('en-US', { weekday: 'short' }) === day

export const getStatusSubscription = (status: string) => {
  switch (status) {
    case 'live':
      return {
        color: 'green',
        text: 'Live - Subscriptions that are currently active and paid up-to-date (off subs case)',
      }
    case 'trial':
      return {
        color: 'blue',
        text: 'Trial - Subscriptions under the trial period',
      }
    case 'dunning':
      return {
        color: 'orange',
        text: 'Dunning - Subscriptions which are in Dunning State',
      }
    case 'unpaid':
      return {
        color: 'red',
        text: 'Unpaid - Subscriptions that are not paid by the customers and are marked as Unpaid by the Retry Settings',
      }
    case 'non_renewing':
      return {
        color: 'red',
        text: 'Non Renewing - Subscriptions that have been canceled using the Cancel On Next Renewal option. Subscriptions in non renewing state will not be renewed after the current billing cycle',
      }
    case 'cancelled':
      return {
        color: 'gray',
        text: 'Cancelled - Subscriptions that have been canceled. It could be due to manual cancellation or automatic cancellation configured in Retry Settings',
      }
    case 'expired':
      return {
        color: 'gray',
        text: 'Expired - Subscription whose subscription period has expired',
      }
    case 'trial_expired':
      return {
        color: 'gray',
        text: 'Trial Expired - Subscriptions whose trial period has expired',
      }
    case 'future':
      return {
        color: 'gray',
        text: 'Future - Subscriptions that are created but not yet live i.e. their activation date is ahead of the current date',
      }
    default:
      return {
        color: 'gray',
      }
  }
}

export const stackedChartTooltip = (
  series: [],
  seriesIndex: number,
  dataPointIndex: number,
  w: any,
  prefix?: string,
  suffix?: string,
  precision?: number
) => {
  //console.log(series, seriesIndex, dataPointIndex, w)
  let html = `
    <div class="apexcharts-tooltip-title text-xs">
      ${dayjs(w.globals.seriesX[seriesIndex][dataPointIndex]).format('ddd, MMM DD')}
    </div>`

  for (let i = 0; i < series.length; i++) {
    if (!w.globals.collapsedSeriesIndices.includes(i)) {
      html += `
        <div class="apexcharts-tooltip-series-group flex">
          <span class="apexcharts-tooltip-marker" style="background-color:${w.globals.colors[i]}"></span>
          <div class="apexcharts-tooltip-text text-xs">
            <div class="apexcharts-tooltip-y-group">
              <span class="apexcharts-tooltip-text-y-label">${w.globals.seriesNames[i]}:</span>
              <span class="apexcharts-tooltip-text-y-value">
                ${
                  (prefix === '$'
                    ? formatCurrency(series[i][dataPointIndex], 2)
                    : (prefix || '') + series[i][dataPointIndex]) + (suffix || '')
                }
                ${
                  w.globals.collapsedSeriesIndices.length < series.length - 1
                    ? ' (' + round(w.globals.seriesPercent[i][dataPointIndex], precision || 0) + '%)'
                    : ''
                }
              </span>
            </div>
          </div>
        </div>`
    }
  }

  if (w.globals.collapsedSeriesIndices.length < series.length - 1) {
    html += `
      <div class="apexcharts-tooltip-series-group flex border-t border-t-gray250 border-solid">
        <div class="apexcharts-tooltip-text text-xs">
          <div class="apexcharts-tooltip-y-group">
            <span class="apexcharts-tooltip-text-y-label">Total:</span>
            <span class="apexcharts-tooltip-text-y-value">
              ${
                (prefix === '$'
                  ? formatCurrency(w.globals.stackedSeriesTotals[dataPointIndex], 2)
                  : (prefix || '') + w.globals.stackedSeriesTotals[dataPointIndex]) + (suffix || '')
              }
            </span>
          </div>
        </div>
      </div>`
  }

  return html
}

export const lineChartTooltip = (
  series: [],
  seriesIndex: number,
  dataPointIndex: number,
  w: any,
  prefix?: string,
  suffix?: string,
  precision?: number
) => {
  //console.log(series, seriesIndex, dataPointIndex, w)
  let html = `
    <div class="apexcharts-tooltip-title text-xs">
      ${dayjs(w.globals.seriesX[seriesIndex][dataPointIndex]).format('ddd, MMM DD')}
    </div>`

  for (let i = 0; i < series.length; i++) {
    if (!w.globals.collapsedSeriesIndices.includes(i)) {
      html += `
        <div class="apexcharts-tooltip-series-group flex">
          <span class="apexcharts-tooltip-marker" style="background-color:${w.globals.colors[i]}"></span>
          <div class="apexcharts-tooltip-text text-xs">
            <div class="apexcharts-tooltip-y-group">
              <span class="apexcharts-tooltip-text-y-label">${w.globals.seriesNames[i]}:</span>
              <span class="apexcharts-tooltip-text-y-value">
                ${
                  (prefix === '$'
                    ? formatCurrency(series[i][dataPointIndex], 2)
                    : (prefix || '') + series[i][dataPointIndex]) + (suffix || '')
                }
                ${
                  w.globals.collapsedSeriesIndices.length < series.length - 1
                    ? ' (' + round(w.globals.seriesPercent[i][dataPointIndex], precision || 0) + '%)'
                    : ''
                }
              </span>
            </div>
          </div>
        </div>`
    }
  }

  return html
}

export const pieChartTooltip = (
  series: [],
  seriesIndex: number,
  dataPointIndex: number,
  w: any,
  title?: string,
  showPercent?: boolean,
  isRound?: boolean,
  suffix?: string
) => {
  //console.log(series, seriesIndex, dataPointIndex, w)
  return `<div class="apexcharts-tooltip-title text-xs">${title || w.globals.seriesNames[seriesIndex]}</div>
    <div class="apexcharts-tooltip-series-group flex">
      <span class="apexcharts-tooltip-marker" style="background-color:${w.globals.colors[seriesIndex]}"></span>
      <div class="apexcharts-tooltip-text text-xs">
        <div class="apexcharts-tooltip-y-group">
          <span class="apexcharts-tooltip-text-y-label">${w.globals.seriesNames[seriesIndex]}:</span>
          <span class="apexcharts-tooltip-text-y-value">
            ${isRound ? round(series[seriesIndex]) : round(series[seriesIndex], 2)}${suffix || ''}
            ${showPercent ? '(' + round(w.globals.seriesPercent[seriesIndex], 2) + '%)' : ''}</span>
        </div>
      </div>
    </div>`
}

export const barChartTooltip = (series: [], seriesIndex: number, dataPointIndex: number, w: any, title: string) => {
  return `<div class="apexcharts-tooltip-title text-xs">${title}</div>
    <div class="apexcharts-tooltip-series-group flex">
      <span class="apexcharts-tooltip-marker" style="background-color: ${w.globals.colors[seriesIndex]}"></span>
      <div class="apexcharts-tooltip-text text-xs">
        <div class="apexcharts-tooltip-y-group">
          <span class="apexcharts-tooltip-text-y-label">${w.globals.labels[dataPointIndex]}</span>
          <span class="apexcharts-tooltip-text-y-value">${series[seriesIndex][dataPointIndex]}%</span>
        </div>
      </div>
    </div>`
}

export const funnelChartTooltip = (
  series: number[][],
  seriesIndex: number,
  dataPointIndex: number,
  w: any,
  title?: string
) => {
  //console.log(series, seriesIndex, dataPointIndex, w)
  let html = `<div class="apexcharts-tooltip-title text-xs">${title || w.globals.labels[dataPointIndex]}</div>
    <div class="apexcharts-tooltip-series-group flex">
      <div class="apexcharts-tooltip-text text-xs">
        <div class="apexcharts-tooltip-y-group">
          <span class="apexcharts-tooltip-text-y-label">${w.globals.seriesNames[seriesIndex]}</span>
          <span class="apexcharts-tooltip-text-y-value">
            ${series[seriesIndex][dataPointIndex]}
            ${
              dataPointIndex > 0
                ? ' (' +
                  (series[seriesIndex][dataPointIndex - 1]
                    ? round((100 * series[seriesIndex][dataPointIndex]) / series[seriesIndex][dataPointIndex - 1], 2)
                    : 0) +
                  '%)'
                : ''
            }
          </span>
        </div>
      </div>
    </div>`

  if (dataPointIndex + 1 < series[seriesIndex].length) {
    html += `
      <div class="apexcharts-tooltip-series-group flex">
        <div class="apexcharts-tooltip-text text-xs">
          <div class="apexcharts-tooltip-y-group">
            <span class="apexcharts-tooltip-text-y-label">Drop-off</span>
            <span class="apexcharts-tooltip-text-y-value">
              ${series[seriesIndex][dataPointIndex] - series[seriesIndex][dataPointIndex + 1]}
              (${
                series[seriesIndex][dataPointIndex]
                  ? round(
                      (100 * (series[seriesIndex][dataPointIndex] - series[seriesIndex][dataPointIndex + 1])) /
                        series[seriesIndex][dataPointIndex],
                      2
                    )
                  : 0
              }%)
            </span>
          </div>
        </div>
      </div>`
  }

  return html
}

export const appActivityChartTooltip = (series: [], seriesIndex: number, dataPointIndex: number, w: any) => {
  //console.log(series, seriesIndex, dataPointIndex, w)
  const colorElm = w.globals.previousPaths.length
    ? `<span class="apexcharts-tooltip-marker" style="background-color:${w.globals.previousPaths[seriesIndex][dataPointIndex]['color']}"></span>`
    : ''
  return series[seriesIndex][dataPointIndex]
    ? `<div class="apexcharts-tooltip-title text-xs">${w.globals.seriesNames[seriesIndex]}, ${w.globals.labels[dataPointIndex]}</div>
    <div class="apexcharts-tooltip-series-group flex">
      ${colorElm}
      <div class="apexcharts-tooltip-text text-xs">
        <div class="apexcharts-tooltip-y-group">
          <span class="apexcharts-tooltip-text-y-label">Sessions:</span>
          <span class="apexcharts-tooltip-text-y-value">${series[seriesIndex][dataPointIndex]}</span>
        </div>
      </div>
    </div>`
    : null
}

export const pushOptInChartTooltip = (series: [][], seriesIndex: number, dataPointIndex: number, w: any, title?: string) => {
  //console.log(series, seriesIndex, dataPointIndex, w)
  const total = series[0][dataPointIndex] + series[1][dataPointIndex]
  let html = `<div class="apexcharts-tooltip-title text-xs">${title}</div>`

  for (let i = 0; i < w.globals.labels.length; i++) {
    html += `
    <div class="apexcharts-tooltip-series-group flex">
      <span class="apexcharts-tooltip-marker" style="background-color: ${w.globals.colors[i]}"></span>
      <div class="apexcharts-tooltip-text text-xs">
        <div class="apexcharts-tooltip-y-group">
          <span class="apexcharts-tooltip-text-y-label">${w.globals.labels[dataPointIndex]} ${
            i == 0 ? 'opt-in' : 'opt-out'
          }:</span>
          <span class="apexcharts-tooltip-text-y-value">
            ${series[i][dataPointIndex]} (${total === 0 ? 0 : round((100 * series[i][dataPointIndex]) / total, 0)}%)
          </span>
        </div>
      </div>
    </div>`
  }

  return html
}

export const activeUsersChartTooltip = (series: [][], seriesIndex: number, dataPointIndex: number, w: any) => {
  //console.log(series, seriesIndex, dataPointIndex, w)
  let html = `
  <div class="apexcharts-tooltip-title text-xs">
   ${dayjs(w.globals.seriesX[seriesIndex][dataPointIndex]).format('ddd, MMM DD')}
  </div>`

  for (let i = 0; i < series.length; i++) {
    if (!w.globals.collapsedSeriesIndices.includes(i)) {
      html += `
      <div class="apexcharts-tooltip-series-group flex">
        <span class="apexcharts-tooltip-marker" style="background-color:${w.globals.colors[i]}"></span>
        <div class="apexcharts-tooltip-text text-xs">
          <div class="apexcharts-tooltip-y-group">
            <span class="apexcharts-tooltip-text-y-label">${i === 0 ? 'DAU' : 'MAU'}:</span>
            <span class="apexcharts-tooltip-text-y-value">${series[i][dataPointIndex]}</span>
          </div>
        </div>
      </div>`
    }
  }

  if (w.globals.collapsedSeriesIndices.length < series.length - 1 && series[1][dataPointIndex]) {
    html += `
    <div class="apexcharts-tooltip-series-group flex border-t border-t-gray250 border-solid">
      <div class="apexcharts-tooltip-text text-xs">
        <div class="apexcharts-tooltip-y-group">
          <span class="apexcharts-tooltip-text-y-label">DAU/MAU:</span>
          <span class="apexcharts-tooltip-text-y-value">
            ${round((100 * series[0][dataPointIndex]) / series[1][dataPointIndex], 2)}%
          </span>
        </div>
      </div>
    </div>`
  }

  return html
}
