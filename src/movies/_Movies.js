import { createContext } from 'react'
import { observable } from 'mobx'
import { create, persist } from 'mobx-persist'

import moment from 'moment'

export const formatDate = (dateString) => moment(dateString).format('DD/MM/YYYY hh:mm:ss a')

export const initialMovie = {
  'imdbId': '',
  'title': '',
  'year': '',
  'posterUrl': '',
  'genres': []
}

export const genres = [
  'Animation',
  'Action',
  'Adventure',
  'Thriller',
  'Crime',
  'Horror',
  'Sci-fi',
  'Drama',
  'Comedy',
  'Romance',
  'Family',
]

class Movies {

  @persist('list') @observable movies = []

  get actionMoviesCount() {
    return this.movies.filter(movie => movie.genres.includes('Action')).length
  }

  get comedyMoviesCount() {
    return this.movies.filter(movie => movie.genres.includes('Comedy')).length
  }

  get romanceMoviesCount() {
    return this.movies.filter(movie => movie.genres.includes('Romance')).length
  }

  get adventureMoviesCount() {
    return this.movies.filter(movie => movie.genres.includes('Adventure')).length
  }

  get horrorMoviesCount() {
    return this.movies.filter(movie => movie.genres.includes('Horror')).length
  }

  get allMoviesCount() {
    return this.movies.length
  }

  add = newMovie => {
    this.movies.push({
      ...newMovie,
      createdAt: new Date(),
      modifiedAt: new Date(),
    })
  }

  update = updatedMovie => {
    let index = this.movies.findIndex(movie => movie.imdbId === updatedMovie.imdbId)
    if(index >= 0) {
      this.movies[index] = {
        ...updatedMovie,
        modifiedAt: new Date(),
      }
    }
  }

  remove = id => {
    let index = this.movies.findIndex(movie => movie.imdbId === id)
    if(index >= 0)
      this.movies.splice(index, 1)
  }
}

const movies = new Movies()

const hydrate = create({ storage: localStorage, jsonify: true })
hydrate('MOVIES', movies)

export default createContext(movies)
