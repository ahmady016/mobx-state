import React from 'react'

import { observer } from 'mobx-react-lite'
import MoviesCtx, { formatDate, initialMovie, genres } from './_Movies'
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

const MovieImg = styled(Avatar)`
  width: 120px !important;
  height: 120px !important;
`

const MoviesHeader = observer(({ setMovieId }) => {
  const {
    allMoviesCount, actionMoviesCount, comedyMoviesCount, romanceMoviesCount, horrorMoviesCount, adventureMoviesCount
  } = React.useContext(MoviesCtx)
  return (
    <Paper className='flex-between p-05'>
      <Chip
        color='default'
        variant="outlined"
        avatar={<Avatar>{allMoviesCount}</Avatar>}
        label='All'
      />
      <Chip
        color='secondary'
        variant="outlined"
        avatar={<Avatar>{actionMoviesCount}</Avatar>}
        label='Action'
      />
      <Chip
        color='secondary'
        variant="outlined"
        avatar={<Avatar>{horrorMoviesCount}</Avatar>}
        label='Horror'
      />
      <Chip
        color='primary'
        variant="outlined"
        avatar={<Avatar>{adventureMoviesCount}</Avatar>}
        label='Adventure'
      />
      <Chip
        color='primary'
        variant="outlined"
        avatar={<Avatar>{comedyMoviesCount}</Avatar>}
        label='Comedy'
      />
      <Chip
        color='primary'
        variant="outlined"
        avatar={<Avatar>{romanceMoviesCount}</Avatar>}
        label='Romance'
      />
      <Button variant="outlined" color="primary" onClick={e => setMovieId('0')}>Add New Movie</Button>
    </Paper>
  )
})

const MovieForm = observer(({ movieId, setMovieId }) => {
  const { movies, add, update  } = React.useContext(MoviesCtx)

  const movie = movies.find(movie => movie.imdbId === movieId)
  const [state, setState] = React.useState(movie || initialMovie)

  const onChange = ({ target }) => void setState( state => ({ ...state, [target.name]: target.value }) )

  const save = e => {
    (movieId === '0') ? add(state) : update(state)
    setMovieId('')
  }

  return (
    <form className='mb-05 row'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl className='w-100'>
            <InputLabel htmlFor="imdbId">IMDB Id</InputLabel>
            <Input
              id='imdbId'
              name='imdbId'
              value={state.imdbId}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className='w-100'>
            <InputLabel htmlFor="title">Movie Title</InputLabel>
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
            <InputLabel htmlFor="year">Movie Year</InputLabel>
            <Input
              id='year'
              name='year'
              value={state.year}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className='w-100'>
            <InputLabel htmlFor="genres">Genres</InputLabel>
            <Select
              id='genres'
              name='genres'
              multiple
              value={state.genres}
              onChange={onChange}
            >
              {genres.map(genre => <MenuItem key={genre} value={genre}>{genre}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className='w-100'>
            <InputLabel htmlFor="posterUrl">Movie Poster Url</InputLabel>
            <Input
              id='posterUrl'
              name='posterUrl'
              value={state.posterUrl}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
        <div className='ml-07 mt-1'>
          <Button className='mr-2' size='large' variant="contained" color="primary" onClick={save}>
            Save Movie
          </Button>
          <Button className='' size='large' variant="contained" color="secondary" onClick={e => setMovieId('')}>
            Cancel
          </Button>
        </div>
      </Grid>
    </form>
  )
})

const MovieView = observer(({ imdbId, title, year, posterUrl, genres, createdAt, modifiedAt, setMovieId }) => {
  const { remove } = React.useContext(MoviesCtx)
  return (
    <>
      <ListItem dense button>
        <ListItemAvatar className='mr-1'>
          <MovieImg alt={title} src={posterUrl} />
        </ListItemAvatar>
        <ListItemText
          id={imdbId}
          primary={title}
          secondary={
            <>
              <div>IMDB:  {imdbId}</div>
              <div>year:  {year}</div>
              <div>genres:  {genres.join(', ')}</div>
              <div>createdAt:  {formatDate(createdAt)}</div>
              <div>modifiedAt: {formatDate(modifiedAt)}</div>
            </>
          }
        />
        <ListItemSecondaryAction>
          <IconButton color='primary' edge="end" aria-label="edit" onClick={e => setMovieId(imdbId)}>
            <EditIcon />
          </IconButton>
          <IconButton color='secondary' edge="end" aria-label="delete" onClick={e => remove(imdbId)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  )
})

function Movies() {
  const { movies } = React.useContext(MoviesCtx)
  const [movieId, setMovieId] = React.useState('')
  return (
    <>
      <MoviesHeader setMovieId={setMovieId} />
      {(!movieId)
        ? <List>{movies.map( movie => <MovieView key={movie.id} {...movie} setMovieId={setMovieId} /> )}</List>
        : <MovieForm movieId={movieId} setMovieId={setMovieId} />
      }
    </>
  )
}

export default observer(Movies)
