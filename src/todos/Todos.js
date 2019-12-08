import React from 'react'
import { observer } from 'mobx-react-lite'

import Todo, { formatDate } from './_Todos'

import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation'

const TodosHeader = observer(() => {
  const { all, remaining, completed  } = React.useContext(Todo)
  return (
    <Paper className='flex-between p-05'>
      <Chip
        color='default'
        variant="outlined"
        avatar={<Avatar>{all}</Avatar>}
        label='All'
      />
      <Chip
        color='secondary'
        variant="outlined"
        avatar={<Avatar>{remaining}</Avatar>}
        label='remaining'
      />
      <Chip
        color='primary'
        variant="outlined"
        avatar={<Avatar>{completed}</Avatar>}
        label='completed'
      />
    </Paper>
  )
})

const TodoItemView = observer(({ id, text, completed, createdAt, modifiedAt, setEditMode }) => {
  const { toggleCompleted, remove  } = React.useContext(Todo)
  return (
    <ListItem key={id} dense button onClick={e => toggleCompleted(id)}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          tabIndex={-1}
          checked={completed}
          disableRipple
          inputProps={{ 'aria-labelledby': id }}
        />
      </ListItemIcon>
      <ListItemText
        id={id}
        primary={text}
        secondary={
          <>
            <div>createdAt:  {formatDate(createdAt)}</div>
            <div>modifiedAt: {formatDate(modifiedAt)}</div>
          </>
        }
      />
      <ListItemSecondaryAction>
        <IconButton color='primary' edge="end" aria-label="edit" onClick={e => setEditMode(true)}>
          <EditIcon />
        </IconButton>
        <IconButton color='secondary' edge="end" aria-label="delete" onClick={e => remove(id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
})

const TodoItemForm = observer(({ editMode, todo = {}, setEditMode = v => v }) => {
  const { add, update  } = React.useContext(Todo)
  const [text, setText] = React.useState(todo ? todo.text : '')
  const handleSubmit = e => {
    e.preventDefault()
    if(text.trim().length > 2)
      if(editMode) {
        update({
            ...todo,
            text
          })
        setEditMode(false)
      }
      else
        add(text)
    setText('')
  }
  return (
    <form className='my-05 flex-center' onSubmit={handleSubmit}>
      <FormControl className={editMode ? 'w-75' : 'w-100'}>
        <InputLabel htmlFor="my-input">{editMode ? 'Change Todo Text' : 'Add Todo Text'}</InputLabel>
        <Input id='text' name='text' value={text} onChange={e => setText(e.target.value)} />
      </FormControl>
      {editMode &&
        <IconButton className='mt-1' color='secondary' edge="end" aria-label="cancel" onClick={e => setEditMode(false)}>
          <CancelPresentationIcon />
        </IconButton>
      }
    </form>
  )
})

const TodoItem = observer(({ todo }) => {
  const [editMode, setEditMode] = React.useState(false)
  if(editMode)
    return <TodoItemForm todo={todo} editMode={editMode} setEditMode={setEditMode} />
  return <TodoItemView {...todo} setEditMode={setEditMode} />
})

function Todos() {
  const { todos } = React.useContext(Todo)
  return (
    <div className='w-50 m-auto'>
      <TodoItemForm editMode={false} />
      <TodosHeader />
      <List>{todos.map( todo => <TodoItem key={todo.id} todo={todo} /> )}</List>
    </div>
  )
}

export default observer(Todos)
