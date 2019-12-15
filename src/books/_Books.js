import { createContext } from 'react'
import { observable } from 'mobx'
import { create, persist } from 'mobx-persist'

import shortid from 'shortid'
import moment from 'moment'

export const formatDate = (dateString) => moment(dateString).format('DD/MM/YYYY hh:mm:ss a')

export const initialBook = {
  'title': '',
  'subtitle': '',
  'description': '',
  'publisher': '',
  'language': '',
  'imageUrl': '',
  'pageCount': ''
}

class Books {

  @persist('list') @observable books = []

  get enBooksCount() {
    return this.books.filter(book => book.language === 'en').length
  }

  get arBooksCount() {
    return this.books.filter(book => book.language === 'ar').length
  }

  get allBooksCount() {
    return this.books.length
  }

  add = newBook => {
    this.books.push({
      ...newBook,
      id: shortid.generate(),
      createdAt: new Date(),
      modifiedAt: new Date(),
    })
  }

  update = updatedBook => {
    let index = this.books.findIndex(book => book.id === updatedBook.id)
    if(index >= 0) {
      this.books[index] = {
        ...updatedBook,
        modifiedAt: new Date(),
      }
    }
  }

  remove = id => {
    let index = this.books.findIndex(book => book.id === id)
    if(index >= 0)
      this.books.splice(index, 1)
  }
}

const books = new Books()

const hydrate = create({ storage: localStorage, jsonify: true })
hydrate('BOOKS', books)

export default createContext(books)
