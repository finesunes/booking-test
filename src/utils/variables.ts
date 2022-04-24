export enum WORKDAY {
  // eslint-disable-next-line no-unused-vars
  startTime = 8,
  // eslint-disable-next-line no-unused-vars
  endTime = 20,

  // eslint-disable-next-line no-unused-vars
  startTimeInMs = WORKDAY.startTime * 60 * 60 * 1000,
  // eslint-disable-next-line no-unused-vars
  endTimeInMs = WORKDAY.endTime * 60 * 60 * 1000
}

export enum SLOT_STATUS {
  // eslint-disable-next-line no-unused-vars
  open = 10,
  // eslint-disable-next-line no-unused-vars
  selected = 20,
  // eslint-disable-next-line no-unused-vars
  booked = 30,
  // eslint-disable-next-line no-unused-vars
  error = 40,
}

export const BOOKING_INTERVAL: number = 15 * 60 * 1000
export const NUMBER_OF_SLOTS_IN_ONE_HOUR: number = 60 * 60 * 1000 / BOOKING_INTERVAL
