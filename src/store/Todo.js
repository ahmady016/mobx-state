import { createContext } from 'react'
import { observable } from 'mobx'
import { create, persist } from 'mobx-persist'

import shortid from 'shortid'
import moment from 'moment'

const tody = new Date()
export const formatDate = (dateString) => {
  return moment(dateString).format('DD/MM/YYYY hh:mm:ss a')
}

class Todos {

  @persist('list')
  @observable
  todos = [
    { id: shortid.generate(), text: 'Buy eggs and cheese', completed: false, createdAt: tody, modifiedAt: tody },
    { id: shortid.generate(), text: 'Write a post', completed: false, createdAt: tody, modifiedAt: tody }
  ]

  get remaining() {
    return this.todos.filter(t => !t.completed).length
  }

  get completed() {
    return this.todos.filter(t => t.completed).length
  }

  get all() {
    return this.todos.length
  }

  toggleCompleted = id => {
    let todo = this.todos.find(todo => todo.id === id)
    if(todo)
      todo.completed = !todo.completed
  }

  add = todoText => {
    this.todos.push({
      id: shortid.generate(),
      text: todoText,
      completed: false,
      createdAt: new Date(),
      modifiedAt: new Date(),
    })
  }

  update = updatedTodo => {
    let index = this.todos.findIndex(todo => todo.id === updatedTodo.id)
    if(index >= 0) {
      updatedTodo.modifiedAt = new Date()
      this.todos[index] = updatedTodo
    }
  }

  remove = id => {
    let index = this.todos.findIndex(todo => todo.id === id)
    if(index >= 0)
      this.todos.splice(index, 1)
  }
}

const todos = new Todos()

const hydrate = create({ storage: localStorage, jsonify: true })
hydrate('TODOS', todos)

export default createContext(todos)
