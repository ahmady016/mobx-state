import { createContext } from 'react'
import { observable } from 'mobx'
import shortid from 'shortid'

class Todos {

  @observable todos = [
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

export default createContext(new Todos())
