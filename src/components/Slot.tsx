import React from 'react'
import moment from 'moment'

import { SLOT_STATUS } from '../utils/variables'

import StyledSlot from './StyledSlot'

type PropsType = {
  time: number,
  status: SLOT_STATUS,
}

const Slot: React.FC<PropsType> = ({ time, status }) =>
  <StyledSlot status={status}>
    { moment(time).format('hh:mm')}
  </StyledSlot>

export default React.memo(Slot)
