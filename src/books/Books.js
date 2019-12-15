import React from 'react'
import { observer } from 'mobx-react-lite'
import BooksCtx, { formatDate, initialBook } from './_Books'
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'

import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

const BookImg = styled(Avatar)`
  width: 120px !important;
  height: 120px !important;
`

const BooksHeader = observer(({ setBookId }) => {
  const { allBooksCount, enBooksCount, arBooksCount } = React.useContext(BooksCtx)
  return (
    <Paper className='flex-between p-05'>
      <Chip
        color='default'
        variant="outlined"
        avatar={<Avatar>{allBooksCount}</Avatar>}
        label='All'
      />
      <Chip
        color='secondary'
        variant="outlined"
        avatar={<Avatar>{enBooksCount}</Avatar>}
        label='English'
      />
      <Chip
        color='primary'
        variant="outlined"
        avatar={<Avatar>{arBooksCount}</Avatar>}
        label='Arabic'
      />
      <Button variant="outlined" color="primary" onClick={e => setBookId('0')}>Add New Book</Button>
    </Paper>
  )
})

const BookForm = observer(({ bookId, setBookId }) => {
  const { books, add, update  } = React.useContext(BooksCtx)

  const book = books.find(book => book.id === bookId)
  const [state, setState] = React.useState(book || initialBook)

  const onChange = ({ target }) => void setState( state => ({ ...state, [target.name]: target.value }) )

  const save = e => {
    (bookId === '0') ? add(state) : update(state)
    setBookId('')
  }

  return (
    <form className='mb-05 row'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl className='w-100'>
            <InputLabel htmlFor="title">Book Title</InputLabel>
            <Input
              id='title'
              name='title'
              value={state.title}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className='w-100'>
            <InputLabel htmlFor="subtitle">Book Subtitle</InputLabel>
            <Input
              id='subtitle'
              name='subtitle'
              value={state.subtitle}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className='w-100'>
            <InputLabel htmlFor="description">Book Description</InputLabel>
            <Input
              id='description'
              name='description'
              value={state.description}
              onChange={onChange}
              multiline
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className='w-100'>
            <InputLabel htmlFor="imageUrl">Book Image Url</InputLabel>
            <Input
              id='imageUrl'
              name='imageUrl'
              value={state.imageUrl}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className='w-100'>
            <InputLabel htmlFor="publisher">Book Publisher</InputLabel>
            <Input
              id='publisher'
              name='publisher'
              value={state.publisher}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className='w-100'>
            <InputLabel htmlFor="language">Language</InputLabel>
            <Select
              id='language'
              name='language'
              value={state.language}
              onChange={onChange}
            >
              <MenuItem value='ar'>ar</MenuItem>
              <MenuItem value='en'>en</MenuItem>
              <MenuItem value='ru'>ru</MenuItem>
              <MenuItem value='fr'>fr</MenuItem>
              <MenuItem value='de'>de</MenuItem>
              <MenuItem value='es'>es</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className='w-100'>
            <InputLabel htmlFor="pageCount">Page Count</InputLabel>
            <Input
              id='pageCount'
              name='pageCount'
              value={state.pageCount}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <div className='ml-07 mt-1'>
          <Button className='mr-2' size='large' variant="contained" color="primary" onClick={save}>
            Save Book
          </Button>
          <Button className='' size='large' variant="contained" color="secondary" onClick={e => setBookId('')}>
            Cancel
          </Button>
        </div>
      </Grid>
    </form>
  )
})

const BookView = observer(({ id, title, subtitle, publisher, language, pageCount, imageUrl, createdAt, modifiedAt, setBookId }) => {
  const { remove } = React.useContext(BooksCtx)
  return (
    <>
      <ListItem dense button>
        <ListItemAvatar className='mr-1'>
          <BookImg alt={title} src={imageUrl} />
        </ListItemAvatar>
        <ListItemText
          id={id}
          primary={title}
          secondary={
            <>
              <div>subtitle:  {subtitle}</div>
              <div>publisher:  {publisher}</div>
              <div>
                <span className='mr-1'>language:  {language}</span>
                <span>pageCount:  {pageCount}</span>
              </div>
              <div>createdAt:  {formatDate(createdAt)}</div>
              <div>modifiedAt: {formatDate(modifiedAt)}</div>
            </>
          }
        />
        <ListItemSecondaryAction>
          <IconButton color='primary' edge="end" aria-label="edit" onClick={e => setBookId(id)}>
            <EditIcon />
          </IconButton>
          <IconButton color='secondary' edge="end" aria-label="delete" onClick={e => remove(id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  )
})

function Books() {
  const { books } = React.useContext(BooksCtx)
  const [bookId, setBookId] = React.useState('')
  return (
    <>
      <BooksHeader setBookId={setBookId} />
      {(!bookId)
        ? <List>{books.map( book => <BookView key={book.id} {...book} setBookId={setBookId} /> )}</List>
        : <BookForm bookId={bookId} setBookId={setBookId} />
      }
    </>
  )
}

export default observer(Books)
