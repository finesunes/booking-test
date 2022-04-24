import React from 'react'

import Timetable from './components/Timetable'
import Container from '@mui/material/Container'

const App: React.FC = () => {
  return <Container maxWidth='xs'>
    <Timetable />
  </Container>
}

export default App
