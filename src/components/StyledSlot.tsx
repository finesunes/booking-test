import { Box, BoxProps, styled } from '@mui/material'
import { SLOT_STATUS } from '../utils/variables'

type PropsType = BoxProps & {
  status: SLOT_STATUS
}

const statusColors = {
  [SLOT_STATUS.open]: 'white',
  [SLOT_STATUS.selected]: '#C6EF9A',
  [SLOT_STATUS.booked]: '#D29CFF',
  [SLOT_STATUS.error]: '#FBD89F'
}

const StyledSlot = styled(Box, { shouldForwardProp: propName => propName !== 'status' })<PropsType>(
  ({ status }) => ({
    background: statusColors[status],
    cursor: 'pointer',
    padding: 10,
    border: `1px solid ${statusColors[status]}`,
    '&:hover': {
      border: '1px solid black'
    }
  })
)

export default StyledSlot
