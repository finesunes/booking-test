import React, { useMemo } from 'react'
import { Box, styled, TextField } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import moment from 'moment'

const StyledBox = styled(Box)`
  display: inline-grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  grid-template-columns: auto auto auto;
  grid-column-gap: 3rem;
  margin: 2rem 0;
`

type PropsType = {
  dateTimestamp?: number
  onChange(v: number): void
}

const DatePicker: React.FC<PropsType> = ({ onChange, dateTimestamp = Date.now() }) => {
  const formattedDate = useMemo(() => moment(dateTimestamp).format(moment.HTML5_FMT.DATE), [dateTimestamp])

  const onChangeDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    onChange(Number(moment(e.target.value).format('x')))
  }

  const onChangeDay = (count: number) => () => {
    const newDate: moment.Moment = moment(formattedDate).add(count, 'day')

    onChange(Number(newDate.format('x')))
  }

  return <StyledBox>
    <ArrowBackIcon onClick={onChangeDay(-1)} fontSize='large'/>
    <TextField value={formattedDate} onChange={onChangeDate} type='date' />
    <ArrowForwardIcon onClick={onChangeDay(1)} fontSize='large'/>
  </StyledBox>
}

export default React.memo(DatePicker)
