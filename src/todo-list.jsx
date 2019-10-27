import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { observable, action, computed } from 'mobx'
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react'
import './todo-list.less'

class Todo {
  id = Math.random()
  @observable title = ''
  @observable finished = false

  constructor(title) {
    this.title = title
  }

  @action.bound toggle() {
    this.finished = !this.finished
  }
}

class Store {
  @observable todos = []

  @action.bound createTodo(title) {
    this.todos.unshift(new Todo(title))
  }

  @action.bound removeTodo(todo) {
    this.todos.remove(todo)
  }

  @computed get left() {
    return this.todos.filter(todo => !todo.finished).length
  }
}

@observer
class TodoItem extends React.Component {
  static propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired,
    }).isRequired,
  }

  render() {
    const { todo } = this.props
    const { finished, title, toggle } = todo

    return (
      <>
        <input
          type="checkbox"
          className="toggle"
          checked={finished}
          onChange={toggle}
        />
        <span
          className={['title', finished && 'finished'].join(' ')}
        >{title}</span>
      </>
    )
  }
}

@observer
class TodoList extends React.Component {
  static propTypes = {
    store: PropTypes.shape({
      createTodo: PropTypes.func,
      todos: ObservablePropTypes.observableArrayOf(
        ObservablePropTypes.observableObject).isRequired
    }).isRequired
  }

  state = {
    inputValue: ''
  }

  handleSubmit = ev => {
    ev.preventDefault()

    const { store }= this.props
    const { createTodo } = store
    const { inputValue } = this.state

    createTodo(inputValue)

    this.setState({ inputValue: '' })
  }

  handleChange = ev => {
    const { target: { value } } = ev

    this.setState({ inputValue: value })
  }

  render() {
    const { store } = this.props
    const { left, todos, removeTodo } = store
    const { inputValue } = this.state

    return (
      <div className="todo-list">
        <header>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="What needs to be finished?"
              value={inputValue}
              onChange={this.handleChange}
            />
          </form>
        </header>
        <ul>
          {todos.map((todo, idx) => (
            <li key={idx} className="todo-item">
              <TodoItem todo={todo} />
              <span className="delete" onClick={() => removeTodo(todo)}>X</span>
            </li>
          ))}
        </ul>
        <footer>
          {left} item(s) unfinished.
        </footer>
      </div>
    )
  }
}

ReactDOM.render(<TodoList store={new Store()} />, document.getElementById('root'))
