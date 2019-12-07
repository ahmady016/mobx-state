import React from 'react'
import { observer } from 'mobx-react-lite'
import Todo from '../store/Todo'

import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import InfoIcon from '@material-ui/icons/Info'
import Avatar from '@material-ui/core/Avatar'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'


function Todos() {
  const todoStore = React.useContext(Todo)
  return (
    <div className='w-50 m-auto'>
      <Paper className='flex-between'>
        <Chip
          icon={<InfoIcon />}
          variant="outlined"
          avatar={<Avatar>{todoStore.all}</Avatar>}
          label='All'
         />
        <Chip
          icon={<InfoIcon />}
          variant="outlined"
          avatar={<Avatar>{todoStore.remaining}</Avatar>}
          label='remaining'
         />
        <Chip
          icon={<InfoIcon />}
          variant="outlined"
          avatar={<Avatar>{todoStore.completed}</Avatar>}
          label='completed'
         />
      </Paper>
      <List>
        {todoStore.todos.map( ({ id, text, completed }) => (
          <ListItem key={id} dense button onClick={e => todoStore.toggleCompleted(id)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              tabIndex={-1}
              checked={completed}
              disableRipple
              inputProps={{ 'aria-labelledby': id }}
            />
          </ListItemIcon>
          <ListItemText id={id} primary={text} secondary={id} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={e => todoStore.remove(id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        ))}
      </List>
    </div>
  )
}

export default observer(Todos)
