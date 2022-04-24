import React, { useCallback, useMemo, useState } from 'react'

import Slot from './Slot'
import DatePicker from './DatePicker'

import { getBookedSlotsInline, roundTimeToDays, toBookSlots } from '../utils'
import { BOOKING_INTERVAL, NUMBER_OF_SLOTS_IN_ONE_HOUR, SLOT_STATUS, WORKDAY } from '../utils/variables'

const emptySlots = Array.from(new Array((WORKDAY.endTime - WORKDAY.startTime) * NUMBER_OF_SLOTS_IN_ONE_HOUR))

const Timetable: React.FC<{}> = () => {
  const [date, setDate] = useState<number>(roundTimeToDays(Date.now()))
  const [startSlot, setStartSlot] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

  const startTimeOfWorkday = useMemo<number>(() => date + WORKDAY.startTimeInMs, [date])
  const bookedSlots = useMemo(() => getBookedSlotsInline(date), [date, startSlot])
  const intersections = useMemo<number>(() => {
    if (!bookedSlots || !selectedSlot || !startSlot) return 0

    const _start = startSlot < selectedSlot ? startSlot : selectedSlot
    const _end = startSlot < selectedSlot ? selectedSlot : startSlot

    return bookedSlots.filter(v => v >= _start && v <= _end).length
  }, [selectedSlot])

  const isBookedSlot = useCallback((time: number) => !!bookedSlots?.includes(time), [bookedSlots])
  const computeSlotStatus = (slotTime: number): SLOT_STATUS => {
    if (startSlot && !selectedSlot && slotTime === startSlot) {
      return SLOT_STATUS.selected
    }

    if (startSlot && selectedSlot) {
      if ((startSlot < selectedSlot && slotTime >= startSlot && slotTime <= selectedSlot) ||
        (startSlot > selectedSlot && slotTime <= startSlot && slotTime >= selectedSlot)) {
        return intersections === 0 ? SLOT_STATUS.selected : SLOT_STATUS.error
      }
    }

    if (isBookedSlot(slotTime)) {
      return SLOT_STATUS.booked
    }

    return SLOT_STATUS.open
  }

  const onSlotClick = (time: number) => {
    if (intersections > 0 || isBookedSlot(time)) return

    if (!startSlot) return setStartSlot(time)

    if (startSlot && time === startSlot) return setStartSlot(null)

    if (startSlot && selectedSlot && time === selectedSlot) {
      setStartSlot(null)
      setSelectedSlot(null)

      if (startSlot > selectedSlot) return toBookSlots(date, selectedSlot, startSlot)

      return toBookSlots(date, startSlot, selectedSlot)
    }
  }
  const onSlotHover = useCallback((v: number) => {
    if (startSlot === v) return setSelectedSlot(null)
    if (startSlot) return setSelectedSlot(v)
  }, [startSlot])

  const onChangeDate = useCallback((timeStamp: number) => {
    setDate(timeStamp)
    setStartSlot(null)
    setSelectedSlot(null)
  }, [])

  const slots = useMemo(() => {
    return emptySlots.map((_, idx) => {
      const slotStartTime = startTimeOfWorkday + idx * BOOKING_INTERVAL
      const status = computeSlotStatus(slotStartTime)

      return <div key={slotStartTime} onClick={() => onSlotClick(slotStartTime)} onMouseEnter={() => onSlotHover(slotStartTime)}>
        <Slot time={slotStartTime} status={status} />
      </div>
    })
  }, [startTimeOfWorkday, startSlot, selectedSlot])

  return <>
    <DatePicker onChange={onChangeDate} dateTimestamp={date} />
    { slots }
  </>
}

export default Timetable
