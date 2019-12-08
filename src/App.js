import React from 'react'

import AppHeader from './AppHeader'
import Todos from './todos/Todos'

function App () {
  return (
    <>
      <AppHeader />
      <div className='container mt-1'>
        <Todos />
      </div>
    </>
  )
}

export default App
