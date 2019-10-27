import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

class Store {
  @observable cache = { queue: [] }

  @action.bound refresh() {
    this.cache.queue.push(1)
  }
}

const store = new Store()

@observer
class Bar extends React.Component {
  static propTypes = {
    queue: PropTypes.array
  }

  render() {
    const { queue } = this.props

    return <span>{queue.length}</span>
  }
}

@observer
class Foo extends React.Component {
  static propTypes = {
    cache: PropTypes.object
  }

  render() {
    const { cache, refresh } = this.props

    return (
      <div>
        <button onClick={refresh}>Refresh</button>
        <Bar queue={cache.queue} />
      </div>
    )
  }
}

ReactDOM.render(<Foo cache={store.cache} refresh={store.refresh} />,
  document.getElementById('root'))
