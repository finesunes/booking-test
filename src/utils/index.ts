import moment from 'moment'
import { nanoid } from 'nanoid'
import { BOOKING_INTERVAL } from './variables'

export const roundTimeToDays = (date: number | string): number =>
  Number(moment(date).hour(0).minute(0).second(0).millisecond(0).format('x'))

type TimeGapType = {
  startTime: number
  endTime: number
}

type BookedSlotsType = {
  [key: string]: TimeGapType
}

export const toBookSlots = (date: number, startTime: number, endTime: number): void => {
  const _data = localStorage.getItem(date.toString())
  const data: BookedSlotsType = _data ? JSON.parse(_data) : {}

  data[nanoid()] = { startTime, endTime }

  localStorage.setItem(date.toString(), JSON.stringify(data))
}

export const getBookedSlots = (date: number): BookedSlotsType => {
  const _data = localStorage.getItem(date.toString())
  return _data ? JSON.parse(_data) : {}
}

export const getBookedSlotsInline = (date: number): number[] => {
  const data = getBookedSlots(date)

  if (!Object.keys(data).length) return []

  return Object.keys(data)
    .reduce((memo, key) => {
      const { startTime, endTime } = data[key]

      return memo.concat(generateSlots(startTime, endTime, BOOKING_INTERVAL))
    }, [] as number[])
    .sort((a, b) => a - b)
}

const generateSlots = (timeStart: number, timeEnd: number, gap: number): number[] =>
  Array.from(new Array(((timeEnd - timeStart) / gap) + 1), (_, idx) => timeStart + idx * gap)
