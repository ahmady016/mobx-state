import { createContext } from 'react'
import { observable } from 'mobx'
import { create, persist } from 'mobx-persist'

import shortid from 'shortid'

class Todos {

  @persist('list')
  @observable
  todos = [
    { id: shortid.generate(), text: 'Buy eggs', completed: true },
    { id: shortid.generate(), text: 'Write a post', completed: false }
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

  add = newTodo => {
    this.todos.push({
      id: shortid.generate(),
      ...newTodo
    })
  }

  update = updatedTodo => {
    let index = this.todos.findIndex(todo => todo.id === updatedTodo.id)
    if(index >= 0)
      this.todos[index] = updatedTodo
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
