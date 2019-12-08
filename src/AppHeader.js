import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

function AppHeader () {
  const [tabIndex, setTabIndex] = React.useState(0)
  return (
    <AppBar position="fixed">
      <Toolbar className='flex-between'>
        <div className='flex-between'>
          <IconButton edge="start" color="default" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className='px-05' variant="h6">Mobx State</Typography>
        </div>
        <Tabs
          aria-label="app nav links"
          textColor="default"
          indicatorColor="secondary"
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
        >
          <Tab label="Todos"  className='font-s-11' />
          <Tab label="Books"  className='font-s-11' />
          <Tab label="Movies" className='font-s-11' />
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
